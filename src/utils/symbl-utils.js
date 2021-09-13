import {apiBase, intents, symblAppId, symblAppSecret, summaryEmails} from "../config";
import sdk from "symbl-node/build/client.sdk.min";
import request from "request"; //Attaches the Symbl Client SDK to window
//const {sdk, SpeakerEvent} = require('symbl-node');
const clientSDK = new window.ClientSDK();

let stopEndpointTimeoutRef = null;

export const startEndpoint = async (phoneNumber, callback, endCallAfterInSeconds = 300) => {
    try {
        await clientSDK.init({
            appId: symblAppId,
            appSecret: symblAppSecret,
            basePath: apiBase
        });

        ///get accesstoken
        let accessToken;
        const authOptions = {
            method: 'post',
            url: "https://api.symbl.ai/oauth2/token:generate",
            body: {
                type: "application",
                appId: symblAppId,
                appSecret: symblAppSecret
            },
            json: true
        };

        request(authOptions, (err, res, body) => {
            if (err) {
                console.error('error posting json: ', err);
                throw err
            }
            accessToken=body.accessToken;
            console.log("accesstoken"+accessToken);
            console.log(JSON.stringify(body, null, 2));
        });
        ///received accesss token



        const connection = await clientSDK.startEndpoint({
            endpoint: {
                type: 'pstn',
                phoneNumber
            },
            intents,
            actions: [{
                "invokeOn": "stop",
                "name": "sendSummaryEmail",
                "parameters": {
                    "emails": summaryEmails // Add array of emails to which the email is to be sent at the end of the call
                }
            }],
            data: {
                session: {
                    name: `Live Intent Detection Demo - ${phoneNumber}` // Title of the Meeting, this will be reflected in summary email if configured.
                }
            }
        }, callback);

        const connectionId = connection.connectionId;
        console.log('Call established for connectionId: ' + connectionId);
        console.log(connection.conversationId);
        console.log(connection.summaryInfo);
        //// make a request to get summary ui
        let summary='';

        request.post({
            url: 'https://api.symbl.ai/v1/conversations/'+connection.conversationId+'/experiences',
            headers: {
                'x-api-key': accessToken,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "name": "verbose-text-summary",
                "logo": "https://symblsanitydataset.s3.us-east-2.amazonaws.com/googleImage.webp"
            }),
        }, (err, response, body) => {
            console.log(body);
            console.log("body url from response"+(JSON.parse(body)).url);
            summary=(JSON.parse(body)).url;
            ///set global variable surl have summary url
            window.$surl=summary;
            console.log("name attribute set"+window.$surl);
        });
        /////



        stopEndpointTimeoutRef = setTimeout(async () => {
            clearTimeout(stopEndpointTimeoutRef);
            stopEndpointTimeoutRef = null;
            await stopEndpoint(connectionId);
        }, endCallAfterInSeconds * 1000);

        return connectionId;
    } catch (e) {
        console.error('Error in establishing startEndpoint call with SDK', e);
        throw e;
    }
};

export const stopEndpoint = async (connectionId) => {
    console.log('Stopping connection for ' + connectionId);

    if (stopEndpointTimeoutRef) {
        clearTimeout(stopEndpointTimeoutRef);
        stopEndpointTimeoutRef = null;
    }

    try {
        const connection = await clientSDK.stopEndpoint({
            connectionId
        });

        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
        //window.$surl=connection.summaryInfo[0].url;

        return {
            summaryInfo: connection.summaryInfo,
            conversationId: connection.conversationId
        };
    } catch (e) {
        console.error('Error while stopping the connection.', e);
        throw e;
    }
};

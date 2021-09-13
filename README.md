# Telephony Demo

This React App works with Symbl's APIs to make a telephony call over PSTN.

## Configurations

To make this app work with Symbl's API we need to set the config.js with Symbl APP Id and APP Secret.

### Credentials

Symbl APIs require `appId` and `appSecret` to authenticate the incoming requests. These can be obtained by logging into https://platform.symbl.ai.
Set the following environment variables with the above values obtained from Symbl's Platform home page.

* `REACT_APP_SYMBL_APP_ID` -- Set this to the `appId`
* `REACT_APP_SYMBL_APP_SECRET` -- Set this to the `appSecret`


### Summary Email-IDs

Symbl also provides a URL to a `Summary UI` which renders the conversation details with insights and transcription. This URL to render these for a specific conversation can be emailed at the end of a call.
Set the below environment variable with a comma separated list of email addresses to receive the email after a call ends.

* `REACT_APP_SUMMARY_EMAIL_LIST` -- Set this with the comma separated email list

### Default Phone Number

In case you have a default phone number to place calls to you can set the below environment variable with the phone number in the following format: 
`+{country_code}{phone_number}`. Avoid any special characters.

* `REACT_APP_DEFAULT_PHONE_NUMBER` -- Set this with the default phone number you wish to call

## Building the App

To start the app for development run the below command in the root directory of the project

    npm run start 

To build a production grade deployment for the app run the below command. This will create a `build` directory with the production optimized build which can be served directly. 

    npm run build
    
NOTE: To reload any configuration changes while development restart the development server by re-running the first command.

## Support

If you require any support related to this App or any of the Symbl APIs, please reach out to us at 
`support@symbl.ai`

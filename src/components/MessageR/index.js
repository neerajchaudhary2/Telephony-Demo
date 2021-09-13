import {Paper, Typography} from "@material-ui/core";
import React from "react";
import  {useEffect, useState} from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "../../globalStyle";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../../Theme";

import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {red} from "@material-ui/core/colors";
let transcript1="";
let previous=null;
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    speakerAvatar: {
        color: '#fefefe',
        // '&:hover': {
        //     cursor: 'pointer',
        //     opacity: 0.75
        // },
        width: theme.spacing(4),
        height: theme.spacing(4),
        border: '1px solid'
        // transform: 'scale(0.80)'
    },

    timeText: {
        ...theme.typography.caption,
        fontWeight: 700,
        overflow: 'hidden'
    },
    mainContainer: {
        padding: 24,
        height: "250px",
        overflowY: "auto"
    },
    item: {
        display: "flex",
        alignItems: "center",
        margin: "5px 10px",
        flexGrow: 1,
        width: "90%"
    },
    avatarContainer: {
        margin: 10,
        marginTop: 0
    },
    p: {
        margin: "5px 0",
        fontSize: 14
    },
    avatar: {
        backgroundColor: red[500],
    },
    editIcon: {
        position: "absolute",
        right: "15px"
    },
    transcript: {
        position: "relative",
        flexGrow: 1,
        width: "80%",
        wordBreak: "break-all"
    },
    inputBox: {
        width: "100%",
        // height:"30px",
        outline: "none"
    },
    description: {
        width: "80%",
        textOverflow: "ellipsis",
        minHeight: 36,
        display: "block",
        overflow: "hidden",
        whiteSpace: "break-spaces",
    },
    cancelButton: {
        color: '#888888',
        borderColor: '#888888',
        textTransform: 'none',
        padding: 0,
        margin: "10px"
    },

    saveButton: {
        color: '#1C921CCC',
        borderColor: '#1C921C88',
        textTransform: 'none',
        padding: 0,
        margin: "10px"
    }

}));




const MessageR = ({messageResponse, classes}) => {
    if(previous!=messageResponse.payload.content) {
        previous=messageResponse.payload.content;
        transcript1 = transcript1 +"\n *"+ messageResponse.payload.content;
    }
    return (


        <ThemeProvider theme={theme}>
            <Paper variant={"outlined"} className={classes.paper} style={{
                marginBottom: 15,
                width: '100%'
            }}>


                    <Typography variant={"h6"} style={{marginBottom: 15, paddingBottom: 10}}>
                        Transcript
                    </Typography>
                    <Typography>
                        {

                            messageResponse && messageResponse.payload.content ?
                                (<Typography variant={"body1"} style={{color: 'gray'}}>
                                    {transcript1}
                                </Typography>) :

                                (<Typography variant={"body1"} style={{color: 'gray'}}>
                                    Transcript will appear here ...
                                </Typography>)
                        }
                    </Typography>




            </Paper>
        </ThemeProvider>
    );
};

export default withStyles(styles)(MessageR);
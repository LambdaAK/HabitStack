import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, Unsubscribe, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { DataSnapshot, Database, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import "./social.css"
import { useEffect, useState } from "react";
import $ from "jquery"
import {v4 as uuidv4} from 'uuid';

/*

[{"content" : "aaaa", "author" : "EvkeutUYeqVW6pwhDH0k0f144eI2"}]

*/

function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()


/**
 * 
 * @param object the array-like object to append to
 * @param value the value to append to the array-like object
 */
function appendToArrayLikeObject(object: object, value: any): object {

    if (object == null) {
        object = {}
    }

    // find the smallest natural number that is not a key in object
    let smallestNaturalNumberNotKey = 0
    for (let i = 0; i < Object.keys(object).length; i++) {
        if (Object.keys(object).includes(i.toString())) {
            smallestNaturalNumberNotKey++
        }
    }

    // set the property
    Object.assign(object, {[smallestNaturalNumberNotKey] : value})
    
    return object;
}


function ServerButton(props: {serverId: string, currentServerIdSetter: Function}) {

    const [serverName, setServerName] = useState <string> ("")

    // double check the unsubscriber here
    useEffect(() => {
        // get the server name
        const serverNameRef = ref(database, "servers/" + props.serverId + "/name")
        return onValue(serverNameRef, (snapshot: DataSnapshot) => {
            //alert("server name ref")
            const serverName = snapshot.val()
            setServerName(serverName)
        })
    }, [])


    return (
        <>
            <div className = "server-button" key = {props.serverId}
            
            onClick = {
                () => {
                props.currentServerIdSetter(props.serverId)
                }
            }
            >
                {serverName}
            </div>
        </>
    )
}

function MessagesSection (props: {serverId: string}) {
    const [messages, setMessages] = useState <{content: string, author: string}[]> ([])

    useEffect(() => {
        // get the messages
        const messagesRef = ref(database, "servers/" + props.serverId + "/messages")
        return onValue(messagesRef, (snapshot: DataSnapshot) => {
            //alert("messages ref")
            const _messages = snapshot.val()
            if (_messages != null) {
                setMessages(_messages)
            }
            else {
                setMessages([])
            }

            const serverMessages = document.getElementsByClassName("server-messages")[0]
            // scroll to the bottom of the messages
            setTimeout(() => {
                serverMessages.scrollTop = serverMessages.scrollHeight
            }, 1)
        })


    }, [props.serverId])

    return (
        <div className = "server-messages">
            {
                messages.map((message) =>
                    <Message content = {message.content} author = {message.author}/>
                )
            }
        </div>
    )

}


function Message(props: {content: string, author: string}) {
    
    const [authorName, setAuthorName] = useState <string> ("")

    useEffect(() => {
        // get the author name
        const authorNameRef = ref(database, "users/" + props.author + "/username")
        
        onValue(authorNameRef, (snapshot: DataSnapshot) => {
            const authorName = snapshot.val()
            setAuthorName(authorName)
        })
    }
    , [props.content, props.author])

    let extraClasses = ""

    if (props.author == getCookie("user")) {
        extraClasses += " message-from-current-user"
    }

    return (
        <div className = {"message" + extraClasses} key = {props.author}>
            <div className = "message-author">
                {authorName}
            </div>
            <div className = "message-content">
                {props.content}
            </div>
        </div>
    )
    
}

async function sendMessage(serverId: string): Promise<void> {
    // get the content of the message
    const messageContent: string = $("#message-input").val() as string
    // trim leading spaces

    // make sure it's not empty
    if (messageContent == "") {
        alert("message is empty")
        return
    }
    
    const currentUser = auth.currentUser

    if (currentUser == null) {
        alert("not logged in, attempting to send a message")
        return
    }

    const currentUserId = currentUser.uid

    // get the server id

    // send the message to the database

    const messagesRef = ref(database, "servers/" + serverId + "/messages")
    // get the current messages


    const messagesSnapshot = await get(messagesRef)
    let msgList = messagesSnapshot.val()

    // add the new message
    msgList = appendToArrayLikeObject(msgList, {"content" : messageContent, "author" : currentUserId})
    
    set(messagesRef, msgList)
    .catch((error: Error) => {
        alert(error.message)
    })

    // empty the chat bar
    $("#message-input").val("")

}

function ServerCreationWindow() {
    return (
        <div id = "server-creation-window">

   
            <button className = "exit-server-creation-window-button"
            onClick = {openOrCloseServerCreationWindow}
            >✖️</button>
            <div className = "server-creation-window-header">
                Create new server
            </div>
         

            
            <div className = "server-creation-server-name-header">
                Server Name
            </div>
            <input type="text" id = "server-name-input" className = "text-input" placeholder="Server Name" />

            <FinishCreatingServerButton/>
        </div>
    )
}


function openOrCloseServerCreationWindow() {
// if the server creation window is invisible, make it visible
                // if it's visible, make it invisible
                const window = $("#server-creation-window")
                if (window.css("display") == "none") {
                    // make the rest of the page darker
                    window.css("display", "flex")
                    $("#social-container").css("opacity", "0.5")

                }
                else if (window.css("display") == "flex") {
                    window.css("display", "none")
                    $("#social-container").css("opacity", "1")
                }

}

function CreateNewServerButton() {
    return (
        <div className = "create-new-server-button"
        onClick = {openOrCloseServerCreationWindow}>
            Create new server
        </div>
    )
}

function JoinServerButton() {
    return (
        <div className = "join-server-button">
            Join server
        </div>
    )
}

function FinishCreatingServerButton() {
    return (
        <div className = "finish-creating-server-button"
        onClick = {createServer}
        >
            Create
        </div>
    )
}


async function createServer() {
    // first, get the name of the server
    const serverName = $("#server-name-input").val() as string
    // if it's empty, alert and return
    if (serverName == "") {
        alert("Server name is empty")
        return
    }

    // get the current user
    const currentUserUUID: string | null = getCookie("user")

    if (currentUserUUID == null) {
        alert("not logged in, trying to create server")
        return
    }

    // first, add the server to the servers list, with it's name

    // generate a uuid for the server

    const serverUUID = uuidv4();

    // send the server to the database

    const serverData = {
        "name" : serverName,
    }
    
    const newServerRef = ref(database, "servers/" + serverUUID)

    await set(newServerRef, serverData)

    // now, add the server to the user's servers list

    const userServersRef = ref(database, "users/" + currentUserUUID + "/servers")

    // get the list of servers the user is in

    const userServersSnapshot = await get(userServersRef)

    let userServers = userServersSnapshot.val()

    // append the new server to the list

    userServers = appendToArrayLikeObject(userServers, serverUUID)

    // send the new list to the database

    await set(userServersRef, userServers)




}


export default function Social() {

    let [serversUserIn, setServersUserIn] = useState <string[]> ([])
    let [currentServerId, setCurrentServerId] = useState <string> ("")

    useEffect(() => {
        // scroll down to the bottom of the messages
        const serverMessages = document.getElementsByClassName("server-messages")[0]
        serverMessages.scrollTop = serverMessages.scrollHeight
    })


    useEffect(() => {
        
        // get the current user

        const user = getCookie("user")

        if (user != null) {
            // logged in
            // get the uuids of the servers the user is in
            const userServersRef = ref(database, "users/" + user + "/servers")
            // sets an event listener for a change in the value of the user's servers
            
            onValue(userServersRef, (snapshot: DataSnapshot) => {
                //alert("user servers ref")
                const userServers = snapshot.val()

                if (userServers == null) {
                    setServersUserIn([])
                    setCurrentServerId("")
                }

                else {
                    setServersUserIn(userServers)
                    if (currentServerId == "" && userServers.length > 0) {
                        setCurrentServerId(userServers[0])
                    }
                }

            })
        }

        else {
            alert('not logged in social')
            // not logged in
            setServersUserIn([])
        }

    }, [])

    return (
        <>
            <div id = "social-container">
                <div className = "servers-bar">
                    {
                        serversUserIn.map((serverId) => 
                             
                            <ServerButton serverId = {serverId} currentServerIdSetter={setCurrentServerId}/>
                             
                        )
                    }
                    <hr className = "server-bar-divider-horizontal"/>
                    <div className = "server-bar-divider-vertical"> </div>
                    <CreateNewServerButton/>
                    <JoinServerButton/>
                </div>
                <div className = "open-server">
                {
                    (function() {
                        if (currentServerId != "") {
                            return (
                                <>
                                    <MessagesSection serverId = {currentServerId}/>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <div className = "server-messages">
                                        
                                    </div>
                                </>
                            )
                        }
                    })()
                }
                    <input id = "message-input" onKeyUp={(e) => {
                        if (e.key == "Enter") {
                            if (currentServerId != "") {
                                sendMessage(currentServerId)
                            }
                            else {
                                alert("not in a server")
                            }
                        }
                    }}>

                    </input>
                </div>
            </div>
            <ServerCreationWindow/>
        </>
    )
}
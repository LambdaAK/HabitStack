import backendConfig from "./backendConfig";
import { Auth, Unsubscribe, User, getAuth, onAuthStateChanged } from "firebase/auth";


export interface APIResult {
    success: boolean,
    errorMessage: string
}

export async function sendMessageAPI(auth: Auth, message: string, server: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/message/send`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            'message': message,
            'server': server
        })
    });

    const result = await response.json();
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: ""
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
    
}
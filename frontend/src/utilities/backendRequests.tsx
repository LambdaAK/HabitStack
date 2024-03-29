import backendConfig from "./backendConfig";
import { Auth } from "firebase/auth";


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

export async function serverCreateAPI (auth: Auth, name: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "name": name
        })
    })

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

export async function changeUsernameAPI(auth: Auth, username: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/user/username/change`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "username": username
        })
    })

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

export async function serverInviteCreateAPI(auth: Auth, server: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/invite/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": server
        })
    })

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

export async function serverInviteDeleteAPI(auth: Auth, server: string, invite: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/invite/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": server,
            "invite": invite
        })
    })

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

export async function serverJoinAPI(auth: Auth, invite: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/join`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "invite": invite
        })
    })

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

export async function serverNameChangeAPI(auth: Auth, server: string, name: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/name/change`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": server,
            "name": name
        })
    })

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

export async function createUserAPI(auth: Auth, username: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/user/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken
        },
        body: JSON.stringify({
            "username": username
        })
    })

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

export async function serverLeaveAPI(auth: Auth, server: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }

    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(`${backendConfig.url}/server/leave`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "server": server
        })
    })

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

export async function habitCreateAPI(
    auth: Auth,
    name: string,
    iWill: string,
    atTime: string,
    atLocation: string,
    obvious: string,
    attractive: string,
    easy: string,
    satisfying: string
): Promise<APIResult>
{
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habit/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "iWill": iWill,
            "atTime": atTime,
            "atLocation": atLocation,
            "obvious": obvious,
            "attractive": attractive,
            "easy": easy,
            "satisfying": satisfying
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }

}

export async function habitDeleteAPI(auth: Auth, name: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habit/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
}

export async function taskCreateAPI(auth: Auth, name: string, year: number, month: number, day: number): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/tasks/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "year": year,
            "month": month,
            "day": day
        })
    })

    const result = await response.json();

    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }

}

export async function taskDeleteAPI(auth: Auth, index: number, year: number, month: number, day: number): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/tasks/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "index": index,
            "year": year,
            "month": month,
            "day": day
        })
    })

    const result = await response.json();

    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }

}

export async function habitResistCreateAPI(
    auth: Auth,
    name: string,
    invisible: string,
    unattractive: string,
    difficult: string,
    unsatisfying: string
): Promise<APIResult>
{
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in"
        }
    }
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habitresist/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "invisible": invisible,
            "unattractive": unattractive,
            "difficult": difficult,
            "unsatisfying": unsatisfying
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }

}

export async function habitResistDeleteAPI(auth: Auth, name: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habitresist/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
}

export async function habitStackCreateAPI(auth: Auth, name: string, habits: string[]): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habitstacks/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "habits": habits
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
}

export async function habitStackDeleteAPI(auth: Auth, name: string): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/habitstacks/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
}

export async function dailyRatingCreateAPI(
    auth: Auth,
    year: number,
    month: number,
    day: number,
    happy: number,
    stick: number,
    avoid: number,
    description: string
): Promise<APIResult> {
    if (!auth.currentUser) {
        return {
            success: false,
            errorMessage: "Not logged in",
        }
    }

    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`${backendConfig.url}/dailyratings/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'id-token': idToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "year": year,
            "month": month,
            "day": day,
            "happy": happy,
            "stick": stick,
            "avoid": avoid,
            "description": description
        })
    })

    const result = await response.json();
    
    if (result.error == undefined || result.error == null) {
        return {
            success: true,
            errorMessage: "",
        }
    }
    else {
        return {
            success: false,
            errorMessage: result.error
        }
    }
}
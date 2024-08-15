import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080"

export const useSocket = ()=>{
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const ws = new WebSocket(WS_URL);   //WebSocket a JS WebAPI  https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        ws.onopen = ()=>{
            setSocket(ws)
        }

        ws.onclose = ()=>{
            setSocket(null)
        }
        return ()=>{
            //cleanup function
            //runs before unmounting and re-rendering this effect
        }
    },[])

    return socket;
}
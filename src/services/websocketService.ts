import { io, Socket } from "socket.io-client";

class WebSocketService {
    private socket: Socket;

    constructor() {
       // this.socket = io("http://localhost:8080/api/v1/chat/messages"); 
        this.socket = io("http://localhost:8080/socket.io"); 
    }

    on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }
}

export default  WebSocketService;



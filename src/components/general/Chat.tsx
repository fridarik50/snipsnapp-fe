import React, { useEffect, useRef, useState } from 'react';
//import WebSocketService from '../../services/websocketService';
import styles from './Chat.module.css'
import Person from '../../models/Person';
import * as SockJS from 'sockjs-client'


//

interface ChatProps{
    person: Person;
}


const Chat: React.FC<ChatProps> = ({person}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [ws, setWs] = useState<WebSocket|undefined>(undefined)
    const clientRef = useRef()

    useEffect(() => {
        
    //     const ws =  new WebSocketService();

    //    ws.on('/topic/outgoing', (message: string) => {
    //         console.log(message)
    //         setMessages(prevMessages => [...prevMessages, message]);
    //     });
    
       
    }, []);

    const sendMessage = () => {
         if(!ws)return;
        // ws.emit('/app/incoming', {message: input});
        // setMessages(prevMessages => [...prevMessages, input]);
        // setInput('');
        ws.send( input);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>Chat with {person.name}</div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.chatMessage}>{message}</div>
                ))}
            </div>
            <div className={styles.chatInputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className={styles.chatInput}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className={styles.chatSendButton}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

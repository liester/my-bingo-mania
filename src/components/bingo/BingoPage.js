import React, {useState} from 'react';
import {io} from "socket.io-client";
import {BASE_API_URL} from "../../utils/constants";
import classNames from 'classnames';
import styles from './BingoPage.module.css'
const socket = io(BASE_API_URL);

const BingoPage = () => {
    const [messages, setMessages] = useState([])

    socket.on('chat message', message => {
        setMessages([...messages, message])
    })
    return (
        <>
            <div> Bingo Mania Page</div>
            <div className={classNames(styles.flex)}>
                <div className={styles.box}>
                    {!!messages.length && messages.map(message => {
                        return (
                            <div>message</div>
                        )
                    })}
                    {!messages.length && <div> No messages...yet</div>}
                </div>
                <div className={styles.flex}>
                    <input type={"text"}/>
                    <button>Send</button>
                </div>
            </div>
        </>
    )
}

export default BingoPage;

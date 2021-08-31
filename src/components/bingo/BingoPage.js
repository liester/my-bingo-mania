import React, {useState} from 'react';
import {io} from "socket.io-client";
import {BASE_API_URL} from "../../utils/constants";
import classNames from 'classnames';
import axios from '../../utils/axios'
import styles from './BingoPage.module.css'
const socket = io(BASE_API_URL);

const BingoPage = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState("")

    socket.on('chat message', message => {
        setMessages([...messages, message])
    })

    const sendMessage = message => {
        axios.post('/message', {message})
            .then(response => {
                console.log('RESPONSE:'+response)
            })
    }

    const updateValue = e => {
        setValue(e.target.value)
    }

    return (
        <>
            <div> Bingo Mania Page</div>
            <div className={classNames(styles.flex)}>
                <div className={styles.box}>
                    {!!messages.length && messages.map(message => {
                        return (
                            <div>{message}</div>
                        )
                    })}
                    {!messages.length && <div> No messages...yet</div>}
                </div>
                <div className={styles.flex}>
                    <input type={"text"} onChange={updateValue}/>
                    <button onClick={()=> sendMessage(value)}>Send</button>
                </div>
            </div>
        </>
    )
}

export default BingoPage;

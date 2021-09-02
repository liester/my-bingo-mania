import React, { useState } from 'react';
import { io } from 'socket.io-client';
// import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { BASE_API_URL } from '../../utils/constants';
import axios from '../../utils/axios';
// import styles from './BingoGame.module.css';
import FlexContainer from '../common/FlexContainer';

const socket = io(BASE_API_URL);

const BingoGame = () => {
  const [messages, setMessages] = useState([]);
  const [gameCode, setGameCode] = useState();

  socket.on('chat message', (message) => {
    setMessages([...messages, message]);
  });

  // const sendMessage = (message) => {
  //   axios.post('/message', { message })
  //     .then((response) => {
  //       console.log(`RESPONSE:${response}`);
  //     });
  // };

  const joinGame = () => {
    console.log(`joining game: ${gameCode}`);
    axios.post('/join-game', { gameCode })
      .then(({ data }) => {
        console.log(`RESPONSE:${data}`);
      });
  };

  const updateGameCode = (e) => {
    setGameCode(e.target.value);
  };

  return (
    <FlexContainer justifyContent="center">
      <input onChange={updateGameCode} />
      <Button onClick={joinGame} size="lg">Join Game</Button>
    </FlexContainer>
  );
};

export default BingoGame;

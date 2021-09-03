import React, { useState } from 'react';
import { io } from 'socket.io-client';
// import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { BASE_API_URL } from '../../utils/constants';
import axios from '../../utils/axios';
// import styles from './BingoGame.module.css';
import FlexContainer from '../common/FlexContainer';
import speak from '../../utils/speak';

const socket = io(BASE_API_URL);

const BingoGame = () => {
  const [gameCode, setGameCode] = useState();
  const [calledNumbers, setCalledNumbers] = useState([]);
  // This needs to be a memo or something.
  socket.on('next number', (nextNumber) => {
    console.log(`next number received: ${nextNumber}`);
    speak(nextNumber);
    setCalledNumbers([...calledNumbers, nextNumber]);
  });

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
    <FlexContainer justifyContent="center" flexDirection="column" alignItems="center">
      <FlexContainer>
        <input onChange={updateGameCode} />
        <Button onClick={joinGame} size="lg">Join Game</Button>
      </FlexContainer>
      {!!calledNumbers.length && calledNumbers.map((number) => (
        <div>{number}</div>
      ))}
    </FlexContainer>
  );
};

export default BingoGame;
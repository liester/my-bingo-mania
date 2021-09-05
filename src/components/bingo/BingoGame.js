import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { BASE_API_URL } from '../../utils/constants';
import axios from '../../utils/axios';
import styles from './BingoGame.module.css';
import FlexContainer from '../common/FlexContainer';
import speak from '../../utils/speak';

const socket = io(BASE_API_URL);

const BingoGame = () => {
  const [gameCode, setGameCode] = useState();
  const [calledNumbers, setCalledNumbers] = useState([]);

  const joinGame = useCallback((gameCodeToJoin) => {
    console.log(`joining game: ${gameCodeToJoin}`);
    axios.post('/join-game', { gameCodeToJoin })
      .then(({ data }) => {
        console.log(`RESPONSE:${data}`);
      });
  }, [axios]);

  useEffect(() => {
    socket.on('next number', (nextNumber) => {
      speak(nextNumber);
      setCalledNumbers((previousCalledNumbers) => [...previousCalledNumbers, nextNumber]);
    });
  }, [socket, setCalledNumbers, speak]);

  useEffect(() => {

  }, []);

  const updateGameCode = (e) => {
    setGameCode(e.target.value);
  };

  return (
    <FlexContainer justifyContent="center">
      <FlexContainer className={styles.currentGames}>
        Current Games
      </FlexContainer>
      <FlexContainer className={styles.joinGame} justifyContent="center" flexDirection="column" alignItems="center">
        <FlexContainer>
          <input onChange={updateGameCode} />
          <Button onClick={() => joinGame(gameCode)} size="lg">Join Game</Button>
        </FlexContainer>
        {!!calledNumbers.length && calledNumbers.map((number) => (
          <div>{number}</div>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};

export default BingoGame;

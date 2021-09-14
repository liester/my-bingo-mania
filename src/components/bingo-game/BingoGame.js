import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from 'react-bootstrap';
import { BASE_API_URL } from '../../utils/constants';
import axios from '../../utils/axios';
import styles from './BingoGame.module.css';
import FlexContainer from '../common/FlexContainer';
import speak from '../../utils/speak';
import BingoBall from '../bingo-ball/BingoBall';

const socket = io(BASE_API_URL);

const BingoGame = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentGames, setCurrentGames] = useState([]);

  const joinGame = useCallback((gameCode) => {
    socket.emit('join-game', gameCode);
  }, [axios]);

  useEffect(() => {
    socket.on('next number', (nextNumber) => {
      speak(nextNumber);
      setCalledNumbers((previousCalledNumbers) => [...previousCalledNumbers, nextNumber]);
    });
  }, [socket, setCalledNumbers, speak]);

  useEffect(() => {
    axios.get('/current-games').then(({ data }) => {
      setCurrentGames(data);
    });
  }, []);

  return (
    <FlexContainer alignSelf="flexStart" justifyContent="center">
      <FlexContainer className={styles.currentGames} flexDirection="column">
        <div>Current Games</div>
        {!currentGames.length && <div>No Current Games</div>}
        {!!currentGames.length
        && currentGames.map((currentGameCode) => (
          <FlexContainer key={currentGameCode} alignItems="center" justifyContent="space-between">
            <div style={{ padding: '10px 10px' }}>{currentGameCode}</div>
            <Button onClick={() => joinGame(currentGameCode)}>Join</Button>
          </FlexContainer>
        ))}
      </FlexContainer>
      {!!calledNumbers.length && (
      <FlexContainer className={styles.joinGame} justifyContent="center" flexDirection="column" alignItems="center">
        {calledNumbers.map((number) => (
          <BingoBall>{number}</BingoBall>
        ))}
      </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default BingoGame;

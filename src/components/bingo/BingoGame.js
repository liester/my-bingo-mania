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
  // const [gameCode, setGameCode] = useState();
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentGames, setCurrentGames] = useState([]);

  const joinGame = useCallback((gameCodeToJoin) => {
    console.log(`joining game: ${gameCodeToJoin}`);
    // axios.post('/join-game', { gameCodeToJoin })
    //   .then(({ data }) => {
    //     console.log(`RESPONSE:${data.joinedGame}`);
    //   });
    socket.emit('join-game', gameCodeToJoin);
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

  // const updateGameCode = (e) => {
  //   setGameCode(e.target.value);
  // };

  return (
    <FlexContainer justifyContent="center">
      <FlexContainer className={styles.currentGames} flexDirection="column" justifyContent="center">
        <div>Current Games</div>
        {!currentGames.length && <div>No Current Games</div>}
        {!!currentGames.length
        && currentGames.map((currentGameCode) => (
          <FlexContainer alignItems="center" justifyContent="spaceBetween">
            <div style={{ padding: '10px 10px' }}>{currentGameCode}</div>
            <Button onClick={() => joinGame(currentGameCode)}>Join</Button>
          </FlexContainer>
        ))}
      </FlexContainer>
      <FlexContainer className={styles.joinGame} justifyContent="center" flexDirection="column" alignItems="center">
        {!!calledNumbers.length && calledNumbers.map((number) => (
          <div>{number}</div>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};

export default BingoGame;

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import FlexContainer from '../common/flex-container/FlexContainer';
import axios from '../../utils/axios';
import CurrentGames from '../current-games/CurrentGames';
import Button from '../common/button/Button';
import { BASE_API_URL } from '../../utils/constants';

const socket = io(BASE_API_URL);

const BingoHost = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentGames, setCurrentGames] = useState([]);
  const [hostingGame, setHostingGame] = useState();

  useEffect(() => {
    axios.get('/current-games').then(({ data }) => {
      setCurrentGames(data);
    });
    socket.emit('join-host-channel');
  }, []);

  useEffect(() => {
    socket.on('updated-player-count', () => {
      axios.get('/current-games').then(({ data }) => {
        setCurrentGames(data);
      });
    });
  }, []);

  const newGame = () => {
    axios.post('/create-game')
      .then(({ data }) => {
        setCurrentGames([...currentGames, data]);
      });
  };

  const callNextNumber = (gameCode) => {
    axios.post('/call-next-number', { gameCode })
      .then(({ data }) => {
        setCalledNumbers([...calledNumbers, data.nextNumber]);
      });
  };

  const hostGame = (gameCode) => {
    setHostingGame(gameCode);
    axios.get(`/get-called-numbers/${gameCode}`)
      .then(({ data }) => {
        const previouslyCalledNumbers = data;
        setCalledNumbers(previouslyCalledNumbers);
      });
  };

  return (
    <FlexContainer flexDirection="row" flex={1}>
      <CurrentGames gameType="host" currentGames={currentGames} onAction={hostGame} />
      <FlexContainer flexDirection="column" flex={1} alignItems="center" gutters>
        <Button onClick={newGame} size="lg"> New Game </Button>
        {hostingGame && (
        <FlexContainer flexDirection="column">
          <div>{`Hosting Game: ${hostingGame}`}</div>
          <Button onClick={() => callNextNumber(hostingGame)}>Call Next Number</Button>
        </FlexContainer>
        )}
        {!!calledNumbers.length && calledNumbers.map((number) => (
          <div key={number}>{number}</div>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
export default BingoHost;

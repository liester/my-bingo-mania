import React, { useEffect, useState } from 'react';
import FlexContainer from '../common/flex-container/FlexContainer';
import axios from '../../utils/axios';
import CurrentGames from '../current-games/CurrentGames';
import Button from '../common/button/Button';

const BingoHost = () => {
  const [calledNumbers, setCalledNumbers] = useState({});
  const [currentGames, setCurrentGames] = useState([]);
  const [hostingGame, setHostingGame] = useState();

  useEffect(() => {
    axios.get('/current-games').then(({ data }) => {
      setCurrentGames(data);
    });
  }, []);

  const newGame = () => {
    axios.post('/create-game')
      .then(({ data }) => {
        setCurrentGames([...currentGames, data.gameCode]);
      });
  };

  const callNextNumber = (gameCode) => {
    axios.post('/call-next-number', { gameCode })
      .then(({ data }) => {
        const previouslyCalledNumbers = calledNumbers[gameCode] || [];
        setCalledNumbers({ ...calledNumbers, [gameCode]: [...previouslyCalledNumbers, data.nextNumber] });
      });
  };

  const hostGame = (gameCode) => {
    setHostingGame(gameCode);
  };

  return (
    <FlexContainer flexDirection="row" flex={1}>
      <CurrentGames gameType="host" currentGameCodes={currentGames} onAction={hostGame} />
      <FlexContainer flexDirection="column" flex={1} alignItems="center" gutters>
        <Button onClick={newGame} size="lg"> New Game </Button>
        {hostingGame && (
        <FlexContainer flexDirection="column">
          <div>{`Hosting Game: ${hostingGame}`}</div>
          <Button onClick={() => callNextNumber(hostingGame)}>Call Next Number</Button>
        </FlexContainer>
        )}
        {!!(calledNumbers[hostingGame] || []).length && calledNumbers[hostingGame].map((number) => (
          <div key={number}>{number}</div>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
export default BingoHost;

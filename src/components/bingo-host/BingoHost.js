import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/FlexContainer';
import axios from '../../utils/axios';

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
    <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
      <Button onClick={newGame} size="lg"> New Game </Button>
      {currentGames && currentGames.map((currentGame) => (
        <FlexContainer
          flexDirection="column"
          alignItems="center"
        >
          <div>
            Game Code:
            {currentGame}
          </div>
          <Button onClick={() => hostGame(currentGame)}>Host</Button>
        </FlexContainer>
      ))}
      {!!(calledNumbers[hostingGame] || []).length && calledNumbers[hostingGame].map((number) => (
        <div>{number}</div>
      ))}
      {hostingGame && (
      <FlexContainer flexDirection="column">
        <div>{`Hosting Game: ${hostingGame}`}</div>
        <Button onClick={() => callNextNumber(hostingGame)}>Call Next Number</Button>
      </FlexContainer>
      )}
    </FlexContainer>
  );
};
export default BingoHost;

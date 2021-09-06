import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/FlexContainer';
import axios from '../../utils/axios';

const BingoHost = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentGames, setCurrentGames] = useState([]);

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
        setCalledNumbers([...calledNumbers, data.nextNumber]);
      });
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
          <Button onClick={() => callNextNumber(currentGame)}>Call Next Number</Button>
        </FlexContainer>
      ))}
      {!!calledNumbers.length && calledNumbers.map((number) => (
        <div>{number}</div>
      ))}
    </FlexContainer>
  );
};
export default BingoHost;

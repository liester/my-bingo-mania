import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/FlexContainer';
import axios from '../../utils/axios';

const BingoHost = () => {
  const [gameCode, setGameCode] = useState();
  const [calledNumbers, setCalledNumbers] = useState([]);

  const newGame = () => {
    axios.post('/create-game')
      .then(({ data }) => {
        setGameCode(data.gameCode);
      });
  };

  const callNextNumber = () => {
    axios.post('/call-next-number')
      .then(({ data }) => {
        setCalledNumbers([...calledNumbers, data.nextNumber]);
      });
  };
  return (
    <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
      <Button onClick={newGame} size="lg"> New Game </Button>
      {gameCode && (
      <FlexContainer
        flexDirection="column"
        alignItems="center"
      >
        <div>
          Game Code:
          {gameCode}
        </div>
        <Button onClick={callNextNumber}>Call Next Number</Button>
      </FlexContainer>
      )}
      {!!calledNumbers.length && calledNumbers.map((number) => (
        <div>{number}</div>
      ))}
    </FlexContainer>
  );
};
export default BingoHost;

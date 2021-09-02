import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/FlexContainer';
import axios from '../../utils/axios';

const BingoHost = () => {
  const [gameCode, setGameCode] = useState();

  const newGame = () => {
    axios.post('/create-game')
      .then((response) => {
        setGameCode(response.gameCode);
      });
  };
  return (
    <FlexContainer justifyContent="center">
      <Button onClick={newGame} size="lg"> New Game </Button>
      {gameCode && (
      <div>
        Game Code:
        {gameCode}
      </div>
      )}
    </FlexContainer>
  );
};
export default BingoHost;

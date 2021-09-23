import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/flex-container/FlexContainer';
import styles from './CurrentGames.module.css';

export default function CurrentGames({ gameType, currentGames, onAction }) {
  const isHost = gameType === 'host';
  return (
    <FlexContainer alignItems="stretch" flexDirection="column" className={styles.currentGames}>
      <div className={styles.title}>Current Games</div>
      {currentGames && currentGames.map((currentGame) => (
        <FlexContainer
          key={currentGame.gameCode}
          justifyContent="space-between"
          alignSelf="center"
          style={{ paddingRight: '20px', paddingBottom: '20px', width: '275px' }}
        >
          <div>{`(${currentGame.currentPlayerCount})`}</div>
          <div>{currentGame.gameCode}</div>
          <Button onClick={() => onAction(currentGame.gameCode)}>{isHost ? 'Host' : 'Join'}</Button>
        </FlexContainer>
      ))}
    </FlexContainer>
  );
}

CurrentGames.propTypes = {
  gameType: PropTypes.oneOf(['host', 'player']).isRequired,
  currentGames: PropTypes.arrayOf(PropTypes.shape({
    gameCode: PropTypes.string,
    currentPlayerCount: PropTypes.number,
  })).isRequired,
  onAction: PropTypes.func,
};

CurrentGames.defaultProps = {
  onAction: null,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FlexContainer from '../common/flex-container/FlexContainer';
import styles from './CurrentGames.module.css';

export default function CurrentGames({ gameType, currentGameCodes, onAction }) {
  const isHost = gameType === 'host';
  return (
    <FlexContainer alignItems="stretch" flexDirection="column" className={styles.currentGames}>
      <div className={styles.title}>Current Games</div>
      {currentGameCodes && currentGameCodes.map((gameCode) => (
        <FlexContainer justifyContent="space-between" alignSelf="center" style={{ paddingRight: '20px', paddingBottom: '20px', width: '200px' }}>
          <div>{gameCode}</div>
          <Button onClick={() => onAction(gameCode)}>{isHost ? 'Host' : 'Join'}</Button>
        </FlexContainer>
      ))}
    </FlexContainer>
  );
}

CurrentGames.propTypes = {
  gameType: PropTypes.oneOf(['host', 'player']).isRequired,
  currentGameCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAction: PropTypes.func,
};

CurrentGames.defaultProps = {
  onAction: null,
};

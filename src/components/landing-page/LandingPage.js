import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './LandingPage.module.css';
import FlexContainer from '../common/flex-container/FlexContainer';

const LandingPage = () => {
  const history = useHistory();
  return (
    <FlexContainer justifyContent="center" flexDirection="column" alignItems="center" flex={1}>
      <Button onClick={() => history.push('/game')} className={styles.megaButton}>Join Game</Button>
      <Button onClick={() => history.push('/host')} className={styles.megaButton}>Create Game</Button>
    </FlexContainer>
  );
};

export default LandingPage;

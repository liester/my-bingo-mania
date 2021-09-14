import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Home.module.css';
import FlexContainer from '../common/FlexContainer';

const LandingPage = () => {
  const history = useHistory();
  return (
    <FlexContainer justifyContent="center" flexDirection="column">
      <Button onClick={() => history.push('/game')} className={styles.megaButton}>Join a Game</Button>
      <Button onClick={() => history.push('/host')} className={styles.megaButton}>Create a Game</Button>
    </FlexContainer>
  );
};

export default LandingPage;

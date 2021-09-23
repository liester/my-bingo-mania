import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import FlexContainer from '../common/flex-container/FlexContainer';
import styles from './Header.module.css';

const Header = () => {
  const history = useHistory();
  const isHost = window.location.href.indexOf('/host') > -1;
  return (
    <FlexContainer justifyContent="space-between" className={styles.header}>
      <ArrowLeft
        className={styles.backButton}
        size={50}
        color="white"
        onClick={() => {
          history.goBack();
        }}
      />
      <div className={styles.userType}>{isHost ? 'Host' : 'Player'}</div>
    </FlexContainer>
  );
};

export default Header;

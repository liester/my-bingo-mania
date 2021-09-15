import React from 'react';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import FlexContainer from '../common/flex-container/FlexContainer';
import styles from './Header.module.css';

const Header = () => {
  const history = useHistory();
  return (
    <FlexContainer justifyContent="flex-start" className={styles.header}>
      <ArrowLeft
        className={styles.backButton}
        size={50}
        color="white"
        onClick={() => {
          history.goBack();
        }}
      />
    </FlexContainer>
  );
};

export default Header;

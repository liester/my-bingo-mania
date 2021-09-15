import React from 'react';
import PropTypes from 'prop-types';
import FlexContainer from '../common/flex-container/FlexContainer';
import styles from './BingoBall.module.css';

const BingoBall = ({ children }) => (
  <FlexContainer alignItems="center" justifyContent="center" className={styles.bingoBall}>
    {children}
  </FlexContainer>
);

BingoBall.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default BingoBall;

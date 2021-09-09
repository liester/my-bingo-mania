import React from 'react';
import {
  Link,
} from 'react-router-dom';
import FlexContainer from './common/FlexContainer';

const Header = () => (
  <FlexContainer justifyContent="center">
    <Link style={{ padding: '0px 10px' }} to="/game">Join</Link>
    <Link style={{ padding: '0px 10px' }} to="/host">Host</Link>
  </FlexContainer>
);

export default Header;

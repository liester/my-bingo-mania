import React from 'react';
import PropTypes from 'prop-types';

const FlexContainer = (props) => {
  const { children, ...rest } = props;
  const defaultStyles = {
    display: 'flex',
  };
  return (
    <div style={{ ...defaultStyles, ...rest }}>
      {children}
    </div>
  );
};

FlexContainer.propTypes = {
  children: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  alignItems: PropTypes.oneOf([
    'stretch',
    'center',
    'flexStart',
    'flexEnd',
    'baseline',
    'initial',
    'inherit',
  ]),
  justifyContent: PropTypes.oneOf([
    'flexStart',
    'flexEnd',
    'center',
    'spaceBetween',
    'spaceAround',
    'initial',
    'inherit',
  ]),
  flexDirection: PropTypes.oneOf(['row', 'column']),
  keepHeight: PropTypes.bool,
  noShrink: PropTypes.bool,
  growToContainer: PropTypes.bool,
  wrap: PropTypes.bool,
  scroll: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FlexContainer.defaultProps = {
  className: null,
  alignItems: null,
  justifyContent: null,
  flexDirection: null,
  keepHeight: false,
  noShrink: false,
  growToContainer: false,
  wrap: false,
  scroll: false,
  flex: null,
};

export default FlexContainer;
import React from 'react';
import PropTypes from 'prop-types';

const FlexContainer = (props) => {
  const {
    children, className, style, id, ...rest
  } = props;
  const defaultStyles = {
    display: 'flex',
  };
  return (
    <div
      id={id}
      style={{
        alignSelf: 'flex-start', ...defaultStyles, ...style, ...rest,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alignItems: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'baseline',
    'initial',
    'inherit',
  ]),
  justifyContent: PropTypes.oneOf([
    'flexStart',
    'flexEnd',
    'center',
    'space-between',
    'space-around',
    'initial',
    'inherit',
  ]),
  alignSelf: PropTypes.oneOf([
    'flex-start',
    'flex-end',
  ]),
  flexDirection: PropTypes.oneOf(['row', 'column']),
  keepHeight: PropTypes.bool,
  noShrink: PropTypes.bool,
  wrap: PropTypes.bool,
  scroll: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape(),
  id: PropTypes.string,
};

FlexContainer.defaultProps = {
  className: null,
  style: null,
  alignItems: null,
  justifyContent: null,
  flexDirection: null,
  keepHeight: false,
  noShrink: false,
  wrap: false,
  scroll: false,
  flex: null,
  alignSelf: null,
  id: null,
};

export default FlexContainer;

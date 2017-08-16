import React from 'react';

/************************************
 *    THIS IS A STATELESS FUNCTION
 ***********************************/

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
        Day
      </h1>
      <h3 className="tagline">
          <span>
            {props.tagline}
          </span>
      </h3>
    </header>
  )
}

/******************************************************************************
 *           PropTypes helps to define what data type is requiered
 *    https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * ****************************************************************************/

Header.prototype = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;

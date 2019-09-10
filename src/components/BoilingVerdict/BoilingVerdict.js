import React from "react";
import PropTypes from "prop-types";

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
export default BoilingVerdict;

import React from "react";
import PropTypes from "prop-types";
import BoilingVerdict from "../BoilingVerdict/BoilingVerdict";
import TempInput from "./TempInput";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <div>
        <TempInput scale="c" />
        <TempInput scale="f" />
      </div>
    );
  }
}
export default Calculator;

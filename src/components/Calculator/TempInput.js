import React from "react";
import PropTypes from "prop-types";

const scaleNames = {
  c: "Celsius",
  f: "Farenheit"
};
//The Calculator doesn’t know the current temperature because it is hidden inside the TemperatureInput.
class TempInput extends React.Component {
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
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
export default TempInput;

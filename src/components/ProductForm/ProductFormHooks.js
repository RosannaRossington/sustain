import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductForm = () {

const [product, setProdyc] = useState(111111);


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const productNumbers = this.state.value.match(/\d/g);
    const finalProductNumber = productNumbers.join("");
    this.setState({ value: finalProductNumber });
    alert("A product was submitted: " + finalProductNumber);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Product URL:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ProductForm;

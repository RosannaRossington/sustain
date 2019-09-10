import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//controlled component using event handlers
export class ProductForm extends PureComponent {
  constructor(props) {
    super(props);
    //   //set the value attribute on the form element this.state.value === product URL
    this.state = { products: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // this is running and updating the state on every keystroke
  // can easily modify (change to uppercase)or validate the input
  // maybe pull out only the product code
  handleChange(event) {
    const productNumbers = event.target.value.match(/\d/g);
    const finalProductNumber = productNumbers.join("");
    this.setState({ value: finalProductNumber });
  }

  handleSubmit(event, state) {
    const productId = JSON.stringify(this.state.value);
    const url = `https://ecomm.ynap.biz/yoox/ton/search/resources/store/theoutnet_GB/productview/${productId}`;
    axios
      .get(url, {
        headers: {
          "x-ibm-client-Id": "705b890d-fdb9-4867-a392-331c2fb86e19"
        }
      })
      .then(response => {
        // create an array of products only with relevant data
        const newProducts = response.data.products.map(p => {
          return [
            p.name,
            p.designerName,
            p.productColours[0].sKUs[0].composition
          ];
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          products: newProducts
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }

  componentDidMount() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>{this.state.products} </div>
        <div>"Product is"{this.state.products[3]} </div>

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

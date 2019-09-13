import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//https://stackoverflow.com/questions/47956521/chain-requests-so-i-can-use-data-from-my-first-request-in-my-second-one
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

  handleSubmit(event) {
    const productId = JSON.stringify(this.state.value);
    const productUrl = `https://ecomm.ynap.biz/yoox/ton/search/resources/store/theoutnet_GB/productview/${productId}`;
    const impactUrl = "../impact.json";

    axios
      .get(productUrl, {
        headers: {
          "x-ibm-client-Id": "705b890d-fdb9-4867-a392-331c2fb86e19"
        }
      })
      .then(response => {
        // create an array of products only with relevant data
        const productMaterial = response.data.products.map(p => {
          return [p.productColours[0].sKUs[0].composition];
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          products: productMaterial
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));

    // const getMaterialImpact = () => {
    //   axios
    //   .get(impactUrl)
    //   .then(response => {
    //     //check productId matches material_name if so return impact object
    //     const impacts = response.data.impacts.map(m => {
    //       if(m.material_name === productId){
    //         return [
    //           m.physical_waste_total
    //         ];
    //       }
    //     }
    //     const impactState = Object.assign({}, this.state, {
    //       impacts: newImpacts
    //     });

    //     this.setState(impactState);
    //   })
    //   .catch(error => console.log(error));
    // };
    event.preventDefault();
  }

  //state has changed and now includes the material so now want to make a call to return imapct of the material
  componentDidUpdate() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Material:{this.state.products}</div>
        <div>This material impacts:</div>
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

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//https://stackoverflow.com/questions/47956521/chain-requests-so-i-can-use-data-from-my-first-request-in-my-second-one
//controlled component using event handlers
//https://www.theoutnet.com/en-gb/shop/product/biker-jackets_cod7600457660131157.html#dept=INTL_IRO_DESIGNERS ERROR CASE
export class ProductForm extends PureComponent {
  constructor(props) {
    super(props);
    //   //set the value attribute on the form element this.state.value === product URL
    this.state = { products: [], materialLocation: [] };

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
    const impacts = [
      {
        geographic_location: "Spain",
        material_name: "Nylon",
        total_score: 10,
        chemistry_total: 12,
        energy_ghg_emissions_intensity_total: 20,
        water_land_intensity_total: 22,
        physical_waste_total: 22
      },
      {
        geographic_location: "India",
        material_name: "Cotton",
        total_score: 10,
        chemistry_total: 12,
        energy_ghg_emissions_intensity_total: 20,
        water_land_intensity_total: 22,
        physical_waste_total: 22
      },
      {
        geographic_location: "India",
        material_name: "Polyester",
        total_score: 10,
        chemistry_total: 12,
        energy_ghg_emissions_intensity_total: 20,
        water_land_intensity_total: 22,
        physical_waste_total: 22
      },
      {
        geographic_location: "India",
        material_name: "Viscose",
        total_score: 10,
        chemistry_total: 12,
        energy_ghg_emissions_intensity_total: 20,
        water_land_intensity_total: 22,
        physical_waste_total: 22
      }
    ];

    axios
      .get(productUrl, {
        headers: {
          "x-ibm-client-Id": "705b890d-fdb9-4867-a392-331c2fb86e19"
        }
      })
      .then(response => {
        const productMaterial = response.data.products.map(p => {
          return [p.productColours[0].sKUs[0].composition];
        });

        const newState = Object.assign({}, this.state, {
          products: productMaterial
        });

        this.setState(newState);

        {
          impacts.map(impact => {
            const composition = this.state.products[0];
            const materialOnly = composition
              .toString()
              .replace(/[^A-Za-z]+/g, "");

            const impactCheck = obj => obj.material_name === materialOnly;
            const impactInfo = impacts.find(impactCheck);
            const materialLocation = impactInfo.geographic_location;
            const water = impactInfo.water_land_intensity_total;
            const carbonFootprint =
              impactInfo.energy_ghg_emissions_intensity_total;
            const addState = Object.assign({}, this.state, {
              materialLocation: materialLocation,
              water: water,
              carbonFootprint: carbonFootprint
            });
            this.setState(addState);
          });
        }
      })
      .catch(error => console.log(error));

    event.preventDefault();
  }

  componentDidUpdate() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>Material composition:{this.state.products}</div>
        <div>This came from:{this.state.materialLocation}</div>
        <div>Water:{this.state.water}</div>
        <div>Carbon Footprint:{this.state.carbonFootprint}</div>

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

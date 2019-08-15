import React, { Component } from "react";
import DiscountOne from "./components/DiscountOne";
import DiscountTwo from "./components/DiscountTwo";

class Discount extends Component {
  render() {
    return <div>{1 == 2 ? <DiscountOne /> : <DiscountTwo />}</div>;
  }
}

export default Discount;

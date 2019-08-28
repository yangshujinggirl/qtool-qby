import React, { Component } from "react";
import { connect } from "dva";
import DiscountOne from "./components/DiscountOne";
import DiscountTwo from "./components/DiscountTwo";

class Discount extends Component {
  render() {
    const { promotionType,form } = this.props;
    return (
      <div>
        {promotionType == 20 || promotionType == 21 ? (
          <DiscountOne form={form}/>
        ) : (
          (promotionType == 22 || promotionType == 23) && <DiscountTwo form={form}/>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ctipActivityAddTwo } = state;
  return ctipActivityAddTwo;
}
export default connect(mapStateToProps)(Discount);

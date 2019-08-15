import React, { Component } from "react";
import StepMod from "./components/StepMod";
import SetTitle from "./components/SetGood/Title";
import Discount from "./components/SetGood/Discount";
import './index.less'

class CtipActivityAddTwo extends Component {
  render() {
    return (
      <div className='set_goods'>
        <StepMod step={1} />
        <div className="title">优惠内容</div>
        <SetTitle type={2}/>
        <Discount/>
      </div>
    );
  }
}

export default CtipActivityAddTwo;

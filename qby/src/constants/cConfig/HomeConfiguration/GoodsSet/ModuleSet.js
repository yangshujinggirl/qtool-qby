import React, { Component } from 'react';
import {connect} from 'dva'
import ModuleSets from './components/ModuleSet'
class ModuleSet extends Component {
  render() {
    const { homepageModuleId,goodType} = this.props;
    return (
      <div>
        <ModuleSets type={35} homepageModuleId={homepageModuleId} goodType={goodType}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {goodsSet} = state;
  return goodsSet
}
export default connect(mapStateToProps)(ModuleSet);
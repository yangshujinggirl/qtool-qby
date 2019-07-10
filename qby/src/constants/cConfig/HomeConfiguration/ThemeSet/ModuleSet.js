import React, { Component } from 'react';
import ModuleSets from '../GoodsSet/components/ModuleSet'
class ModuleSet extends Component {
  render() {
    const { homePageModuleId } = this.props;
    return (
      <div>
        <ModuleSets type={50} homePageModuleId={homePageModuleId}/>
      </div>
    );
  }
}

export default ModuleSet;
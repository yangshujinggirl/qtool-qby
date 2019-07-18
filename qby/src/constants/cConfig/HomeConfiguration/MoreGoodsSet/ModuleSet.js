import React, { Component } from 'react';
import ModuleSets from '../GoodsSet/components/ModuleSet'
class ModuleSet extends Component {
  render() {
    const { homepageModuleId } = this.props;
    return (
      <div>
        <ModuleSets type={45} homepageModuleId={homepageModuleId}/>
      </div>
    );
  }
}

export default ModuleSet;

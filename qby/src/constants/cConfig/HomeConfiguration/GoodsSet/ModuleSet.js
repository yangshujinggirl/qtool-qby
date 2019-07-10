import React, { Component } from 'react';
import ModuleSets from './components/ModuleSet'
class ModuleSet extends Component {
  render() {
    const { homePageModuleId } = this.props;
    return (
      <div>
        <ModuleSets type={35} homePageModuleId={homePageModuleId}/>
      </div>
    );
  }
}

export default ModuleSet;
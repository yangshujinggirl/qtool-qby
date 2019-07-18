import React, { Component } from 'react';
import ModuleSets from './components/ModuleSet'
class ModuleSet extends Component {
  render() {
    const { homepageModuleId } = this.props;
    return (
      <div>
        <ModuleSets type={35} homepageModuleId={homepageModuleId} callback={this.props.callback}/>
      </div>
    );
  }
}

export default ModuleSet;
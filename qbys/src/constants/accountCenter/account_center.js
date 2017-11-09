import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import '../../style/account_center.css';
import AccountIndexTable from '../accountCenter/account_table';

class AccountIndex extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  addNewAccount = () =>{
  	this.props.dispatch({
	    type:'tab/addChildrenTab',
	    payload:'新增账号'
	  })
  }

  render(){
     return(
        <div className='content_box'>
          <div className = 'white_box'>
             <Button type="primary" icon="plus" className='add-button' 
                     onClick={this.addNewAccount.bind(this)}>新增账号</Button>
             <AccountIndexTable/>
          </div>
        </div>
      )
  }
  componentDidMount(){
    
  }
}

function mapStateToProps(state) {
    const {accountInfo} = state.account;
    return {accountInfo};
}

export default connect(mapStateToProps)(AccountIndex);
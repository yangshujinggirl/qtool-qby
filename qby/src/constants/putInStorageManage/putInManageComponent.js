import React from 'react';
import { connect } from 'dva';
//头部搜索部分
import StorageManageSearch from '../putInStorageManage/storageManageSearch';
import StorageManageTable from '../putInStorageManage/storageManageTable';
import {cloneObj} from '../../utils/commonFc';

class PutInManageComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            searchData:{},
            currentPage:0
        }
    }

      //获取当前的页码
    getCurrentPage = (currentPage) =>{
        this.setState({
            currentPage:currentPage
        },function(){
            let data  = {};
            if(this.state.searchData){
                data = cloneObj(this.state.searchData);
                data.currentPage = this.state.currentPage;
            }else{
                data.currentPage = this.state.currentPage;
            }
            this.props.dispatch({
               type:'storageManage/fetch',
               payload:{code:'qerp.web.ws.asn.query',values:data}
           });
        });
    }
      

      //获取当前搜索框的搜索信息
    getSearchData = (searchData) =>{
        this.setState({
            searchData,
            currentPage:0
        },function(){
            const data = this.state.searchData;
             this.props.dispatch({
                type:'storageManage/fetch',
                payload:{code:'qerp.web.ws.asn.query',values:data}
            })
        });
    }

  	render(){
     	return(
        	<div>
                <StorageManageSearch getSearchData={this.getSearchData.bind(this)}/>
                <div className='table-wrapper'>
                    <StorageManageTable dataList={this.props.dataList} 
                                        total={this.props.allData.total} 
                                        getCurrentPage={this.getCurrentPage.bind(this)}
                                        current={this.state.currentPage+1}/>
                </div>
            </div>
      	)
      }
      
      componentDidMount(){
        this.props.dispatch({
            type:'storageManage/fetch',
            payload:{code:'qerp.web.ws.asn.query',values:{}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
    }
}


function mapStateToProps(state) {
    const dataList = state.storageManage.dataList;
    const allData = state.storageManage.allData;
    return {dataList,allData};
    // return {};
}

export default connect(mapStateToProps)(PutInManageComponent);
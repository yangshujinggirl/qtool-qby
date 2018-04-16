require('../../../style/specs.css')
import React from 'react';
import EditableTable from '../../../components/table/tablebasics'
import CollectionsPage from './model'
import CollectionsPages from './addmodel'
import { Button } from 'antd';
import { connect } from 'dva';

class Specsindex extends React.Component {
	constructor(props) {
		super(props);
		this.columns=[
			{
				width: '100px',
				dataIndex: 'name'
			},
		 	{
				dataIndex: 'attribute',
				render: (text, record) => {
					return (
						<div className='list-con'>
							{
								record.pdTypeVals.map((item,index)=>{
									return  <div className='list-item' key={index}><CollectionsPage  type='2' statetype={item.status=='1'?null:'dashed'} data={{pdTypeId:item.pdTypeId,name:item.name,status:item.status,pdTypeValId:item.pdTypeValId}} title='修改属性' text={item.name} pdTypes={this.props.pdTypes}/></div>
								})
							}
						</div> 
					);
				}
			}, 
			{
				width: '100px',
				dataIndex: 'operation',
				render: (text, record) => {
				return (
					<CollectionsPage type='1' pdTypes={this.props.pdTypes} data={{pdTypeId:record.pdTypeId,name:null,status:'1'}} title='新增属性' text='新增属性'/>
				);
			}
			}
		]
		this.columnsrole=[
			{
				width: '100px',
				dataIndex: 'name'
			},
		 	{
				dataIndex: 'attribute',
				render: (text, record) => {
					return (
						<div className='list-con'>
							{
								record.pdTypeVals.map((item,index)=>{
									return  <div className='list-item' key={index}><CollectionsPage  type='2' statetype={item.status=='1'?null:'dashed'} data={{pdTypeId:item.pdTypeId,name:item.name,status:item.status,pdTypeValId:item.pdTypeValId}} title='修改属性' text={item.name} pdTypes={this.props.pdTypes} rolelists={this.props.data.rolelists}/></div>
								})
							}
						</div> 
					);
				}
			}
		]
		this.state = {
			pdTypes:[]
		}
	}

	refresh=()=>{
		const result=getguigelist()
			result.then((res) => {
				return res;
			}).then((json) => {
				const data=json.pdTypes
				this.setState({
					pdTypes:data
				})
			})
	}
	getSpecsData=()=>{
		this.props.dispatch({
			type:'specs/specsfetch',
			payload:{code:'qerp.web.pd.type.list',values:{}}
		})
	}


	render() {
		const rolelists=this.props.data.rolelists
		//新增修改
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.ctorder.save"
		})
		return (
			<div className='content_box classssd'>
				{
					addorder?<div className='tl mb15'><CollectionsPages title='新增规格' text='新增规格' statetype='primary'/></div>:null
				}
					
					<EditableTable dataSource={this.props.pdTypes} columns={addorder?this.columns:this.columnsrole} showHeader={false} bordered={false}/>
			</div>
		)
	}	
	componentDidMount(){
		this.getSpecsData()
	}
}

function mapStateToProps(state) {
	const {pdTypes} = state.specs;
    return {pdTypes};
}

export default connect(mapStateToProps)(Specsindex);

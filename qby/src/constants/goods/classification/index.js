require('../../../style/specs.css')
import React from 'react';
import EditableTable from '../../../components/table/tablebasics'
import CollectionsPage from './model'
import CollectionsPages from './addmodel'
import { Button } from 'antd';
import { connect } from 'dva';

class Classificationindex extends React.Component {
	constructor(props) {
		super(props);
		this.columns=[{
				width: '100px',
				dataIndex: 'name',
				width:'15%'
			}, {
			dataIndex: 'attribute',
			render: (text, record) => {
				return (
					<div className='list-con'>
						{
							record.childrens.map((item,index)=>{
								return ( 
									<div className='list-item' key={index}>
										<CollectionsPage  
											type='2' 
											statetype={item.status=='1'?null:'dashed'} 
											data={{pdCategoryIds:item.parentId,name:item.name,status:item.status,pdCategoryId:item.pdCategoryId,type:item.type}} 
											title='修改属性' 
											text={item.name} 
											pdTypes={this.props.pdTypes}
											rolelists={this.props.data.rolelists}
											
										/>
									</div>
								)
							})
						}
					</div> 
				);
			}
			}, {
				width: '100px',
				dataIndex: 'operation',
				render: (text, record) => {
					return (
						<CollectionsPage type='1' pdTypes={this.props.pdTypes} data={{pdCategoryIds:record.pdCategoryId,name:null,status:'1',type:record.type}} title='新增属性' text='新增属性' rolelists={this.props.data.rolelists}/>
					);
				}
			}]
			this.columnsrole=[{
				width: '100px',
				dataIndex: 'name'
			}, {
			dataIndex: 'attribute',
			render: (text, record) => {
				return (
					<div className='list-con'>
						{
							record.childrens.map((item,index)=>{
								return ( 
									<div className='list-item' key={index}>
										<CollectionsPage  
											rolelists={this.props.data.rolelists}
											type='2' 
											statetype={item.status=='1'?null:'dashed'} 
											data={{pdCategoryIds:item.parentId,name:item.name,status:item.status,pdCategoryId:item.pdCategoryId,type:item.type}} 
											title='修改属性' 
											text={item.name} 
											pdTypes={this.props.pdTypes}/>
									</div>
								)
							})
						}
					</div> 
				);
			}
			}]





		this.state = {
			pdTypes:[],
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
	getClassData=()=>{
		this.props.dispatch({
			type:'fenlei/classfetch',
			payload:{code:'qerp.web.pd.category.list',values:{getChildren:true}}
		})
	}


	render() {
		const rolelists=this.props.data.rolelists
		//新增修改
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.category.save"
		})
		return (
			<div className='content_box classssd'>
					{
						addorder?<div className='tl mb15'><CollectionsPages title='新增分类' text='新增分类' statetype='primary'/></div> :null
					}
					
					<EditableTable dataSource={this.props.pdCategoryslist} columns={addorder?this.columns:this.columnsrole} showHeader={false} bordered={false}/>
			</div>
		)
	}	
	componentDidMount(){
		this.getClassData()
	}
}

function mapStateToProps(state) {
	const {pdCategoryslist} = state.fenlei;
    return {pdCategoryslist};
}





export default connect(mapStateToProps)(Classificationindex);

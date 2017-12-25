	import { Input,message ,Button,Form, Select,AutoComplete,Row,Col,Radio} from 'antd';
	import {GetServerData} from '../../../services/services';
	import { connect } from 'dva';
	import PicturesWall from './upload';
	import SkuPicturesWall from './itemupload';
	import Skucom from './skucom';
	import EditableTagGroup from './tag';
	import TableCanEdit from './edittable';
	const RadioGroup = Radio.Group;

	const FormItem = Form.Item;
	const Option = Select.Option;

	class App extends React.Component {
		constructor(props) {
			super(props);
			this.columns = [{
				title: '规格',
				dataIndex: 'name'
			},{
				title: '商品编码',
				dataIndex: 'code',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}

			}, {
				title: '商品条码',
				dataIndex: 'barcode',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '售价',
				dataIndex: 'toBPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '零售价',
				dataIndex: 'toCPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '进货价',
				dataIndex: 'costPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: 'SKU图片',
				dataIndex: 'picUrl',
				render: (text, record,index) => {
					return (
						<SkuPicturesWall url={text} index={index}/>
					);
				}
			}];    
			this.columnsuse = [{
				title: '商品编码',
				dataIndex: 'code',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '商品条码',
				dataIndex: 'barcode',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			}, {
				title: '售价',
				dataIndex: 'toBPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '零售价',
				dataIndex: 'toCPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			},{
				title: '进货价',
				dataIndex: 'costPrice',
				render: (text, record) => {
					return (
						<Input value={text}/>
					);
				}
			}];  

			this.state = {
				pdBrandId:'',
				dataSource:[],
				issku:false
			};  
		}




		



	handleSubmit = (e) => {
		this.props.form.validateFields((err, values) => {
		if (!err) {
			console.log('Received values of form: ', values);
			console.log(this.props)
		}	
		});
	}
	handleSelectChange = (value) => {
		console.log(value);
		this.props.form.setFieldsValue({
		note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		});
	}

	//请求商品分类
	Categorylist=()=>{
		const value={
			getChildren:false,
			enabled:true
		}
		this.props.dispatch({
			type:'IndexPage/categoryfetch',
			payload:{code:'qerp.web.pd.category.list',values:value}
		})
	}

	//商品规格
	pdTypeslist=()=>{
		const value={
			enabled:true
		}
		this.props.dispatch({
			type:'goods/pdTypeslist',
			payload:{code:'qerp.web.pd.type.list',values:value}
		})
		
	}



	Handcancel=()=>{

	}

		handleSearch=(value)=>{
			let values={name:value}
			const result=GetServerData('qerp.web.pd.brand.search',values)
			result.then((res) => {
				return res;
			}).then((json) => {
				if(json.code=='0'){
					const brands=json.brands
					const data=[]
					for(var i=0;i<brands.length;i++){
						data.push({
							text:brands[i].name,
							value:brands[i].pdBrandId
						})
					}
					this.setState({
						dataSource:data,
						pdBrandId:null
					});
				}
			})
		}
		onSelect=(value)=>{
			this.setState({
				pdBrandId:value
			})
		}


	//商品信息请求
	spuInfo=()=>{
		const value={pdSpuId:this.props.data.pdSpuId}
		this.props.dispatch({
			type:'goods/infofetch',
			payload:{code:'qerp.web.pd.spu.info',values:value}
		})
	}


	//判断商品信息是哪个表格：非上传表和上传表
	tableColumn=()=>{
		const pdType1Id=this.props.pdType1Id
		const pdType2Id=this.props.pdType2Id 
		const tag1=this.props.tag1 
		const tag2=this.props.tag2
		if(pdType1Id!='00' && tag1.length>0){
			if(pdType2Id=='00' || (pdType2Id!='00' && tag2.length>0)){
				const isskus=true
				this.props.dispatch({
					type:'goods/isskus',
					payload:isskus
				})
			}
		}


	}


	handleSelectChange_guige1=(value)=>{
		const pdType1Ids=value
		const pdType2Ids=this.props.pdType2Id
		const tag1s=[]
		const tag2s=this.props.tag2
		this.props.dispatch({
			type:'goods/goodsinfoChange',
			payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}
		})
	}

	handleSelectChange_guige2=(value)=>{
		const pdType1Ids=this.props.pdType1Id
		const pdType2Ids=value
		const tag1s=this.props.tag1
		const tag2s=[]
		this.props.dispatch({
			type:'goods/goodsinfoChange',
			payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}
		})
	}

	tag1Change=()=>{

	}

	tag2Change=()=>{

	}


	handleInputConfirm1=()=>{



	}
	handleInputConfirm2=()=>{
		
	}


	allRadioChange=()=>{

	}

	lotStatusChange=(e)=>{
		const lotStatusstate=e.target.value
		this.props.dispatch({
			type:'goods/lotStatusstate',
			payload:lotStatusstate
		})
		this.props.form.setFieldsValue({
			expdays: null,
			lotLimitInDay:null,
		  });

		if(lotStatusstate=='1'){
			this.props.form.setFieldsValue({
				lotType:'1'
			  });
		}else{
			this.props.form.setFieldsValue({
				lotType:null
			  });
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		<Form>
			<FormItem
					label="商品名称"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入商品名称' }],
						initialValue:this.props.name
					})(
						<Input placeholder="请输入商品名称"/>
					)}
						</FormItem>
						<FormItem
							label="商品分类"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
						>
							{getFieldDecorator('pdCategory1Id', {
								rules: [{ required: true, message: '请选择商品分类'}],
								onChange: this.handleSelectChange,
								initialValue:String(this.props.pdCategory1Id)
							})(
								<Select placeholder="请选择商品分类">
									{
									this.props.pdCategorysList.map((item,index)=>{
										return (<Option value={String(item.pdCategoryId)} key={index}>{item.name}</Option>)
									})
									}
								</Select>
							)}
						</FormItem>
					<FormItem
						label="商品类型"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('pdCategory2Id', {
						rules: [{ required: true, message: '请选择商品类型'}],
						initialValue:String(this.props.pdCategory2Id)

						})(
						<Select placeholder="请选择商品类型">
							{
								this.props.pdCategorys.length>0
								?
								this.props.pdCategorys.map((item,index)=>{
										return (<Option value={String(item.pdCategoryId)} key={index}>{item.name}</Option>)
									})
								:null
							}
						</Select>
						)}
					</FormItem>
					<FormItem
						label="品牌"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('pdBrandId', {
							rules: [{ required: true, message: '请选择商品品牌'}],
							initialValue:this.props.pdBrand.name
						})(
							<AutoComplete
							dataSource={this.state.dataSource}
							onSelect={this.onSelect}
							onSearch={this.handleSearch}
							filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
							placeholder='请选择商品品牌'
							/>
						)}
						</FormItem>
						<FormItem
						label="商品图片"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('imgs', {
							
						})(
							<PicturesWall/>
						)}
						</FormItem>
						<FormItem
						label="商品规格1"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('guige1', {
						onChange: this.handleSelectChange_guige1,
						initialValue:String(this.props.pdType1Id)
						})(
						<Select>
							<Option value='00' key='0'>无</Option>
							{
							this.props.pdTypeslist.map((item,index)=>{
								return (<Option value={String(item.pdTypeId)} key={index}>{item.name}</Option>)
							})
							}
						</Select>
						)}
					</FormItem>
					<FormItem>
						<Row>
							<Col span={12} offset={8}>
								<EditableTagGroup tags={this.props.tag1} tagChange={this.tag1Change.bind(this)} types='1' pdTypesId={this.props.pdType1Id}/>
							</Col>
						</Row>
					</FormItem>
					<FormItem
						label="商品规格2"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('guige2', {
						onChange: this.handleSelectChange_guige1,
						initialValue:String(this.props.pdType2Id)
						})(
						<Select>
							<Option value='00' key='0'>无</Option>
							{
							this.props.pdTypeslist.map((item,index)=>{
								return (<Option value={String(item.pdTypeId)} key={index}>{item.name}</Option>)
							})
							}
						</Select>
						)}
					</FormItem>
					<FormItem>
						<Row>
							<Col span={12} offset={8}>
							<EditableTagGroup tags={this.props.tag2} tagChange={this.tag2Change.bind(this)} types='2' pdTypesId={this.props.pdType2Id}/>
							</Col>
						</Row>
					</FormItem>
					<FormItem
						label="商品信息"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 16 }}
					>
						<TableCanEdit columns={this.props.isskus?this.columns:this.columnsuse} dataSources={this.props.goodindodatasouce}/>
						
					</FormItem>
					<FormItem
						label="开启批次管理"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('lotStatus', {
							 onChange: this.lotStatusChange,
							 initialValue:String(this.props.lotStatus)
						})(
							<RadioGroup
							
						>
							<Radio value='1'>是</Radio>
							<Radio value='0'>否</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
							label="保质期"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
							>
							{getFieldDecorator('expdays', {
								initialValue:this.props.expdays,
								rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
							})(
								<Input disabled={this.props.lotStatus=='1'?false:true}/>
							)}
					</FormItem>
					<FormItem
						label="保质依据"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('lotType', {
							 initialValue:String(this.props.lotType)
						})(
							<RadioGroup
							disabled={this.props.lotStatus=='1'?false:true}
						>
							<Radio value='1'>生产日期</Radio>
							<Radio value='0'>到期日期</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="禁止入库"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('lotLimitInDay', {
							initialValue:this.props.lotLimitInDays,
							rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
						})(
							<Input disabled={this.props.lotStatus=='1'?false:true}/>
						)}
					</FormItem>
					<FormItem
						label="加入上新"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('eventNew', {
							 initialValue:this.props.eventNew
						})(
							<RadioGroup
						>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="加入畅销"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('eventHot', {
							 initialValue:this.props.eventHot
						})(
							<RadioGroup
						>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="直邮商品"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('isDirectExpress', {
							 initialValue:String(this.props.isDirectExpress)
						})(
							<RadioGroup
						>
							<Radio value='1'>是</Radio>
							<Radio value='0'>否</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="预售商品"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('isPresell', {
							 initialValue:String(this.props.isPresell)
						})(
							<RadioGroup
						>
							<Radio value='1'>是</Radio>
							<Radio value='0'>否</Radio>
						</RadioGroup>
						)}
					</FormItem>




						
						
						
						
					{/* <Row>
						<Col span={8} style={{textAlign:'right', paddingRight:'10px'}}><p>商品描述:</p></Col>
					</Row> */}
						{/* <Row><Col span={20} offset={2}><EditableTable3 BackSpudesDatasouce={this.BackSpudesDatasouce.bind(this)}/></Col></Row>  */}
					<FormItem wrapperCol={{ offset: 9}} style = {{marginBottom:0}} style = {{marginTop:'20px'}}>
						<Button onClick={this.Handcancel.bind(this)} style = {{marginRight:'50px'}}>取消</Button>
						<Button htmlType="submit" onClick={this.handleSubmit.bind(this)}>保存</Button>
					</FormItem>
		</Form>
		);
	}
	componentDidMount(){
		this.pdTypeslist()
		this.Categorylist()
		this.spuInfo()



	}


	}

	const GoodEdit = Form.create()(App);

	function mapStateToProps(state) {
		console.log(state)
		const {limit,currentPage,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdCategorys,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell} = state.goods;
		const {pdCategorysList}=state.IndexPage;
		console.log(goodindodatasouce)
		return {limit,currentPage,pdCategorys,pdCategorysList,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell};
	}

	export default connect(mapStateToProps)(GoodEdit);

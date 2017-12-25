	import { Input,message ,Button,Form, Select,AutoComplete,Row,Col} from 'antd';
	import {GetServerData} from '../../../services/services';
	import { connect } from 'dva';
	import PicturesWall from './upload';
	import Skucom from './skucom';
	import EditableTagGroup from './tag';
	import TableCanEdit from './edittable';

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
				dataIndex: 'code'
			}, {
				title: '商品条码',
				dataIndex: 'barcode'
			},{
				title: '售价',
				dataIndex: 'toBPrice'
			},{
				title: '零售价',
				dataIndex: 'toCPrice'
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice'
			},{
				title: '进货价',
				dataIndex: 'costPrice'
			},{
				title: 'SKU图片',
				dataIndex: 'picUrl',
				render: (text, record) => {
					return (
						123
					);
				}
			}];    
			this.columnsuse = [{
				title: '商品编码',
				dataIndex: 'code',
			},{
				title: '商品条码',
				dataIndex: 'barcode'
			}, {
				title: '售价',
				dataIndex: 'toBPrice'
			},{
				title: '零售价',
				dataIndex: 'toCPrice'
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice'
			},{
				title: '进货价',
				dataIndex: 'costPrice'
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
							rules: [{ required: true, message: '请选择商品品牌'}]
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
						{getFieldDecorator('info', {
							// onChange: this.handleSelectChange_guige1,
							// initialValue:String(this.props.pdType2Id)
						})(
							<TableCanEdit columns={this.props.isskus?this.columns:this.columnsuse} dataSources={this.props.goodindodatasouce}/>
						)}
					</FormItem>







					{/* <FormItem
						label="品牌"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('pdBrandId', {
							rules: [{ required: true, message: '请选择商品品牌'}]
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
					<Row>
						<Col span={8} style={{textAlign:'right', paddingRight:'10px'}}><p>商品图片:</p></Col>
					</Row>
					<Row>
						<Col span={12} offset={8}><PicturesWall spuPics={this.state.spuIdPics} Backpic={this.Backpic.bind(this)}/></Col>
					</Row>
					<FormItem
						label="商品规格1"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('guige1', {
						onChange: this.handleSelectChange_guige1,
						initialValue:'00'
						})(
						<Select>
							<Option value='00' key='0'>无</Option>
							{
							this.state.pdTypes.map((item,index)=>{
								return (<Option value={String(item.pdTypeId)} key={index}>{item.name}</Option>)
							})
							}
						</Select>
						)}
					</FormItem>
					<div style={{marginBottom:'24px'}}>
						<Row>
							<Col span={12} offset={8}>
								<EditableTagGroup1 pdTypeVals1={this.state.pdTypeVals1} ref='HotTags1'  chooseselect2={this.state.chooseselect2} pdTypeVals1_name={this.state.pdTypeVals1_name} Makedesouce={this.Makedesouce.bind(this)}/>
							</Col>
						</Row>
					</div>
					<FormItem
						label="商品规格2"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('guige2', {
						onChange: this.handleSelectChange_guige2,
						initialValue:'00'
						})(
						<Select>
							<Option value='00' key='0'>无</Option>
							{
							this.state.pdTypes.map((item,index)=>{
								return (<Option value={String(item.pdTypeId)} key={index}>{item.name}</Option>)
							})
							}
						</Select>
						)}
					</FormItem>
					<div style={{marginBottom:'24px'}}>
						<Row>
						<Col span={12} offset={8}><EditableTagGroup2 pdTypeVals1={this.state.pdTypeVals1} ref='HotTags2'  chooseselect2={this.state.chooseselect2}  Makedesouce={this.Makedesouce.bind(this)}/></Col>
						</Row>
					</div>
					<Row>
						<Col span={8} style={{textAlign:'right', paddingRight:'10px'}}><p>商品信息:</p></Col>
					</Row>
					{
						this.state.nomakesouce
						?<Row><Col span={20} offset={2}><EditableTable2 pdSkus={this.state.pdSkus} ref='editableTable2' Backesouce={this.Backesouce.bind(this)} makesouce2={this.state.makesouce2}/></Col></Row>
						:<Row><Col span={20} offset={2}><EditableTable pdSkus={this.state.pdSkus} ref='editableTable' Backesouce={this.Backesouce.bind(this)} makesouce={this.state.makesouce}/></Col></Row>
					}
						<FormItem style={{marginTop:'15px'}} label="开启批次管理" labelCol={{ span: 8 }}  wrapperCol={{ span: 6 }}>
							<RadioGroup
								onChange={this.onChange_RadioGroup_pici.bind(this)}
							value={this.state.lotStatus}
							>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
								</RadioGroup>
						</FormItem>
			
							{
							this.state.lotStatus=='1'
							?<FormItem
							label="保质期"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
							>
							{getFieldDecorator('expdays', {
								initialValue:this.state.expdays,
								rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
							})(
								<Input disabled={this.state.lotStatus=='1'?false:true} placeholder="请输入保质期(单位为天)"/>
							)}
							</FormItem>
							:<FormItem
							label="保质期"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
							>
							{getFieldDecorator('expdays', {
								initialValue:this.state.expdays,
								rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
							})(
								<Input disabled={this.state.lotStatus=='1'?false:true}/>
							)}
							</FormItem>
							}
							
							
							<FormItem style={{marginTop:'15px'}} label="保质依据" labelCol={{ span: 8 }}  wrapperCol={{ span: 6 }}>
								<RadioGroup
									onChange={this.onChange_RadioGroup_lotType.bind(this)}
									value={this.state.lotType}
									disabled={this.state.lotStatus=='1'?false:true}
								>
								<Radio value={1}>生产日期</Radio>
								<Radio value={2}>到期日期</Radio>
								</RadioGroup>
							</FormItem>
						
						{
							this.state.lotStatus=='1'
							?<FormItem
							label="禁止入库"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
							>
							{getFieldDecorator('lotLimitInDay', {
								initialValue:this.state.lotLimitInDays,
								rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
							})(
								<Input disabled={this.state.lotStatus=='1'?false:true} placeholder="低于填写天数禁止入库"/>
							)}
							</FormItem>
							:<FormItem
							label="禁止入库"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 6 }}
							>
							{getFieldDecorator('lotLimitInDay', {
								initialValue:this.state.lotLimitInDays,
								rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
							})(
								<Input disabled={this.state.lotStatus=='1'?false:true}/>
							)}
							</FormItem>
							}
						<FormItem label="加入上新" labelCol={{ span: 8 }}  wrapperCol={{ span: 6 }}>
							<RadioGroup
							onChange={this.onChange_RadioGroup_new.bind(this)}
							value={this.state.valuenew}
							>
								<Radio value={true}>是</Radio>
								<Radio value={false}>否</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem label="加入畅销" labelCol={{ span: 8}}  wrapperCol={{ span: 6 }}>
							<RadioGroup
							onChange={this.onChange_RadioGroup_hot.bind(this)}
							value={this.state.valuehot}
							>
								<Radio value={true}>是</Radio>
								<Radio value={false}>否</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem label="直邮商品" labelCol={{ span: 8}}  wrapperCol={{ span: 6 }}>
							<RadioGroup
							onChange={this.onChange_RadioGroup_isDirectExpress.bind(this)}
							value={this.state.isDirectExpress}
							>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem label="预售商品" labelCol={{ span: 8}}  wrapperCol={{ span: 6 }}>
							<RadioGroup
							onChange={this.onChange_RadioGroup_ispresale.bind(this)}
							value={this.state.isPresell}
							>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
								</RadioGroup>
						</FormItem>
						<Row>
						<Col span={8} style={{textAlign:'right', paddingRight:'10px'}}><p>商品描述:</p></Col>
					</Row>
						<Row><Col span={20} offset={2}><EditableTable3 BackSpudesDatasouce={this.BackSpudesDatasouce.bind(this)}/></Col></Row> */}
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
		const {cardtitle,cardlist,details,binCode,values,limit,currentPage,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdCategorys,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce} = state.goods;
		const {pdCategorysList}=state.IndexPage;
		return {cardtitle,cardlist,details,binCode,values,limit,currentPage,pdCategorys,pdCategorysList,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce};
	}

	export default connect(mapStateToProps)(GoodEdit);

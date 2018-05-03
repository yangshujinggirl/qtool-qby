	import { Input,message ,Button,Form, Select,AutoComplete,Row,Col,Radio} from 'antd';
	import {GetServerData} from '../../../services/services';
	import { connect } from 'dva';
	import PicturesWall from './upload';
	import SkuPicturesWall from './itemupload';
	import EditableTagGroup from './tag';
	import AddEditableTable from './add'
	import TableCanEdit from './edittable';
	import EditableCell from './tablepiuse';
	import {deepcCloneObj} from '../../../utils/commonFc';
	const RadioGroup = Radio.Group;

	const FormItem = Form.Item;
	const Option = Select.Option;

	class App extends React.Component {
		constructor(props) {
			super(props);
			this.columns = [{
				title: '规格',
				dataIndex: 'name',
				width:'10%'
			},{
				title: '商品编码',
				dataIndex: 'code',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindCodechange.bind(this,index)}/>
					);
				}

			}, {
				title: '商品条码',
				dataIndex: 'barcode',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindBarcodechange.bind(this,index)}/>
					);
				}
			},{
				title: '售价',
				dataIndex: 'toBPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtoBPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '零售价',
				dataIndex: 'toCPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtoCPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtagPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '进货价',
				dataIndex: 'costPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindcostPricechange.bind(this,index)}/>
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
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindCodechange.bind(this,index)}/>
					);
				}
			},{
				title: '商品条码',
				dataIndex: 'barcode',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindBarcodechange.bind(this,index)}/>
					);
				}
			}, {
				title: '售价',
				dataIndex: 'toBPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtoBPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '零售价',
				dataIndex: 'toCPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtoCPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '建议零售价',
				dataIndex: 'tagPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindtagPricechange.bind(this,index)}/>
					);
				}
			},{
				title: '进货价',
				dataIndex: 'costPrice',
				render: (text, record,index) => {
					return (
						<Input value={text} onChange={this.hindcostPricechange.bind(this,index)}/>
					);
				}
			}];  

			this.state = {
				pdBrandId:this.props.pdBrandId,
				dataSource:[],
				issku:false
			};  
		}
		//商品信息请求
		spuInfo=()=>{
			const value={pdSpuId:this.props.data.pdSpuId,source:'0'}
			this.props.dispatch({
				type:'goods/infofetch',
				payload:{code:'qerp.web.pd.spu.info',values:value}
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
		//请求商品分类
		Categorylist=()=>{
			const value={
				getChildren:false,
				enabled:true,
				type:'2'
			}
			this.props.dispatch({
				type:'goods/categoryfetch',
				payload:{code:'qerp.web.pd.category.list',values:value}
			})
		}
		//商品分类change
		handleSelectChange = (value) => {
			const pdCategory2Id=[]
			//根据id请求分类数据，更新数据
			const values={
				parentId:value,
				getChildren:true,
				enabled:true
			}
			this.props.dispatch({
				type:'goods/captlistfetch',
				payload:{code:'qerp.web.pd.category.list',values:values}
			})
			//初始化pdCategory2Id
			this.props.dispatch({
				type:'goods/pdCategory2Id',
				payload:pdCategory2Id
			})
			//设置pdCategory2值为空
			this.props.form.setFieldsValue({
				pdCategory2Id:[],
			  });

		}
		//品牌Search
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
		//品牌Select
		onSelect=(value)=>{
			const pdBrandId=value
			this.props.dispatch({
				type:'goods/pdBrandId',
				payload:pdBrandId
			})
		}
		//是否开启批次管理
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

		//商品规格信息

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
		//商品编码change
		hindCodechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].code=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}
		//商品条码change
		hindBarcodechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].barcode=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}
		//商品售价change
		hindtoBPricechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].toBPrice=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}
		//零售价change
		hindtoCPricechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].toCPrice=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}
		//建议零售价
		hindtagPricechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].tagPrice=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}
		//进货价售价
		hindcostPricechange=(index,e)=>{
			const goodindodatasouce=this.props.goodindodatasouce.slice(0)
			goodindodatasouce[index].costPrice=e.target.value
			this.props.dispatch({
				type:'goods/goodindodatasouce',
				payload:goodindodatasouce
			})
		}

		//确定
		handleSubmit = (e) => {
			this.props.form.validateFields((err, value) => {
			if (!err) {
				value.source='0'
				value.pdBrandId=this.props.pdBrandId
				value.spuPics=this.props.spuPics
				value.pdSpuInfo=this.props.pdSpuInfo
				if(this.props.data.pdSpuId){
					value.pdSpuId=this.props.data.pdSpuId
				}
				
				//判断是上传还是非上传表
				const isskus=this.props.isskus
				if(isskus){
					value.pdSkus=this.props.goodindodatasouce
				}else{
					value.code=this.props.goodindodatasouce[0].code
					value.barcode=this.props.goodindodatasouce[0].barcode
					value.toBPrice=this.props.goodindodatasouce[0].toBPrice
					value.toCPrice=this.props.goodindodatasouce[0].toCPrice
					value.tagPrice=this.props.goodindodatasouce[0].tagPrice
					value.costPrice=this.props.goodindodatasouce[0].costPrice
				}

				const values={pdSpu:value}
				const result=GetServerData('qerp.web.pd.spu.save',values)
				result.then((res) => {
					return res;
				}).then((json) => {
					if(json.code=='0'){
						this.delecttab();
						this.initWarehouseList();
					}
				})
			}	
			});
		}
		//取消
		Handcancel=()=>{
			this.delecttab()
		}
		//删除tab
		delecttab=()=>{
			if(this.props.data.pdSpuId){
				this.props.dispatch({
					type:'goods/delete',
					payload:'301000edit'+this.props.data.pdSpuId
				})
			}else{
				this.props.dispatch({
					type:'goods/delete',
					payload:'301000edit'
				})
			}
		}

		
		//搜搜请求数据
		initWarehouseList=()=>{
			let values =deepcCloneObj(this.props.values); 
			values.currentPage="0";
			values.source="0";
			this.props.dispatch({
				type:'goods/fetch',
				payload:{code:'qerp.web.pd.spu.query',values:values}
			})
			this.props.dispatch({type:'tab/loding',payload:true})
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
							<Input placeholder="请输入商品名称" autoComplete="off"/>
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
								this.props.goodpdCategorys.map((item,index)=>{
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
						{getFieldDecorator('pdBrandname', {
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
						wrapperCol={{ span: 16 }}
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
								<EditableTagGroup tags={this.props.tag1}  types='1' pdTypesId={this.props.pdType1Id}/>
							</Col>
						</Row>
					</FormItem>
					<FormItem
						label="商品规格2"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('guige2', {
						onChange: this.handleSelectChange_guige2,
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
							<EditableTagGroup tags={this.props.tag2}  types='2' pdTypesId={this.props.pdType2Id}/>
							</Col>
						</Row>
					</FormItem>
					<FormItem
						label="商品信息"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 16 }}
					>
						<div>
							<TableCanEdit columns={this.props.isskus?this.columns:this.columnsuse} dataSources={this.props.goodindodatasouce}/>
							{
								this.props.isskus?
								<div style={{display:'flex',textAlign:'center',padding:'15px 15px 0 15px'}}>
									<div style={{lineHeight:'45px'}}>批量设置：</div>
									<div style={{width:'100px',height:'45px',color:'#35bab0'}}><EditableCell text='价格' title='toBPrice'/></div>
									<div style={{width:'100px',height:'45px',color:'#35bab0'}}><EditableCell text='零售价' title='toCPrice'/></div>
									<div style={{width:'100px',height:'45px',color:'#35bab0'}}><EditableCell text='建议零售价' title='tagPrice'/></div>
									<div style={{width:'100px',height:'45px',color:'#35bab0'}}><EditableCell text='进货价' title='costPrice'/></div>
                				</div>
								:null
							}
						</div>
						
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
								<Input disabled={this.props.lotStatus=='1'?false:true} autoComplete="off"/>
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
							<Radio value='2'>到期日期</Radio>
						</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="禁止入库"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
						>
						{getFieldDecorator('lotLimitInDay', {
							initialValue:this.props.lotLimitInDay,
							rules: [{pattern:/^[0-9]*$/,message:'天数只能是整数'}],
						})(
							<Input disabled={this.props.lotStatus=='1'?false:true} autoComplete="off"/>
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
					<FormItem
						label="箱规销售"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('containerSpec', {
							rules: [{ required: true, message: '请输入箱规销售' },{pattern:/^[0-9]*$/,message:'请输入数字'}],
							initialValue:this.props.containerSpec
						})(
							<Input placeholder="请输入箱规销售" autoComplete="off"/>
						)}
					</FormItem>
					<FormItem
						label="分成类别"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 6 }}
					>
						{getFieldDecorator('shareType', {
							 initialValue:String(this.props.shareType)
						})(
							<RadioGroup>
								<Radio value='1'>食品类</Radio>
								<Radio value='0'>非食品类</Radio>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem
						label="商品描述"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 10 }}
					>
						{getFieldDecorator('ssd', {
							 
						})(
							<AddEditableTable data={eval(this.props.pdSpuInfo)}/>
						)}
					</FormItem>
					<FormItem  style = {{marginTop:'20px'}}>
						<div style={{width:"100%",height:"1px",background:"#e8e8e8"}}></div>
					</FormItem>
					<FormItem wrapperCol={{ offset: 9}} style = {{marginBottom:0}} style = {{marginTop:'20px'}}>
						<Button onClick={this.Handcancel.bind(this)} style = {{marginRight:'50px'}}>取消</Button>
						<Button onClick={this.handleSubmit.bind(this)} type="primary">保存</Button>
					</FormItem>
					
		</Form>
		);
	}
	componentDidMount(){
		this.pdTypeslist()	
		this.Categorylist()
		if(this.props.data.pdSpuId){
			 this.spuInfo()
		}

	}
	

	}

	const GoodEdit = Form.create()(App);

	function mapStateToProps(state) {
		const {values,limit,currentPage,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdCategorys,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,spuPics,goodpdCategorys,shareType,containerSpec,methup} = state.goods;
		return {values,limit,currentPage,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdCategorys,pdBrand,pdTypeslist,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,spuPics,goodpdCategorys,shareType,containerSpec,methup};
	}

	export default connect(mapStateToProps)(GoodEdit);

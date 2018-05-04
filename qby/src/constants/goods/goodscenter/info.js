import { Input,Form} from 'antd';
import {GetServerData} from '../../../services/services';
import Imgmodel from '../../../components/model/modelimg';
import EditableTable from '../../../components/table/tablebasic';
import { connect } from 'dva';


const FormItem = Form.Item;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '规格',
			dataIndex: 'name'
		},{
			title: '商品编码',
			dataIndex: 'code',
		}, {
			title: '商品条码',
			dataIndex: 'barcode'
		},{
			title: '库存',
			dataIndex: 'inventory'
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
			render: (text, record,index) => {
				return (
					<Imgmodel picUrl={text}/>
				);
			}
		}];    
		this.columnsuse = [{
			title: '商品编码',
			dataIndex: 'code'
		},{
			title: '商品条码',
			dataIndex: 'barcode'
		},{
			title: '库存',
			dataIndex: 'inventory'
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
			dataSource:[],
			issku:false,
			spuIdPics:[],
			pdSpuInfo:[]
		};  
	}

	//请求商品信息
	getinfoData=()=>{
		let values={pdSpuId:this.props.data.pdSpuId,source:'0'}
		const result=GetServerData('qerp.web.pd.spu.info',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				const spuIdPics=json.pdSpu.spuIdPics
				const pdSkus=json.pdSpu.pdSkus
				const code=json.pdSpu.code
				const barcode=json.pdSpu.barcode
				const toBPrice=json.pdSpu.toBPrice
				const toCPrice=json.pdSpu.toCPrice
				const tagPrice=json.pdSpu.tagPrice
				const costPrice=json.pdSpu.costPrice
				const pdSpuInfo=json.pdSpu.pdSpuInfo?eval(json.pdSpu.pdSpuInfo):[]
				const name=json.pdSpu.name
				const pdCategory1name=json.pdSpu.pdCategory1.name
				const pdCategory2name=json.pdSpu.pdCategory2.name
				const pdBrandname=json.pdSpu.pdBrand.name
				const lotStatus=json.pdSpu.lotStatus
				const expdays=json.pdSpu.expdays
				const lotType=json.pdSpu.lotType
				const lotLimitInDay=json.pdSpu.lotLimitInDay
				const eventNew=json.pdSpu.eventNew
				const eventHot=json.pdSpu.eventHot
				const isDirectExpress=json.pdSpu.isDirectExpress
				const isPresell=json.pdSpu.isPresell
				const pdSpuId=json.pdSpu.pdSpuId
				const dataSource=[]
				const containerSpec=json.pdSpu.containerSpec
				const shareTypeStr=json.pdSpu.shareTypeStr
				const inventory=json.pdSpu.inventory
				if(pdSkus.length>0){
					const pdType1Id=pdSkus[0].pdType1Id
					const pdType2Id=pdSkus[0].pdType2Id==null?'00':pdSkus[0].pdType2Id
					for(var i=0;i<pdSkus.length;i++){
						dataSource.push({
							name:(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined || pdSkus[i].pdType2Val=='') ?pdSkus[i].pdType1Val.name:pdSkus[i].pdType1Val.name+'/'+pdSkus[i].pdType2Val.name,
							code:pdSkus[i].code,
							barcode:pdSkus[i].barcode,
							toBPrice:pdSkus[i].toBPrice,
							toCPrice:pdSkus[i].toCPrice,
							tagPrice:pdSkus[i].tagPrice,
							costPrice:pdSkus[i].costPrice,
							picUrl:pdSkus[i].picUrl,
							key:pdSkus[i].pdSkuId,
							keys:(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined || pdSkus[i].pdType2Val=='') ?pdSkus[i].pdType1Val.pdTypeValId:pdSkus[i].pdType1Val.pdTypeValId+pdSkus[i].pdType2Val.pdTypeValId,
							pdType1Id:pdSkus[i].pdType1Id,
							pdType1ValId:pdSkus[i].pdType1ValId,
							pdType2Id:pdSkus[i].pdType2Id,
							pdType2ValId:pdSkus[i].pdType2ValId,
							pdSkuId:pdSkus[i].pdSkuId,
							inventory:pdSkus[i].inventory,
						})
					}
				}else{
					const values={
						code:code,
						barcode:barcode,
						toBPrice:toBPrice,
						toCPrice:toCPrice,
						tagPrice:tagPrice,
						costPrice:costPrice,
						inventory:inventory,
						key:pdSpuId,
						keys:'0000'
					}
					dataSource.push(values)
				}
				for(var i=0;i<pdSpuInfo.length;i++){
					pdSpuInfo[i].key=String(i+1)
				}
				this.setState({
					lotStatus:lotStatus,
					spuIdPics:spuIdPics,
					issku:pdSkus.length>0?true:false,
					dataSource:dataSource,
					pdSpuInfo:pdSpuInfo

				},function(){
					this.props.form.setFieldsValue({
						name: name,
						 pdCategory1name:pdCategory1name,
						pdCategory2name:pdCategory2name,
						 pdBrandname:pdBrandname,
						 lotStatus:lotStatus=='0'?'否':'是',
						expdays:expdays==null || undefined ? '' :expdays,
						lotType:lotType=='2'?'到期日期':'生产日期',
						lotLimitInDay:lotLimitInDay==null || undefined?'':lotLimitInDay,
						eventNew:eventNew?'是':'否',
						eventHot:eventHot?'是':'否',
						isDirectExpress:isDirectExpress=='0'?'否':'是',
						isPresell:isPresell=='0'?'否':'是',
						containerSpec:containerSpec,
						shareType:shareTypeStr
					});
				})
			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form;
	return (
		<Form>
			<FormItem
				label="商品名称"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('name', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="商品分类"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('pdCategory1name', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="商品类型"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('pdCategory2name', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="品牌"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('pdBrandname', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="商品图片"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				className='parentinput'
			>
				{getFieldDecorator('img', {
				})(
					<div className='serach_form'>
						{
							this.state.spuIdPics.map((item,index)=>{
								return (<div key={index} className='mr10'><Imgmodel picUrl={item.url}/></div>)
							})
						}
					</div>
				)}
			</FormItem>
			<FormItem
				label="商品信息"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 16 }}
				className='parentinput'
			>
				{getFieldDecorator('info', {
				})(
					<EditableTable columns={this.state.issku?this.columns:this.columnsuse} dataSource={this.state.dataSource} bordered={true}/>
				)}
			</FormItem>
			<FormItem
				label="开启批次管理"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('lotStatus', {
				})(
					<Input disabled/>
				)}
			</FormItem>

			{
				this.state.lotStatus==1
				?
				<FormItem
				label="保质期"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('expdays', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			:null
			}
			{
				this.state.lotStatus==1
				?
				<FormItem
				label="保质依据"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('lotType', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			:null




			}
			{

			this.state.lotStatus==1
			?
			<FormItem
				label="禁止入库"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('lotLimitInDay', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			:null


			}
			
			<FormItem
				label="加入上新"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('eventNew', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="加入畅销"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('eventHot', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="直邮商品"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('isDirectExpress', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="预售商品"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('isPresell', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="箱规销售"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('containerSpec', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="分成类别"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('shareType', {
				})(
					<Input disabled/>
				)}
			</FormItem>
			<FormItem
				label="商品描述"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 6 }}
				className='parentinput'
			>
				{getFieldDecorator('infos', {
				})(
					<div>
						{
							this.state.pdSpuInfo.map((item,index)=>{
								return(
									<div key={index}>
										{
											item.type=='1'?item.content:<Imgmodel picUrl={item.content}/>
										}
									</div>
								)
							})


						}
					</div>
				)}
			</FormItem>	
			
			



		</Form>
	);
}

	componentDidMount(){
		this.getinfoData()
	}

}

const Goodinfo = Form.create()(App);

export default Goodinfo;

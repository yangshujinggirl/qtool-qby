import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form, Input, Button ,message,DatePicker,Checkbox,Select,Cascader,TimePicker,Modal,Radio } from 'antd';
import moment from 'moment';
import PicturesWall from './upload';
import UpLoadImg from '../../components/UploadImg/index'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
import './index.less'


class SpInfo extends React.Component{
    constructor(props) {
		     super(props);
         this.state = {
			fileList:[],
			ecName:null,
      spShopPics:[],
      initfileList:[],
      name:null,
      sname:null,
      printName:null,
      no:null,
      mobile:null,
      telephone:null,
      shopman:null,
      status:[],
      provinceId:null,
      cityId:null,
      districtId:null,
      address:null,
      square:null,
      rental:null,
      staffCost:null,
      fromtime:null,
      endtime:null,
      startTime:null,
      wechat:null,
      remark:null,
			shopcity:[],
			spname:null,
			spusername:null,
			sppassword:null,
			urUserId:null,
			shopType:[],
			foodShareRatio:null,
			nonfoodShareRatio:null,
			initfoodShareRatio:null,
			initnonfoodShareRatio:null,
			openWechat:0,
			openAlipay:0,
			onlinetName:null,
			serverTel:null,
			bank:null,
			bankNo:null,
			bankName:null,
			openApp:null,
			bank:null,
			recAddress:null,
			spShopContracts:null,
			lng:null,
			lat:null,
			rec_city:null
		}
    }
    getinfoData=(value)=>{
      const result = GetServerData('qerp.web.sp.shop.info',value)
  		result.then((res) => {
  			return res;
  		}).then((json) => {
  	  	if(json.code=='0'){
          this.setState({
            spShop:res.spShop
          })
        };
      });
    }
  	componentDidMount(){
      let {spShopId} = this.props.data;
			this.getinfoData({spShopId})
  	}
  	render(){
      const {spShop} = this.state;
      console.log(spShop)
     	return(
    	<Form className="addUser-form addcg-form operate-shop-form">
			<div className='title'>基本信息</div>
        <FormItem>
					<PicturesWall initfileList={this.state.initfileList}/>
				</FormItem>
				<FormItem
					label="门店名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
          {spShop.name}
				</FormItem>
        <FormItem
					label="门店简称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>

				</FormItem>
        <FormItem
					label="打印名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="电商名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>
				      111
				</FormItem>
        <FormItem
					label="门店编号"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="门店店主"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="店主手机"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="门店电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="客服电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="开户银行"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="银行卡号"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="开户名"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
			<div className='title'>地址信息</div>
      	<FormItem
          label="所属城市"
          labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

        </FormItem>
        <FormItem
					label="门店地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="门店经度"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="门店纬度"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
          label="收货城区"
          labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

        </FormItem>
				<FormItem
					label="收货地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
			<div className='title'>店铺信息</div>
        <FormItem
					label="门店面积"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="装修费用"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="门店租金"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="人事费用"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="店主微信"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
        <FormItem
					label="营业时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

        </FormItem>
        <FormItem
					label="开业时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}>

				</FormItem>
				<FormItem
					label="店主备注"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<div className='title'>合作经营</div>
				<FormItem
					label="门店状态"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="门店类型"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>

				</FormItem>
				<FormItem
					label="分成比例"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}>
					<div className='felxboxs'>
						<div style={{width:'45%'}}>
							<p className='tc'>食品尿不湿类</p>
							<Input suffix='%' disabled={this.state.shopType=='2'?false:true} value={this.state.foodShareRatio}/>
						</div>
						<div style={{width:'45%'}}>
							<p className='tc'>非食品尿不湿类</p>
							<Input suffix='%' disabled={this.state.shopType=='2'?false:true} value={this.state.nonfoodShareRatio} />
						</div>
					</div>
				</FormItem>
				<FormItem
					label="微信支付扫码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}>

				</FormItem>
				<FormItem
					label="支付宝扫码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}>

						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={0}>关闭</Radio>
				  	</RadioGroup>
				</FormItem>
				<FormItem
					label="C端App"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}>

						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={0}>关闭</Radio>
				  	</RadioGroup>
				</FormItem>
				<FormItem
						label="合同信息"
						labelCol={{ span: 3,offset: 1 }}
						wrapperCol={{ span: 6 }}
					>
						<UpLoadImg
							name='imgFile'
							action = '/erpWebRest/qcamp/upload.htm?type=spu'
							fileList = {this.state.fileList}
							maxLength = '10'
							changeImg = {this.changeImg}
						/>
				</FormItem>

    	</Form>
  	)
	}
}
export default SpInfo;

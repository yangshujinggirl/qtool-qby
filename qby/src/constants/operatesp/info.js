import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import { Form,Modal} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
import './index.less'


class SpInfo extends React.Component{
    constructor(props) {
     super(props);
     this.state = {
       imgIndex:0,
       visible:false,
       type:1,
       spShop:{
         spShopIdContracts:[],
         spShopIdPics:[],
 			   name:"",
         sname:"",
         printName:"",
         ecName:"",
         no:"",
         shopman:"",
         mobile:"",
         telephone:"",
         bank:"",
         bankNo:"",
         bankName:"",
         province:"",
         city:"",
         district:"",
         address:"",
         lng:"",
         lat:"",
         recProvince:"",
         recCity:"",
         recDistrict:"",
         recAddress:"",
         square:"",
         fixtureMoney:"",
         rental:"",
         staffCost:"",
         wechat:null,
         fromtime:null,
         endtime:null,
         startTime:null,
         remark:null,
         statusStr:"",
         shopTypeStr:"",
         foodShareRatio:"",
         nonfoodShareRatio:"",
         payRadio:null,
         misRadio:null,
         openApp:null,
       }
		}
  }
  componentWillMount(){
    let {spShopId} = this.props.data;
		this.getinfoData({spShopId})
	}
  getinfoData=(value)=>{
    const result = GetServerData('qerp.web.sp.shop.info',value)
		result.then((res) => {
			return res;
		}).then((json) => {
	  	if(json.code=='0'){
        this.setState({
          spShop:json.spShop
        })
      };
    });
  }
  //点击放大图片
  enlargeImg =(index,type)=> {
    this.setState({
      imgIndex:index,
      visible:true,
      type
    })
  }
  onCancel =()=> {
    this.setState({
      visible:false
    })
  }
	render(){
      const fileDomain = eval(sessionStorage.getItem('fileDomain'));
      const {spShop,type,visible,imgIndex} = this.state;
     	return(
        <div>
        	<Form className="addUser-form addcg-form operate-shop-form">
    		    <div className='title'>基本信息</div>
            <FormItem>
              {
                spShop.spShopIdPics.length>0 &&
                spShop.spShopIdPics.map((item,index)=>(
                     <div key={index} onClick={this.enlargeImg.bind(this,index,2)} className="contract-img"><img src={fileDomain+(item.url)}/></div>
                ))
              }
    				</FormItem>
            <FormItem
    					label="门店id"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}
    				>
              {spShop.spShopId}
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
              {spShop.sname}
    				</FormItem>
            <FormItem
    					label="打印名称"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.printName}
    				</FormItem>
    				<FormItem
    					label="电商名称"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
    		      {spShop.ecName}
    				</FormItem>
            <FormItem
    					label="门店编号"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.no}
    				</FormItem>
    				<FormItem
    					label="门店店主"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.shopman}
    				</FormItem>
            <FormItem
    					label="店主手机"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.mobile}
    				</FormItem>
            <FormItem
    					label="门店电话"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.telephone}
    				</FormItem>
    				<FormItem
    					label="客服电话"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.telephone}
    				</FormItem>
    				<FormItem
    					label="开户银行"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.bank}
    				</FormItem>
    				<FormItem
    					label="银行卡号"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.bankNo}
    				</FormItem>
    				<FormItem
    					label="开户名"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.bankName}
    				</FormItem>
    			<div className='title'>地址信息</div>
          	<FormItem
              label="所属城市"
              labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.province}{spShop.city}{spShop.district}
            </FormItem>
            <FormItem
    					label="门店地址"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.address}
    				</FormItem>
    				<FormItem
    					label="门店经度"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.lng}
    				</FormItem>
    				<FormItem
    					label="门店纬度"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.lat}
    				</FormItem>
            <FormItem
              label="收货城区"
              labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.recProvince}{spShop.recCity}{spShop.recDistrict}
            </FormItem>
    				<FormItem
    					label="收货地址"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.recAddress}
    				</FormItem>
    			<div className='title'>店铺信息</div>
            <FormItem
    					label="门店面积"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.square}
    				</FormItem>
            <FormItem
    					label="装修费用"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.fixtureMoney}
    				</FormItem>
            <FormItem
    					label="门店租金"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.rental}
    				</FormItem>
            <FormItem
    					label="人事费用"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.staffCost}
    				</FormItem>
    				<FormItem
    					label="店主微信"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.wechat}
    				</FormItem>
            <FormItem
    					label="营业时间"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.fromtime}-{spShop.endtime}
            </FormItem>
            <FormItem
    					label="开业时间"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span:6 }}>
              {spShop.startTime}
    				</FormItem>
    				<FormItem
    					label="店主备注"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.remark}
    				</FormItem>
    				<div className='title'>合作经营</div>
    				<FormItem
    					label="门店状态"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.statusStr}
    				</FormItem>
    				<FormItem
    					label="门店类型"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
              {spShop.shopTypeStr}
    				</FormItem>
    				<FormItem
    					label="分成比例"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span: 6 }}>
    					<div className='felxboxs'>
    						<div style={{width:'45%'}}>
    							<p className='tc'>食品尿不湿类</p>
                  {
                    spShop.foodShareRatio
                      ?
                      <p style={{marginLeft:"55px"}}>{spShop.foodShareRatio}%</p>
                      :
                      <p style={{marginLeft:"55px"}}>0%</p>
                  }
    						</div>
    						<div style={{width:'45%'}}>
    							<p className='tc'>非食品尿不湿类</p>
                  {
                    spShop.nonfoodShareRatio
                      ?
                      <p style={{marginLeft:"55px"}}>{spShop.nonfoodShareRatio}%</p>
                      :
                      <p style={{marginLeft:"55px"}}>0%</p>
                  }
    						</div>
    					</div>
    				</FormItem>
    				<FormItem
    					label="支付扫码"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span:6 }}>
      					{
                  spShop.payRadio == 1 ? "开启" : "关闭"
                }
    				</FormItem>
    				<FormItem
    					label="银联MIS"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span:6 }}>
              {
                spShop.misRadio == 1 ? "开启" : "关闭"
              }
    				</FormItem>
    				<FormItem
    					label="C端App"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span:6 }}>
              {
                spShop.openApp == 1 ? "开启" : "关闭"
              }
    				</FormItem>
            <FormItem
    					label="C端同城配送"
    					labelCol={{ span: 3,offset: 1 }}
    					wrapperCol={{ span:6 }}>
              {
                spShop.openCityDistribution == 1 ? "开启" : "关闭"
              }
    				</FormItem>
    				<FormItem
    						label="合同信息"
    						labelCol={{ span: 3,offset: 1 }}
    						wrapperCol={{ span: 6 }}
    					>
              {
                spShop.spShopIdContracts.length>0 &&
                spShop.spShopIdContracts.map((item,index)=>(
                     <div key={index} onClick={this.enlargeImg.bind(this,index,1)} className="contract-img">
                        <img src={fileDomain+(item.url)}/>
                     </div>
                ))
              }
    				</FormItem>
        	</Form>
          <Modal
            visible={visible}
            footer={null}
            closable = { true }
            onCancel={this.onCancel}
            wrapClassName="billModal"
          >
          {
            type==1
            ?
              spShop.spShopIdContracts.length>0 &&
              <img src={fileDomain+((spShop.spShopIdContracts[imgIndex]).url)}/>
            :
            spShop.spShopIdPics.length>0 &&
            <img src={fileDomain+((spShop.spShopIdPics[imgIndex]).url)}/>
          }
          </Modal>
      </div>
  	)
	}
}
export default SpInfo;

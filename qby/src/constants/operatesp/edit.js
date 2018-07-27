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


class SpEditForm extends React.Component{
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
			lat:null
		}
	}
	//删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
		if(this.props.data){
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'403000edit'+this.props.data.spShopId
			  });
		}else{
			this.props.dispatch({
				type:'tab/initDeletestate',
				payload:'403000edit'
			  });
		}
		this.refreshList()
	}
	//刷新列表
	refreshList=()=>{
		const values=this.props.values
		this.props.dispatch({
            type:'operatesp/fetch',
            payload:{code:'qerp.web.sp.shop.query',values:values}
        });
		this.props.dispatch({ type: 'tab/loding', payload:true})
	}
	//保存
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, value) => {
		    if (!err) {
				value.openWechat = String(value.openWechat);
				value.openAlipay = String(value.openAlipay);
        value.spShopPics=this.props.spShopPics
        value.provinceId=value.shop_city[0]
        value.cityId=value.shop_city[1]
        value.districtId=value.shop_city[2]
				value.recProvinceId = value.rec_city[0]
				value.recCityId = value.rec_city[1]
				value.recDistrictId = value.rec_city[2]
        value.fromtime=this.state.fromtime
        value.endtime=this.state.endtime
				value.startTime=this.state.startTime
				value.foodShareRatio=this.state.foodShareRatio
				value.nonfoodShareRatio=this.state.nonfoodShareRatio
				if(this.props.data){
					value.spShopId=this.props.data.spShopId
				}
				const imgArr = this.state.fileList;
				const spShopContracts = [];
				const imgArrs = imgArr.map((item) => {
					if(item.status == 'done'){
						spShopContracts.push(item.response.data[0])
					}
				})
				value.spShopContracts = spShopContracts;
				// if(JSON.stringify(this.state.fileList) == '[]'){
				// 	message.warn('请上传合同信息',.8)
				// }else{
	        const values={spShop:value}
	        const result=GetServerData('qerp.web.sp.shop.save',values)
	        result.then((res) => {
	            return res;
	        }).then((json) => {
	          if(json.code=='0'){
							if(this.props.data){
								message.success('门店修改成功',.8)
								this.deleteTab()
							}else{
								//弹窗
								this.setState({
									spname:json.name,
									spusername:json.username,
									sppassword:json.password
								},function(){
									this.modelsuccess()
								})
							}
	          }
	        })
				// };
      };
    });
	}
	//取消
	hindCancel=()=>{
		this.deleteTab()
  }
	timeChange=(date,dateString)=>{
	  this.setState({
	      startTime:dateString
	  })
	}
	getinfoData=()=>{
		const values = {spShopId:this.props.data.spShopId}
		const result = GetServerData('qerp.web.sp.shop.info',values)
		result.then((res) => {
			return res;
		}).then((json) => {
	  	if(json.code=='0'){
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
        const spShopPics=[]
        const initfileList=[]
        const spShopIdPics=json.spShop.spShopIdPics
        if(spShopIdPics.length>0){
            for(var i=0;i<spShopIdPics.length;i++){
                spShopPics.push(spShopIdPics[i].url)
                initfileList.push({
                    uid: spShopIdPics[i].url,
                    status: 'done',
                    url:fileDomain+spShopIdPics[i].url,
                    response:{
                        data:[spShopIdPics[i].url]
                    }
                })
            }
					};
					const spShopContractsImg = []
					const spShopIdContracts=json.spShop.spShopIdContracts
	        if(spShopIdContracts.length>0){
	            for(var i=0;i<spShopIdContracts.length;i++){
	                // spShopContractsImg.push(spShopIdContracts[i].url)
	                spShopContractsImg.push({
											name:spShopIdContracts[i].url,
	                    uid:spShopIdContracts[i].url,
	                    status: 'done',
	                    url:fileDomain+spShopIdContracts[i].url,
	                    response:{
	                        data:[spShopIdContracts[i].url]
	                    }
	                })
	            }
						}
          this.setState({
							fileList:spShopContractsImg,
							ecName:json.spShop.ecName,
							spShopPics:spShopPics,
							onlinetName:json.spShop.onlinetName,
              initfileList:initfileList,
              name:json.spShop.name,
							sname:json.spShop.sname,
							shopType:json.spShop.shopType==undefined || json.spShop.shopType==null || json.spShop.shopType=='' ?[]:String(json.spShop.shopType),
              printName:json.spShop.printName,
              no:json.spShop.no,
              mobile:json.spShop.mobile,
              telephone:json.spShop.telephone,
              shopman:json.spShop.shopman,
              status:!json.spShop.status&&json.spShop.status!=0?[]:String(json.spShop.status),
              provinceId:json.spShop.provinceId,
              cityId:json.spShop.cityId,
              districtId:json.spShop.districtId,
              address:json.spShop.address,
              square:json.spShop.square,
              rental:json.spShop.rental,
              staffCost:json.spShop.staffCost,
              fromtime:json.spShop.fromtime,
              endtime:json.spShop.endtime,
              startTime:json.spShop.startTime,
              wechat:json.spShop.wechat,
              remark:json.spShop.remark,
							rec_city:[String(json.spShop.recProvinceId),String(json.spShop.recCityId),String(json.spShop.recDistrictId)],
							shopcity:[String(json.spShop.provinceId),String(json.spShop.cityId),String(json.spShop.districtId)],
							urUserId:json.spShop.urUserId,
							foodShareRatio:json.spShop.foodShareRatio,
							nonfoodShareRatio:json.spShop.nonfoodShareRatio,
							initfoodShareRatio:json.spShop.foodShareRatio,
							initnonfoodShareRatio:json.spShop.nonfoodShareRatio,
							openWechat:(!json.spShop.openWechat||json.spShop.openWechat=="0")?0:json.spShop.openWechat,
							openAlipay:(!json.spShop.openAlipay||json.spShop.openAlipay=="0")?0:json.spShop.openAlipay,
							serverTel:json.spShop.serverTel,
							bank:json.spShop.bank,
							bankNo:json.spShop.bankNo,
							bankName:json.spShop.bankName,
							openApp:json.spShop.openApp,
							spShopContracts:json.spShop.spShopContracts,
							lat:json.spShop.lat,
							lng:json.spShop.lng,
          },function(){
              const spShopPics=this.state.spShopPics
              this.props.dispatch({
                  type:'operatesp/spShopPics',
                  payload:spShopPics
              })
          })
				}
		})
	}
	handUse=()=>{
		 const values={urUserId:this.state.urUserId}
		const result=GetServerData('qerp.web.sp.qposuser.resetpwd',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.setState({
					spname:json.name,
					spusername:json.username,
					sppassword:json.password
				},function(){
					this.modelsuccess()
				})
			}
		})
    }

    fromonChange=(time,Strtime)=>{
        this.setState({ fromtime: Strtime });
    }
    endonChange=(time,Strtime)=>{
        this.setState({ endtime: Strtime });
	 }

	 modelsuccess=()=>{
		const _this=this
		Modal.success({
		  title: 'Qtools门店账户创建成功',
		  content:(
			<div>
				<p>门店：{_this.state.spname}</p>
				<p>账号：{_this.state.spusername}</p>
				<p>密码：{_this.state.sppassword}</p>
		  </div>
		  ),
		  onOk() {
			_this.deleteTab()
		  }

		});
	  }

	selectChange=(value)=>{
		if(value=='2'){
			this.setState({
				shopType:value,
				foodShareRatio:this.state.initfoodShareRatio,
				nonfoodShareRatio:this.state.initnonfoodShareRatio
			})
		}else{
			this.setState({
				shopType:value,
				foodShareRatio:null,
				nonfoodShareRatio:null
			})
		}
	}
	hindChange1=(e)=>{
		const patt=/^([0-9]*)+((\.)|.[0-9]{1,2})?$/
		const values=e.target.value
		const isvalues=patt.test(values)
		if(isvalues){
			this.setState({
				foodShareRatio:e.target.value
			})
		}
	}

	hindBlue1=(e)=>{
		var values=e.target.value
		if(values){
			values=parseFloat(e.target.value)
			this.setState({
				foodShareRatio:values
			})
		}
	}
	hindChange2=(e)=>{
		const patt=/^([0-9]*)+((\.)|.[0-9]{1,2})?$/
		const values=e.target.value
		const isvalues=patt.test(values)
		if(isvalues){
			this.setState({
				nonfoodShareRatio:e.target.value
			})
		}
	}
	hindBlue2=(e)=>{
		var values=e.target.value
		if(values){
			values=parseFloat(e.target.value)
			this.setState({
				nonfoodShareRatio:values
			})
		}
	}
	changeImg =(fileList)=> {
		this.setState({fileList:fileList})
	}
  	render(){
			const { getFieldDecorator } = this.props.form;
     	return(
    	<Form className="addUser-form addcg-form operate-shop-form">
        <FormItem>
					<PicturesWall initfileList={this.state.initfileList}/>
				</FormItem>
				<FormItem
					label="门店名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: '请输入门店名称'}],
						initialValue:this.state.name
					})(
						<Input placeholder='请输入门店名称' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店简称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('sname', {
						rules: [{ required: true, message: '请输入门店简称'}],
						initialValue:this.state.sname
					})(
						<Input placeholder='请输入门店简称' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="打印名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('printName', {
						rules: [{ required: true, message: '请输入打印名称'}],
						initialValue:this.state.printName
					})(
						<Input placeholder='请输入打印名称' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="电商名称"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('ecName', {
						rules: [{ required: true, message: '请输入电商名称'}],
						initialValue:this.state.ecName
					})(
						<Input placeholder='请输入电商名称' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店编号"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('no', {
						rules: [{ required: true, message: '请输入门店编号'}],
						initialValue:this.state.no
					})(
						<Input placeholder='请输入门店编号' autoComplete="off"/>
                    )}

				</FormItem>
                <FormItem
					label="店主手机"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('mobile', {
						rules: [{ required: true, message: '请输入店主手机'}],
						initialValue:this.state.mobile
					})(
						<Input placeholder='请输入店主手机' autoComplete="off"/>
					)}
				</FormItem>
        <FormItem
					label="门店电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('telephone', {
						rules: [{ required: true, message: '请输入门店电话'}],
						initialValue:this.state.telephone
					})(
						<Input placeholder='请输入门店电话' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="客服电话"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('serverTel', {
						rules: [{ required: true, message: '请输入客服电话'}],
						initialValue:this.state.telephone
					})(
						<Input placeholder='请输入客服电话' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店店主"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('shopman', {
						rules: [{ required: true, message: '请输入门店店主'}],
						initialValue:this.state.shopman
					})(
						<Input placeholder='请输入门店店主' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店状态"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('status', {
						rules: [{ required: true, message: '请选择门店状态'}],
						initialValue:this.state.status
					})(
						<Select placeholder="请选择门店状态">
                        <Option value="0">待开业</Option>
                        <Option value="10">开业中</Option>
                        <Option value="20">关业中</Option>
                      </Select>
					)}
				</FormItem>
				<FormItem
					label="门店类型"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('shopType', {
						rules: [{ required: true, message: '请选择门店类型'}],
						initialValue:this.state.shopType,
						onChange:this.selectChange
					})(
						<Select placeholder="请选择门店类型">
							<Option value="1">直营</Option>
							<Option value="2">联营</Option>
							<Option value="3">加盟</Option>
                      </Select>
					)}
				</FormItem>
				<FormItem
					label="分成比例"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					<div className='felxboxs'>
						<div style={{width:'45%'}}>
							<p className='tc'>食品尿不湿类</p>
							<Input suffix='%' disabled={this.state.shopType=='2'?false:true} value={this.state.foodShareRatio} onChange={this.hindChange1.bind(this)} onBlur={this.hindBlue1.bind(this)}/>
						</div>
						<div style={{width:'45%'}}>
							<p className='tc'>非食品尿不湿类</p>
							<Input suffix='%' disabled={this.state.shopType=='2'?false:true} value={this.state.nonfoodShareRatio} onChange={this.hindChange2.bind(this)} onBlur={this.hindBlue2.bind(this)}/>
						</div>
					</div>
				</FormItem>
                <FormItem
                    label="所属城市"
                    labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
                    >
                    {getFieldDecorator('shop_city', {
                        rules: [{ type: 'array', required: true, message: '请选择所属城市' }],
                        initialValue:this.props.data?this.state.shopcity:null
                    })(
                        <Cascader placeholder="请选择所属城市" options={this.props.bsRegions}/>
                    )}
                </FormItem>
        <FormItem
					label="门店地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('address', {
						rules: [{ required: true, message: '请输入门店地址'}],
						initialValue:this.state.address
					})(
						<Input placeholder='请输入门店地址' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="门店经度"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('lng', {
						rules: [{ required: true, message: '请输入门店经度'}],
						initialValue:this.state.lng
					})(
						<Input placeholder='请输入门店经度' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="门店纬度"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('lat', {
						rules: [{ required: true, message: '请输入门店纬度'}],
						initialValue:this.state.lat
					})(
						<Input placeholder='请输入门店纬度' autoComplete="off"/>
					)}
				</FormItem>
        <FormItem
            label="收货城区"
            labelCol={{ span: 3,offset: 1 }}
	wrapperCol={{ span: 6 }}
            >
            {getFieldDecorator('rec_city', {
                rules: [{ type: 'array', required: true, message: '请选择收货城区' }],
                initialValue:this.props.data?this.state.recAddress:null
            })(
                <Cascader placeholder="请选择所属城市" options={this.props.bsRegions}/>
            )}
        </FormItem>
				<FormItem
					label="收货地址"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('recAddress', {
						rules: [{ required: true, message: '请输入收货地址'}],
						initialValue:this.state.recAddress
					})(
						<Input placeholder='请输入收货地址' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="开户银行"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('bank', {
						rules: [{ required: true, message: '请输入开户银行'}],
						initialValue:this.state.bank
					})(
						<Input placeholder='请输入开户银行' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="银行卡号"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('bankNo', {
						rules: [{ required: true, message: '请输入银行卡号'}],
						initialValue:this.state.bankNo
					})(
						<Input placeholder='请输入银行卡号' autoComplete="off"/>
					)}
				</FormItem>
				<FormItem
					label="开户名"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('bankName', {
						rules: [{ required: true, message: '请输入开户名'}],
						initialValue:this.state.bankName
					})(
						<Input placeholder='请输入开户名' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店面积"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('square', {
						initialValue:this.state.square
					})(
						<Input placeholder='请输入门店面积' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="门店租金"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('rental', {
						initialValue:this.state.rental
					})(
						<Input placeholder='请输入门店租金' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="人事费用"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('staffCost', {
						initialValue:this.state.staffCost
					})(
						<Input placeholder='请输入人事费用' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="营业时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('businessTime', {
              })(
                <div>
                    <TimePicker  onChange={this.fromonChange.bind(this)}  value={(this.state.fromtime!=null && this.state.fromtime!=undefined && this.state.fromtime!='' && this.state.fromtime!=[])?moment(String(this.state.fromtime),'HH:mm'):null} style={{width:'45%'}} format="HH:mm"/>
                    <span style={{display:'inline-block',width:'10%',textAlign:'center'}}>至</span>
                    <TimePicker  onChange={this.endonChange.bind(this)}  value={(this.state.endtime!=null && this.state.endtime!=undefined && this.state.endtime!='' && this.state.endtime!=[])?moment(this.state.endtime,'HH:mm'):null} style={{width:'45%'}} format="HH:mm"/>
                </div>
              )}
            </FormItem>
                <FormItem
					label="开业时间"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('openTime', {
						initialValue:(this.props.data && this.state.startTime!=null && this.state.startTime!=undefined  && this.state.startTime!='' && this.state.startTime!=[])?moment(this.state.startTime):null
					})(
					<DatePicker  format="YYYY-MM-DD" showTime onChange={this.timeChange.bind(this)}/>
					)}
				</FormItem>
				<FormItem
					label="微信支付扫码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('openWechat', {
						rules: [{ required: true, message: '请选择是否使用微信扫码支付'}],
						initialValue:Number(this.state.openWechat)
					})(
						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={0}>关闭</Radio>
					  	</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="支付宝扫码"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('openAlipay', {
						rules: [{ required: true, message: '请选择是否使用支付宝扫码'}],
						initialValue:Number(this.state.openAlipay)
					})(
						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={0}>关闭</Radio>
					  	</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="C端App"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span:6 }}
					>
					{getFieldDecorator('openApp', {
						rules: [{ required: true, message: '请选择是否使用C端App'}],
						initialValue:Number(this.state.openApp)
					})(
						<RadioGroup>
							<Radio value={1}>开启</Radio>
							<Radio value={0}>关闭</Radio>
					  	</RadioGroup>
					)}
				</FormItem>
                <FormItem
					label="店主微信"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('wechat', {
						initialValue:this.state.wechat
					})(
						<Input placeholder='请输入店主微信' autoComplete="off"/>
					)}
				</FormItem>
                <FormItem
					label="店主备注"
					labelCol={{ span: 3,offset: 1 }}
					wrapperCol={{ span: 6 }}
				>
					{getFieldDecorator('remark', {
						initialValue:this.state.remark
					})(
						<TextArea rows={4} placeholder='请输入店主备注' autoComplete="off"/>
					)}
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
            	<FormItem wrapperCol={{ offset: 4}} style = {{marginBottom:0}}>
              		<Button className='mr30' onClick={this.hindCancel.bind(this)}>取消</Button>
					  {
						  this.props.data?<Button  type="primary" onClick={this.handUse.bind(this)}>重置密码</Button>:null
					  }
              		<Button  type="primary" onClick={this.handleSubmit.bind(this)} className='ml30'>保存</Button>
            	</FormItem>
          	</Form>
      	)
  	}
	componentDidMount(){
		this.props.dispatch({
	    type:'operatesp/region',
	    payload:{code:'qerp.web.bs.region',values:{}}
		});
		if(this.props.data){
			this.getinfoData()
		};
	}
}
const SpEditForms = Form.create()(SpEditForm);
function mapStateToProps(state) {
    const {values,spShopPics,bsRegions} = state.operatesp;
    return {values,spShopPics,bsRegions};
}


export default connect(mapStateToProps)(SpEditForms);

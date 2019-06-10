import { Card,Button,Modal} from 'antd';
import WrappedApp from './form_edit';
import './orderuser.css'
class Cardtitles extends React.Component {

	render() {
		return (
			<div style={{width:"100%"}}>
        <div className='fl'>{this.props.cardtitle}</div>
          {
            (this.props.editChange && this.props.canedit && !this.props.editopen)
            ?
            <div className='fr'>
              <Button type="primary" onClick={this.props.hindlistClick}>修改收货信息</Button>
            </div>
            :
            null
          }
      </div>
		);
	}
}


class Cardlists extends React.Component {
    state={
        editopen:false,
				visible:false
    }
    hindlistClick=()=>{
        this.setState({
            editopen:true
        },function(){
            this.setInitData(this.props.cardlist,this.props.recProvince,this.props.recCity,this.props.recDistrict,this.props.recAddress)
        })
    }
    setInitData=(data,recProvince,recCity,recDistrict,recAddress)=>{
        const form = this.formRef.props.form;
        form.setFieldsValue({
            idCardName:data[0].text,
            idCardNo:data[1].text,
            recName:data[2].text,
            recTelephone:data[3].text,
            recAddress:recAddress
        })
        this.formRef.initCitylist(recProvince,recCity,recDistrict)
    }
    hindCancel=()=>{
        this.setState({
            editopen:false
        })
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
		onLook =()=> {
			this.setState({
				visible:true
			})
		}
		handleCancel =()=> {
			this.setState({
				visible:false
			})
		}
	render() {
		const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
		console.log(this.props)
		return (
			<Card
        title={
          <Cardtitles
            cardtitle={this.props.cardtitle}
            hindlistClick={this.hindlistClick.bind(this)}
            canedit={this.props.canedit}
            editopen={this.state.editopen}
            editChange={this.props.editChange}/>}>
				<div className='cardlist'>
          {
            this.state.editopen?
            <WrappedApp
              wrappedComponentRef={this.saveFormRef}
              hindCancel={this.hindCancel.bind(this)}
              ecOrderId={this.props.ecOrderId}
              infofetch={this.props.infofetch}
              />:
            this.props.cardlist.map((item,index)=>{
                return (
									<div className='cardlist_item' key={index}>
										<label>{item.lable}：</label>
										<span>{item.text}</span>
									　{
											item.lable == '身份证号' &&
												<div style={{display:'inline-block'}}>
													{
														this.props.identify&&
														<span
															style={{color:'#35BAB0',cursor:'pointer'}}
															onClick={this.onLook}>查看身份证正反面
														</span>
													}
														<Modal
														 title="身份证正反面"
														 visible={this.state.visible}
														 footer={null}
														 wrapClassName='img-box'
														 onCancel={this.handleCancel}>
														 	<div className='identified'>
																<img style={{'width':'400px'}} src={fileDomain + this.props.facePicUrl}/>
															</div>
														 	<div>
																<img style={{'width':'400px'}} src={fileDomain + this.props.backPicUrl}/>
															</div>
														</Modal>
												</div>
										}
									</div>
								)
            })
          }
				</div>
			</Card>
		);
	}
}
export default Cardlists

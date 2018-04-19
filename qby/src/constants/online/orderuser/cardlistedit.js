import { Card ,Button} from 'antd';
import WrappedApp from './form_edit';

class Cardtitles extends React.Component {
	render() {
		return (
			<div>
                <div className='fl'>{this.props.cardtitle}</div>
                {
                    (this.props.canedit && !this.props.editopen)?<div className='fr'><Button type="primary" onClick={this.props.hindlistClick}>修改收货信息</Button></div>:null
                }
                
            </div>
		);
	}
}


class Cardlists extends React.Component {
    state={
        editopen:false
    }
    hindlistClick=()=>{
        this.setState({
            editopen:true
        },function(){
            this.setInitData(this.props.cardlist)
        })
    }

    setInitData=(data)=>{
        const form = this.formRef.props.form;
        form.setFieldsValue({
            idCardName:data[0].text,
            idCardNo:data[1].text,
            recName:data[2].text,
            recTelephone:data[3].text,
            address:data[4].text
        })
    }

    hindCancel=()=>{
        this.setState({
            editopen:false
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

	render() { 
		return (
			<Card title={<Cardtitles cardtitle={this.props.cardtitle} hindlistClick={this.hindlistClick.bind(this)} canedit={this.props.canedit} editopen={this.state.editopen}/>}>
				<div className='cardlist'>
                    {
                        this.state.editopen? <WrappedApp  wrappedComponentRef={this.saveFormRef} hindCancel={this.hindCancel.bind(this)}/>:
                            this.props.cardlist.map((item,index)=>{
                                return (<div className='cardlist_item' key={index}><label>{item.lable}：</label><span>{item.text}</span></div>)
                            })
                    }
				</div>
			</Card>
		);
	}
}
export default Cardlists
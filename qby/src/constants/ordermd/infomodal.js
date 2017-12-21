import { connect } from 'dva';
import { Modal, Button ,Icon,message} from 'antd';
import {GetServerData} from '../../services/services';

class Infomodel extends React.Component {
    state = { 
        visible: false,
        text:'',
        number:'',
        amount:'',
        data:{}
    }

    showModal = (data) => {
        let temAmountSum = data.spOrder.amountSum
        if(data.spOrder.createType==2){
             temAmountSum ="0.00"
        }else{
            temAmountSum = data.spOrder.amountSum
        }
        this.setState({
            visible: true,
            number:data.spOrder.qtySum,
            amount:temAmountSum,
            data:data
        });
    }

    handleOk = (e) => {
        this.getdata(this.state.data)
    }

    handleCancel = (e) => {
            console.log(e);
            this.setState({
                visible: false,
            });
    }

    //删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
        this.props.dispatch({
            type:'tab/initDeletestate',
            payload:'201000edit'
        });
	}

	//刷新账号列表
	refreshList=()=>{
        let values = this.props.values;
        values.currentPage = 0;
		this.props.dispatch({
            type:'ordermd/fetch',
            payload:{code:'qerp.web.sp.order.query',values:values}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}

    //数据请求
    getdata=(value)=>{
        const result=GetServerData('qerp.web.sp.order.save',value);
        result.then((res) => {
            return res;
        }).then((json) => {
            console.log(json)
            if(json.code=='0'){
                console.log(this)
                this.setState({
                    visible: false,
                },function(){
                    message.success('创建成功');
                    deleteTab();
                    refreshList();
                });
            }else{
                message.error(json.message)
            }
    })
    }

    render() {
        return (
            <div>
                <Modal
                    className='infomodels'
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={400}
                    closable={false}
                >
                    <p><span className='ml20 f30' style={{color:'#384162'}}>{this.state.text}</span></p>
                    <p className='f18 mt20 modeltext'>商品数量：{this.state.number}</p>
                    <p className='f18 mb10 modeltext'>订单金额：{this.state.amount}</p>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.ordermd;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(Infomodel);

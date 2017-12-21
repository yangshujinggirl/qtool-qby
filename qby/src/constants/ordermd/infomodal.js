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
            this.setState({
                visible: false,
            });
    }


    //数据请求
    getdata=(value)=>{
        const result=GetServerData('qerp.web.sp.order.save',value);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    visible: false,
                },function(){
                    message.success('创建成功');
                    this.props.deleteTab();
                    this.props.refreshList();
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

export default Infomodel;

import '../../style/postku_check.css';
import React from 'react';
import { Button, Input,Modal} from 'antd';
import EditableTable from './table';
import Audio from '../../components/audio/audio';
import ReactDOM from 'react-dom';
import { GetServerData} from '../../services/service';
import { connect } from 'dva';

class Post_ku_check extends React.Component {
    constructor(props) {
        super(props);
        this.isSaoMiao=false;
        this.state = {
            text:'',
            wsOrderId:''
        }
    }
    //进入页面第一个输入框获取焦点
    Focus=()=>{
        const ValueorderNos=this.refs.peiorder
        ValueorderNos.focus()
    }

    phcodeChange=(e)=>{
        const phcodevalue=e.target.value
        this.props.dispatch({
            type:'postcheck/phcode',
            payload:phcodevalue
        });
    }
    barcodeChange=(e)=>{
        const barcodevalue=e.target.value
        this.props.dispatch({
            type:'postcheck/barcode',
            payload:barcodevalue
        });
    }

    qtyChange=(e)=>{
        const qtyvalue=e.target.value
        this.props.dispatch({
            type:'postcheck/qtyvalue',
            payload:qtyvalue
        });
    }

    //配获单回车
    hindonKeyUp=(e)=>{
        if(e.keyCode==13){
            let peinumber=e.target.value
            let values={orderNo:peinumber,limit:10,currentPage:0}
            const result=GetServerData('qerp.web.ws.order.check.orderno',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                    const dataSource=json.wsOrder.wsOrderDetails
                    const text=json.wsOrder.name
                    const total=json.total
                    const limit=json.limit
                    const currentPage=json.currentPage
                    const wsOrderId=json.wsOrder.wsOrderId
                    const qty=1
                    this.props.dispatch({
                        type:'postcheck/tabledata',
                        payload:{dataSource,total,limit,text,currentPage,wsOrderId,qty}
                    });
                    const ValueorderNoses=ReactDOM.findDOMNode(this.refs.barcode)
                    ValueorderNoses.focus()
                    const audios = ReactDOM.findDOMNode(this.refs.scanSuccess);
                    console.log(audios)
                    audios.play()
                }else{
                    const ValueorderNos=ReactDOM.findDOMNode(this.refs.peiorder)
                    ValueorderNos.select()
                    const text=json.message
                    const dataSource=[]
                    const total=0
                    const limit=10
                    const currentPage=0
                    const wsOrderId=null
                    const qty=1
                    this.props.dispatch({
                        type:'postcheck/tabledata',
                        payload:{dataSource,total,limit,text,currentPage,wsOrderId,qty}
                    });
                    //加错误信息提示音
                    let audios = ReactDOM.findDOMNode(this.refs.error);
                    audios.play()
                }
            })
        }
    }
    //输入商品条码
    barcodeHindonKeyUp=(e)=>{
        if(e.keyCode==13){
            const values={}
            values.wsOrderId=this.props.wsOrderId
            values.barcode=e.target.value
            values.qty=this.props.qty
            const result=GetServerData('qerp.web.ws.order.check.barcode',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                    this.isSaoMiao = true;
                    if(json.checkFinish==true){
                        this.Focus()
                        Modal.success({
                            title: '复核完成'
                        });
                        const phcodevalue=''
                        const barcodevalue=''
                        const text=null
                        const dataSource=[]
                        const total=0
                        const limit=10
                        const currentPage=0
                        const wsOrderId=null
                        const qty=1
                        this.props.dispatch({
                            type:'postcheck/phcode',
                            payload:phcodevalue
                        });
                        this.props.dispatch({
                            type:'postcheck/barcode',
                            payload:barcodevalue
                        });
                        this.props.dispatch({
                            type:'postcheck/tabledata',
                            payload:{dataSource,total,limit,text,currentPage,wsOrderId,qty}
                        });
                        const ValueorderNoses=ReactDOM.findDOMNode(this.refs.peiorder)
                        ValueorderNoses.focus()
                        //加成功信息提示音
                        const audios = ReactDOM.findDOMNode(this.refs.success);
                        audios.play()
                    }else{
                        const ValueorderNos=ReactDOM.findDOMNode(this.refs.barcode)
                        ValueorderNos.select()
                        //重新对配货单进行请求，把最新的datasouce传递过去,刷新table数据
                        const values={orderNo:this.props.phcode,limit:10,currentPage:0}
                        this.props.dispatch({
                            type:'postcheck/fetch',
                            payload:{code:'qerp.web.ws.order.check.orderno',values:values}
                        });
                        const text=json.pdName
                        this.props.dispatch({
                            type:'postcheck/textvalue',
                            payload:text
                        });
                        //加扫描成功声音
                        const audios = ReactDOM.findDOMNode(this.refs.scanSuccess);
                        audios.play()
                    }
                }else{
                        const ValueorderNos=ReactDOM.findDOMNode(this.refs.barcode)
                        ValueorderNos.select()
                        const text=(json)=>{
                            return (
                                <div>
                                    <p style = {{color:'red'}}>{json.message}</p>
                                </div>
                            )
                        }
                        this.props.dispatch({
                            type:'postcheck/textvalue',
                            payload:text(json)
                        });
                        //加错误信息提示音
                        const audios = ReactDOM.findDOMNode(this.refs.error);
                        audios.play()      
                }
            })
        }
    }

    //数量更改回车
    qtyHindonKeyUp=(e)=>{
        if(e.keyCode==13){
            var qty =Number(e.target.value)
            if (this.isSaoMiao) {
                qty--;
            }
            const values={}
            values.wsOrderId=this.props.wsOrderId
            values.barcode=this.props.barcode
            values.qty=qty
            const result=GetServerData('qerp.web.ws.order.check.barcode',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                this.isSaoMiao = false;
                if(json.code=='0'){
                    if(json.checkFinish==true){
                        this.Focus()
                        Modal.success({
                            title: '复核完成'
                        });
                        const phcodevalue=''
                        const barcodevalue=''
                        const text=null
                        const dataSource=[]
                        const total=0
                        const limit=10
                        const currentPage=0
                        const wsOrderId=null
                        const qty=1
                        this.props.dispatch({
                            type:'postcheck/phcode',
                            payload:phcodevalue
                        });
                        this.props.dispatch({
                            type:'postcheck/barcode',
                            payload:barcodevalue
                        });
                        this.props.dispatch({
                            type:'postcheck/tabledata',
                            payload:{dataSource,total,limit,text,currentPage,wsOrderId,qty}
                        });
                        //加成功信息提示音
                        const audios = ReactDOM.findDOMNode(this.refs.success);
                        audios.play()
                        
                    }else{
                        const ValueorderNos=ReactDOM.findDOMNode(this.refs.barcode)
                        ValueorderNos.select()
                        const values={orderNo:this.props.phcode,limit:10,currentPage:0}
                        const qty=1
                        this.props.dispatch({
                            type:'postcheck/fetch',
                            payload:{code:'qerp.web.ws.order.check.orderno',values:values}
                        });
                        const text=json.pdName
                        this.props.dispatch({
                            type:'postcheck/textvalue',
                            payload:text
                        });
                        this.props.dispatch({
                            type:'postcheck/qtyvalue',
                            payload:qty
                        });
                        //加扫描成功声音
                        let audios = ReactDOM.findDOMNode(this.refs.scanSuccess);
                        audios.play()
                    }
                }else{
                    const ValueorderNos=ReactDOM.findDOMNode(this.refs.barcode)
                    ValueorderNos.select()
                    const text=(json)=>{
                        return (
                            <div>
                                <p style = {{color:'red'}}>{json.message}</p>
                            </div>
                        )
                    }
                    this.props.dispatch({
                        type:'postcheck/textvalue',
                        payload:text(json)
                    });
                    //加错误信息提示音
                    const audios = ReactDOM.findDOMNode(this.refs.error);
                    audios.play()      
                }
            })
        }
    }

    //重新复核
    HindClick=()=>{
        var values={wsOrderId:this.props.wsOrderId}
        const result=GetServerData('qerp.web.ws.order.check.redo',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const ValueorderNoses=ReactDOM.findDOMNode(this.refs.barcode)
                ValueorderNoses.focus()
                const barcodevalue=null
                this.props.dispatch({
                    type:'postcheck/barcode',
                    payload:barcodevalue
                });
                const dataSource=json.wsOrder.wsOrderDetails
                const text=json.wsOrder.name
                const total=json.total
                const limit=json.limit
                const currentPage=json.currentPage
                const wsOrderId=json.wsOrder.wsOrderId
                const qty=1
                this.props.dispatch({
                    type:'postcheck/tabledata',
                    payload:{dataSource,total,limit,text,currentPage,wsOrderId,qty}
                });
            }
        })
    }
    render() {
        return (
            <div>
                <div className='rel'>
                    <div className='abs con-t-l'>
                        <Input className='phinput' placeholder="请扫描配货单号" onKeyUp={this.hindonKeyUp.bind(this)} ref='peiorder' value={this.props.phcode} onChange={this.phcodeChange.bind(this)}/>
                        <Button className='btn_check' type="primary" onClick={this.HindClick.bind(this)}>重 新<br/>复 核</Button>
                        <Input className='barinput' placeholder="请扫描商品条码" onKeyUp={this.barcodeHindonKeyUp.bind(this)} ref='barcode' value={this.props.barcode} onChange={this.barcodeChange.bind(this)}/>
                        <Input className='qtyinput' ref='qty' value={this.props.qty} onKeyUp={this.qtyHindonKeyUp.bind(this)} onChange={this.qtyChange.bind(this)}/>
                    </div>
                    <div className='textbox'>
                        {this.props.text}
                    </div>
                </div>
                <div className='mt15'><EditableTable ref='checktable'/></div>
                <Audio ref='error' url='../../assets/error.mp3'/>
                <Audio ref='success' url='../../assets/success.mp3'/>
                <Audio ref='scanSuccess' url='../../assets/scanSuccess.mp3'/>
            </div>
           
        );
    }
    componentDidMount(){
        this.Focus()
    }
}

function mapStateToProps(state) {
    console.log(state)
    const {text,qty,phcode,barcode,wsOrderId} = state.postcheck;
    return {text,qty,phcode,barcode,wsOrderId};
}

export default connect(mapStateToProps)(Post_ku_check);
import {Input, Button,message} from 'antd';
import { connect } from 'dva';

class Title_search_component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            binCodeST:null,
            binCodeET:null,
            pdBarcodeST:null,
            pdBarcodeET:null
        }
    }

    binCodeSTChange=(e)=>{
        this.setState({
            binCodeST:e.target.value
        })
    }

    binCodeETChange=(e)=>{
        this.setState({
            binCodeET:e.target.value
        })
    }

    pdBarcodeSTChange=(e)=>{
        this.setState({
            pdBarcodeST:e.target.value
        })
    }
    pdBarcodeETChange=(e)=>{
        this.setState({
            pdBarcodeET:e.target.value
        })
    }
    HindClick=()=>{
        const values={
            hasValidQty:'true',
            binCodeST :this.state.binCodeST,
            binCodeET :this.state.binCodeET,
            pdBarcodeST :this.state.pdBarcodeST,
            pdBarcodeET :this.state.pdBarcodeET,
        }
        this.props.dispatch({
            type:'wsmove/newsearch',
            payload:{code:'qerp.web.ws.inv.pdsearch',values:values}
        })

    }

render() {
    return (
        <div className = 'table_top_search' style = {{padding:'15px 100px 15px 15px'}}>
        <div className = 'table_top_search_item'>
            <label>库位选择：</label>
            <Input ref='binCodeST' style={{width:'100px'}} onBlur={this.binCodeSTChange.bind(this)}/>
            <span style = {{margin: '0 10px'}}>至</span>
            <Input ref='binCodeET' style={{width:'100px'}} onBlur={this.binCodeETChange.bind(this)}/>
        </div>
        <div className = 'table_top_search_item'>
            <label>商品条码：</label>
            <Input ref='pdBarcodeST' style={{width:'100px'}} onBlur={this.pdBarcodeSTChange.bind(this)}/>
            <span style = {{margin: '0 10px'}}>至</span>
            <Input ref='pdBarcodeET' style={{width:'100px'}} onBlur={this.pdBarcodeETChange.bind(this)}/>
        </div>
        <Button className='table_top_search_button' type="primary" onClick={this.HindClick.bind(this,0)}>搜索</Button>
        </div>
    )
}
}

export default connect()(Title_search_component);
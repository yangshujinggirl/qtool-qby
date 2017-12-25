import '../../style/wsmove.css';
import {Input, Button} from 'antd';
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
            type:'adjust/newsearchfetch',
            payload:{code:'qerp.web.ws.inv.pdsearch',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }

render() {
    return (
        <div className = 'item_search clearfix'>
            <div className = 'table_top_search_item fl mr30'>
                <label>库位选择：</label>
                <Input ref='binCodeST' style={{width:'100px'}} onBlur={this.binCodeSTChange.bind(this)}/>
                <span style = {{margin: '0 10px'}}>至</span>
                <Input ref='binCodeET' style={{width:'100px'}} onBlur={this.binCodeETChange.bind(this)}/>
            </div>
            <div className = 'table_top_search_item fl mr30'>
                <label>商品条码：</label>
                <Input ref='pdBarcodeST' style={{width:'100px'}} onBlur={this.pdBarcodeSTChange.bind(this)}/>
                <span style = {{margin: '0 10px'}}>至</span>
                <Input ref='pdBarcodeET' style={{width:'100px'}} onBlur={this.pdBarcodeETChange.bind(this)}/>
            </div>
            <div className='fr'> <Button className='table_top_search_button' type="primary" onClick={this.HindClick.bind(this,0)}>搜索</Button></div>
        </div>
    )
}

}

export default connect()(Title_search_component);
import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,Checkbox,Pagination} from 'antd';
import { connect } from 'dva';
import '../../../style/goods.css';
import {GetServerData} from '../../../services/services';

const FormItem = Form.Item;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;

class Goodlist extends React.Component {
    state = {
        createTimeST: undefined,
        createTimeET:undefined,
        expectedTimeST:undefined,
        expectedTimeET:undefined
    };
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            this.initWarehouseList(values,this.props.limit,0)
            this.synchronousState(values)
            // this.initselect()
        });
    }
    //搜搜请求数据
    initWarehouseList=(values,limit,currentPage)=>{
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'goods/fetch',
            payload:{code:'qerp.web.pd.spu.query',values:values}
        })
        this.props.dispatch({type:'tab/loding',payload:true})
    }
    //同步data
    synchronousState=(values)=>{
        values.createTimeST=this.state.createTimeST 
        values.createTimeET=this.state.createTimeET 
        values.expectedTimeST=this.state.expectedTimeST 
        values.expectedTimeET=this.state.expectedTimeET 
        this.props.dispatch({
            type:'goods/synchronous',
            payload:values
        })
    }
    hinddataChange=(dates, dateString)=>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }
    dataonChanges(date, dateString) {
        this.setState({
            expectedTimeST:dateString[0],
            expectedTimeET:dateString[1]
        })
    }
      //品牌列表
      Categorylist=()=>{
        let value={
            getChildren:false,
            enabled:true
        }
        this.props.dispatch({
            type:'IndexPage/categoryfetch',
            payload:{code:'qerp.web.pd.category.list',values:value}
        })
    }
    initselect=()=>{
		const selectedRows=[]
		const selectedRowKeys=[]
		this.props.dispatch({
	    	type:'goods/select',
	    	payload:{selectedRowKeys,selectedRows}
	  	})
    }
    checkonChange=(index,e)=>{
        const goodslist=this.props.goodslist.slice(0)
        goodslist[index].check=e.target.checked
        const {total,limit,currentPage,fileDomain}=this.props
        this.props.dispatch({
            type:'goods/goodslist',
	    	payload:{goodslist,total,limit,currentPage,fileDomain}
        })

    }
    hindsell=(id,state,e)=>{
        const s=[]
        s.push(id)
        let values={
            pdSpuIds:s,
            status:state
        }
        const result=GetServerData('qerp.web.pd.spu.status',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.props.dispatch({
                    type:'goods/fetch',
                    payload:{code:'qerp.web.pd.spu.query',values:this.props.values}
                })


              
               
            }
        })




       

    }


    onShowSizeChange=(current,size)=>{
        console.log(current)
        const values=this.props.values
        values.limit=size
        values.currentPage=Number(current)-1    
        this.props.dispatch({
            type:'goods/fetch',
            payload:{code:'qerp.web.pd.spu.query',values:values}
        })
    }
    titClick=(id)=>{
        console.log(id)
        const paneitem={title:'商品详情',key:'301000edit'+String(id)+'info',componkey:'301000info',data:{pdSpuId:id}}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})


    }

    editspu=(id)=>{
        const paneitem={title:'商品编辑',key:'301000edit'+String(id),componkey:'301000edit',data:{pdSpuId:id}}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})
    }
    render() {
        return (
            <div>
               <ul className='listbox clearfix'>
                    {   
                        this.props.goodslist.map((item,index)=>{
                            return (
                                <li className='list' key={index}>
                                    <div className='list_l'>
                                        <img src={this.props.fileDomain+item.mainPicUrl}/>
                                        <Checkbox className='list_check' checked={item.check} onChange={this.checkonChange.bind(this,index)}/>
                                    </div>
                                    <div className='list_r'>
                                        <p className='title' onClick={this.titClick.bind(this,item.pdSpuId)}>{item.name}</p>
                                        <p className='main'>库存：<span className={item.inventory=='0'?'red':null}>{item.inventory}</span></p>
                                        <p className='main'>售价：￥{item.minPrice}</p>
                                        <div className='icons'>
                                            {   
                                                item.list_img_name.length>0?
                                                (item.list_img_name.map((subitem,subindex)=>{
                                                    return (<div key={subindex} className='icon_img'>
                                                        <img src={subitem}/>
                                                    </div>
                                                    )
                                                }))
                                                :<div className='icon_img'></div>



                                            }


    
                                        </div>
                                        <div>
                                            <Button className='btn' disabled={item.status==20?false:true} onClick={this.hindsell.bind(this,item.pdSpuId,10)}>售卖</Button>
                                            <Button className='btn' disabled={item.status==20?true:false} onClick={this.hindsell.bind(this,item.pdSpuId,20)}>停售</Button>
                                            <Button className='btn' onClick={this.editspu.bind(this,item.pdSpuId)}>编辑</Button>
                                        </div>
                                    </div>
                                </li>
                        )
                        })




                    }



                   
               </ul>
                <div className='tr'>
                    <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange.bind(this)} total={this.props.total} pageSize={this.props.limit} pageSizeOptions={['16','50','100','200']} current={Number(this.props.currentPage)+1}/>
                </div>
               </div>
        );
    }
    
}
function mapStateToProps(state) {
    console.log(state)
    const {limit,currentPage,goodslist,fileDomain,total,values} = state.goods;
    console.log(goodslist)
    const {pdCategorysList}=state.IndexPage;
    return {limit,currentPage,pdCategorysList,goodslist,fileDomain,total,values};
}


export default connect(mapStateToProps)(Goodlist);
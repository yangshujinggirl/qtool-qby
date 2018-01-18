import '../../../style/goods.css';
import {  Button,Checkbox,Pagination} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';

class Goodlist extends React.Component {
    //checkChange
    checkonChange=(index,e)=>{
        const goodslist=this.props.goodslist.slice(0)
        goodslist[index].check=e.target.checked
        const {total,limit,currentPage}=this.props
        this.props.dispatch({
            type:'goods/goodslist',
	    	payload:{goodslist,total,limit,currentPage}
        })
    }
    //售卖、停售
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
                this.refreshSearch(this.props.limit,this.props.currentPage) 
            }
        })
    }
    //商品编辑
    editspu=(id)=>{
        const paneitem={title:'商品编辑',key:'301000edit'+String(id),componkey:'301000edit',data:{pdSpuId:id}}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
        })
        this.props.dispatch({
			type:'goods/initgoodedit',
			payload:{}
	  	})	
    }

    //刷新列表
    refreshSearch=(limit,currentPage)=>{
        const values=this.props.values
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'goods/fetch',
            payload:{code:'qerp.web.pd.spu.query',values:values}
        })
    }

    //分页size变化
    onShowSizeChange=(current,size)=>{
        this.refreshSearch(size,Number(current)-1)
    }
    //分页点击页码
    pahindChange=(page,pageSize)=>{
        this.refreshSearch(pageSize,Number(page)-1)
    }

    //商品详情
    titClick=(id)=>{
        const paneitem={title:'商品详情',key:'301000edit'+String(id)+'info',componkey:'301000info',data:{pdSpuId:id}}
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})
    }
    render() {
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
        return (
            <div>
                <ul className='listbox clearfix'>
                    {   
                        this.props.goodslist.map((item,index)=>{
                            return (
                                <li className='list' key={index}>
                                    <div className='list_l'>
                                        <img src={item.mainPicUrl?fileDomain+item.mainPicUrl:require('../../../assets/nogoods.png')}/>
                                        <Checkbox className='list_check' checked={item.check} onChange={this.checkonChange.bind(this,index)}/>
                                    </div>
                                    <div className='list_r'>
                                        <p className='title pointer' onClick={this.titClick.bind(this,item.pdSpuId)}>{item.name}</p>
                                        <p className='main'>库存：<span className={item.inventory=='0'?'red':null}>{item.inventory}</span></p>
                                        <p className='main'>售价：￥{item.minPrice}</p>
                                        <div className='icons'>
                                            {   
                                                item.list_img_name.length>0?
                                                (item.list_img_name.map((subitem,subindex)=>{
                                                    return (<div key={subindex} className='icon_img'>
                                                        <img src={require('../../../assets/'+subitem)}/>
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
                    <Pagination 
                        showSizeChanger 
                        onShowSizeChange={this.onShowSizeChange.bind(this)} 
                        total={this.props.total} 
                        pageSize={this.props.limit} 
                        pageSizeOptions={['16','50','100','200']} 
                        current={Number(this.props.currentPage)+1}
                        onChange={this.pahindChange.bind(this)}
                        />
                </div>
            </div>
        );
    }
    
}
function mapStateToProps(state) {
    const {limit,currentPage,goodslist,total,values} = state.goods;
    return {limit,currentPage,goodslist,total,values};
}


export default connect(mapStateToProps)(Goodlist);
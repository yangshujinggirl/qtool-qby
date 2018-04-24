import '../../../style/goods.css';
import {  Button,Checkbox,Pagination,message} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';

class Goodlist extends React.Component {
    //checkChange
    checkonChange=(index,e)=>{
        const goodslist=this.props.goodslist.slice(0)
        goodslist[index].check=e.target.checked
        const {total,limit,currentPage}=this.props
        this.props.dispatch({
            type:'onlinegood/goodslist',
	    	payload:{goodslist,total,limit,currentPage}
        })
    }
    //售卖、停售
    hindsell=(id,state,e)=>{
        if(this.props.sellopenobj){
            const s=[]
            s.push(id)
            let values={
                pdSpuIds:s,
                status:state
            }
            const result=GetServerData('qerp.web.ec.pd.spu.status',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                    this.refreshSearch(this.props.limit,this.props.currentPage) 
                }
            })
        }else{
            message.error('无权限修改');
        }
    }
    //商品编辑
    editspu=(id)=>{
        if(this.props.addorderobj){
            const paneitem={title:'商品编辑',key:'802000edit'+String(id),componkey:'802000edit',data:{pdSpuId:id,type:'2'}}
            this.props.dispatch({
                  type:'tab/firstAddTab',
                  payload:paneitem
            })
            this.props.dispatch({
                type:'onlinegood/initgoodedit',
                payload:{}
              })
        }else{
            message.error('无权限修改');
        }  	
    }

    //刷新列表
    refreshSearch=(limit,currentPage)=>{
        const values=this.props.values
        values.limit=limit
        values.currentPage=currentPage
        this.props.dispatch({
            type:'onlinegood/fetch',
           // payload:{code:'qerp.web.pd.spu.query',values:values}
            //修改接口
            payload:{code:'qerp.web.ec.pd.spu.query',values:values}
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
        const paneitem={title:'商品详情',key:'802000edit'+String(id)+'info',componkey:'802000info',data:{pdSpuId:id}};
		this.props.dispatch({
		  	type:'tab/firstAddTab',
		  	payload:paneitem
		})
    }
    //商品日志
    outconfig=(id)=>{
        const paneitem = {title:'商品日志',key:'802000editconfig'+String(id),componkey:'802000editconfig',data:{pdSpuId:id}};
        this.props.dispatch({
            type:'tab/firstAddTab',
            payload:paneitem
        })
    }
    render() {
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
        return (
            <div className='mygoodslist'>
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
                                    </div>
                                    <ul className='btnall'>
                                           <li><Button className='btn' disabled={item.status==20?false:true} onClick={this.hindsell.bind(this,item.pdSpuId,10)}>售卖</Button></li>
                                           <li><Button className='btn' disabled={item.status==20?true:false} onClick={this.hindsell.bind(this,item.pdSpuId,20)}>停售</Button></li>
                                           <li><Button className='btn' onClick={this.editspu.bind(this,item.pdSpuId)} style={this.props.addorderobj?null:{background:'#F5F5F5',color:'rgba(0, 0, 0, 0.25)'}}>编辑</Button></li>
                                           <li><Button className='btn' onClick={this.outconfig.bind(this,item.pdSpuId)}>日志</Button></li>
                                    </ul>
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
    const {limit,currentPage,goodslist,total,values} = state.onlinegood;
    return {limit,currentPage,goodslist,total,values};
}


export default connect(mapStateToProps)(Goodlist);
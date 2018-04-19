import {GetServerData} from '../../../services/services';
import { Button, Icon ,Modal} from 'antd';
import SearchForm from './search';
import SearchTable from './table';

class OrderuserIndex extends React.Component{
    state = {
        searchvalue:null,
        datasouce:[{
            orderNo:"122",
            key:"1"
        }],
        total:0,
        currentPage:0,
        limit:15,
        selectedRowKeys:[],
        selectedRows:[]
    };
    //导出数据
	exportData = (type,data) => {
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {},
	  			});
			}
		})
    }
    
    //table搜索
    hindSearch=(values)=>{
        values.limit=this.state.limit
        values.currentPage=this.state.currentPage
        const result=GetServerData('qerp.web.ec.pd.userOrder.query',values)
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    searchvalue:values,
                    datasouce:json.userOrder,
                    total:json.total,
                    currentPage:json.currentPage,
                    limit:json.limit
                })
            }
        }) 
    }
    //获得分页最新的limit和currentPage
    getPageSize=(limit,currentPage)=>{
        this.setState({
            limit:limit,
            currentPage:currentPage
        },function(){
            this.hindSearch(this.state.searchvalue)
        })
    }

    //select拦截
    selectedRowreturn=()=>{
        if (this.state.selectedRows.length < 1) {
			message.error('请选择采购单',.8)
			return;
        }
    }
    //重新推送
    postMessage=()=>{
        this.selectedRowreturn()
        const ecOrderIds=[]
        for(var i=0;i<this.state.selectedRows.length;i++){
            ecOrderIds.push(this.state.selectedRows[i].ecOrderId)
        }
        const values={ecOrderIds:ecOrderIds}
        const result=GetServerData('qerp.web.ec.pd.spulog.list',values)
            result.then((res) => {
               return res;
            }).then((json) => {
                if(json.code=='0'){
                    this.setState({
                        selectedRowKeys:[],
                        selectedRows:[]
                    },function(){
                        this.hindSearch(this.state.searchvalue)
                    })
                }
            })
    }
    
    //重新匹配商品
    matchOrder=()=>{
        this.selectedRowreturn()
        const ecOrderIds=[]
        for(var i=0;i<this.state.selectedRows.length;i++){
            if(this.state.selectedRows[i].status=='-1'){
                ecOrderIds.push(this.state.selectedRows[i].ecOrderId)
            }
        }
        const values={ecOrderIds:ecOrderIds}
        const result=GetServerData('qerp.web.ec.pd.userOrder.reMatch',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    selectedRowKeys:[],
                    selectedRows:[]
                },function(){
                    this.hindSearch(this.state.searchvalue)
                })
            }
        }) 
    }

    //获得选中行数据
    getSelectDate=(selectedRowKeys,selectedRows)=>{
        this.setState({
            selectedRowKeys:selectedRowKeys,
            selectedRows:selectedRows
        })
    }

  	render(){
     	return(
        	<div className='content_box'>
                <SearchForm  hindFormSearch={this.hindSearch.bind(this)}/>
                <Button 
                    type="primary" 
                    size='large'
                    className='mt20 mr10'
                    onClick={this.exportData.bind(this,91,this.state.searchvalue)}
                >
                    导出数据
                </Button>
                <Button 
                    type="primary" 
                    size='large'
                    className='mt20 mr10'
                    onClick={this.postMessage.bind(this)}
                >
                    重新推送
                </Button>
                <Button 
                    type="primary" 
                    size='large'
                    className='mt20 mr10'
                    onClick={this.matchOrder.bind(this)}
                >
                    重新匹配商品
                </Button>
                <div className='mt15'>
                    <SearchTable 
                        getPageSizeDate={this.getPageSize.bind(this)}
                        total={this.state.total} 
                        limit={this.state.limit} 
                        currentPage={this.state.currentPage}
                        datasouce={this.state.datasouce}
                        getSelectDate={this.getSelectDate.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
        	</div>
      	)
	}
}

export default OrderuserIndex;

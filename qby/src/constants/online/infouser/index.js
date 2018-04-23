import {GetServerData} from '../../../services/services';
import { Button, Icon ,Modal} from 'antd';
import SearchForm from './search';
import SearchTable from './table';
const confirm = Modal.confirm;

class InfouserIndex extends React.Component{
    state = {
        searchvalue:null,
        datasouce:[],
        total:0,
        currentPage:0,
        limit:15
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
        const result=GetServerData('qerp.web.ec.user_consume_query',values)
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    searchvalue:values,
                    datasouce:json.consumes,
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

  	render(){
        const rolelists=this.props.data.rolelists
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
     	return(
        	<div className='content_box'>
                <SearchForm  hindFormSearch={this.hindSearch.bind(this)}/>
                <Button 
                    type="primary" 
                    size='large'
                    className='mt20'
                    onClick={this.exportData.bind(this,90,this.state.searchvalue)}
                >
                    导出数据
                </Button>
                <div className='mt15'>
                    <SearchTable 
                        getPageSizeDate={this.getPageSize.bind(this)}
                        total={this.state.total} 
                        limit={this.state.limit} 
                        currentPage={this.state.currentPage}
                        datasouce={this.state.datasouce}
                        />
                </div>
        	</div>
      	)
	}
}

export default InfouserIndex;

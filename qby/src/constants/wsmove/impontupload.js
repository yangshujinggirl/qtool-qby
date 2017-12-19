import {Table, Input, Button, Upload,message} from 'antd';
import { connect } from 'dva';

class MyUpload extends React.Component {
		state = {
			fileList: []
		}
		handleChange = (info) => {
			const str=/^[0-9]*$/
			let fileList = info.fileList;
			fileList = fileList.slice(-2);
			fileList = fileList.filter((file) => {
				if (file.response) {
					if(file.response.code=='0'){
						const wsInvSearchs=file.response.wsInvSearchs
						for(var i=0;i<wsInvSearchs.length;i++){
							if(wsInvSearchs[i].qty==null || wsInvSearchs[i].qty==undefined || wsInvSearchs[i].qty=='' || wsInvSearchs[i].qtyAllocated==null || wsInvSearchs[i].qtyAllocated==undefined || wsInvSearchs[i].qtyAllocated=='' || wsInvSearchs[i].qtyOnhold==null || wsInvSearchs[i].qtyOnhold==undefined || wsInvSearchs[i].qtyOnhold==''){
								wsInvSearchs[i].qtyCanMove=null
							}else{
								wsInvSearchs[i].qtyCanMove =Number(wsInvSearchs[i].qty)-Number(wsInvSearchs[i].qtyAllocated)-Number(wsInvSearchs[i].qtyOnhold);
							}
							wsInvSearchs[i].index =i+1;
							const patt=str.test(Number(wsInvSearchs[i].optQty))
							if(patt){
								wsInvSearchs[i].datasuccess=true
							}else{
								wsInvSearchs[i].datasuccess=false
							}
							
						}
						this.props.dispatch({
							type:'wsmove/wsInvSearchs',
							payload:wsInvSearchs
						})
					}else{
					message.error(file.response.message);
					}
				return file.response.status === 'success';
				}
				return true;
			});
			this.setState({ fileList });
			}
		render() {
			const props = {
				action: '/erpQwmsRest/qwmsrest.htm?code=qerp.web.ws.inv.pdimport',
				onChange: this.handleChange,
				name:'mfile',
				showUploadList:false
			};
			return (
				<Upload {...props} fileLis	t={this.state.fileList}>
					<Button type="primary" className='uploadim'>
						导入移库商品
					</Button>
				</Upload>
			);
		}
	}
	
	


export default connect()(MyUpload);
import { Tree } from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';


const TreeNode = Tree.TreeNode;
class Treerole extends React.Component {
  	state = {
    	expandedKeys: [],
    	autoExpandParent: true,
		checkedKeys:[],
		postcheckedKeys: [],
		selectedKeys: [],
		treeData:[]
  	}
  	onExpand = (expandedKeys) => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
  	}
	onCheck = (checkedKeys,e) => {
		console.log(checkedKeys)
		console.log(e)
		//功能权限带出基础权限
		const postcheckedKeys=[]
		for(var i=0;i<e.checkedNodes.length;i++){
			if((!e.checkedNodes[i].props.children) || (e.checkedNodes[i].props.children.length<1)){
				postcheckedKeys.push(e.checkedNodes[i].key)
                if(e.checkedNodes[i].props.code!='0'){
					//处理基础权限
					const newcheckedKeys=checkedKeys.filter((item)=>{
						return item==e.checkedNodes[i].props.code
					})
					if(newcheckedKeys.length<1){
						checkedKeys.push(e.checkedNodes[i].props.code)
						postcheckedKeys.push(e.checkedNodes[i].props.code)
					}
				}
				
			}
		}
		console.log(postcheckedKeys)
		this.setState({ 
			checkedKeys:checkedKeys,
			postcheckedKeys:postcheckedKeys
		},function(){
			const checkedKeys=this.state.checkedKeys
			const rolesData=this.state.postcheckedKeys
			this.props.dispatch({
				type:'account/opUrRoleIds',
				payload:{checkedKeys,rolesData}
			})
		});
	}
	onSelect = (selectedKeys, info) => {
		this.setState({ selectedKeys });
	}
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode title={item.name} key={item.urRoleId} dataRef={item} code={item.code}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});
	}


	//数据循环处理
	
	renderRoleData = (data) => {
		for(var i=0;i<data.length;i++){
			data[i].title=data[i].name
			data[i].key=data[i].urRoleId
			if(data[i].children){
				this.renderRoleData(data[i].children)
			}
		}
	}
	//请求数据
	getRoleDate=()=>{
		const values={}
		const result=GetServerData('qerp.web.ur.role.list',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				const urRoles=json.urRoles
				this.renderRoleData(urRoles)
				this.setState({
					treeData:urRoles,
					checkedKeys:this.props.checkedKeys,
					postcheckedKeys:this.props.checkedKeys
				})
			}
		})
	}

	render() {
		return (
			<Tree
				checkable
				onExpand={this.onExpand}
				expandedKeys={this.state.expandedKeys}
				autoExpandParent={this.state.autoExpandParent}
				onCheck={this.onCheck}
				checkedKeys={this.state.checkedKeys}
				onSelect={this.onSelect}
				selectedKeys={this.state.selectedKeys}
			>
				{this.renderTreeNodes(this.state.treeData)}
			</Tree>
		);
	}
	componentDidMount(){
		this.getRoleDate()
	}
	



}

export default connect()(Treerole);

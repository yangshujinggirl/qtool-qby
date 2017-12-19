import { connect } from 'dva';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;



class UserTags extends React.Component {
	state = {
		selectedTags: [],
	};

	handleChange(tag, checked) {
		this.props.changeHasTagStatus();
		const id=Number(tag.urRoleId);
		this.props.dispatch({type:'account/urRoleIdschange',payload:{id,checked}})
	}

	render() {
		return (
			<div>
				{this.props.totalurRoles.map(tag => (
				<CheckableTag 
					style={{border:'1px solid #d9d9d9',height:'30px',width:'80px',lineHeight:'30px',marginBottom:'10px',textAlign:'center'}}
					key={tag.urRoleId}
					checked={this.props.urRoleIds.indexOf(Number(tag.urRoleId)) > -1}
					onChange={checked => this.handleChange(tag, checked)}
				>
					{tag.name}
				</CheckableTag>
				))}
			</div>
		);
	}
	componentDidMount(){
		const payload={code:'qerp.web.ur.role.list',values:null}
		this.props.dispatch({type:'account/rolelist',payload:payload})
	}
}
function mapStateToProps(state) {
	//获取所有的权限
	const {totalurRoles,urRoleIds,wsWarehouseId} = state.account;
	return {totalurRoles,urRoleIds,wsWarehouseId};
}


export default connect(mapStateToProps)(UserTags);
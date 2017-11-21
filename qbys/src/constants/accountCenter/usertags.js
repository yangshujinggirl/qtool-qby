import { connect } from 'dva';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;



class UserTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
      const id=tag.urRoleId
      this.props.dispatch({type:'account/urRoleIdschange',payload:{id,checked}})
  }

  render() {
    return (
      <div>
        {this.props.totalurRoles.map(tag => (
          <CheckableTag 
            style={{border:'1px solid #d9d9d9',height:'30px',width:'80px',lineHeight:'30px',marginBottom:'10px',textAlign:'center'}}
            key={tag.urRoleId}
            checked={this.props.urUser.urRoleIds.indexOf(tag.urRoleId) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }
  componentDidMount(){
    const payload={code:'qerp.web.ur.role.list',values:{}}
    this.props.dispatch({type:'account/rolelist',payload:payload})

  }
}
function mapStateToProps(state) {
    //获取所有的权限
    const {totalurRoles,urUser} = state.account;
    return {totalurRoles,urUser};
}


export default connect(mapStateToProps)(UserTags);
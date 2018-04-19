
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import { connect } from 'dva';

class EditableCell extends React.Component {
    state = {
        value: '',
        editable: false
    }
    handleChange = (e) => {
        this.setState({value:e.target.value});
    }
    check = () => {
        this.setState({ editable: false },function(){
            const goodindodatasouce=this.props.goodindodatasouce.slice(0)
            for(var i=0;i<goodindodatasouce.length;i++){
                goodindodatasouce[i][this.props.title]=this.state.value
            }
            this.props.dispatch({
				type:'onlinegood/goodindodatasouce',
				payload:goodindodatasouce
			})
        });
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            onPressEnter={this.check}
                        />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check}
                        />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        <span onClick={this.edit.bind(this)}>{this.props.text}</span>
                    </div>
                }
            </div>
      );
    }
  }

  function mapStateToProps(state) {
	const {goodindodatasouce} = state.onlinegood;
	return {goodindodatasouce};
}
  export default connect(mapStateToProps)(EditableCell);
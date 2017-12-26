import { Modal, Button } from 'antd';

class Appmodelone extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div style={{display:'inline-block',marginLeft:'10px'}}>
        <Button type="primary" size='large' onClick={this.showModal}>{this.props.text}</Button>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={this.props.cancelText?this.props.cancelText:'取消'}
          okText={this.props.okText?this.props.okText:'确定'}
        >
          <div>{this.props.count}</div>
        </Modal>
      </div>
    );
  }
}

export default Appmodelone;
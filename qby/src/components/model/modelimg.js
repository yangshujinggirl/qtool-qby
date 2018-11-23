import { Modal, Button } from 'antd';

class Imgmodel extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const fileDomain=eval(sessionStorage.getItem('fileDomain'));
        return (
            <div>
                    {
                        !this.props.picUrl?'':
                            <div style={{width:"100px",height:"100px"}} onClick={this.showModal}>
                                <img src={fileDomain+this.props.picUrl} className='w100 h100'/>
                            </div>

                    }
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    wrapClassName='billModal'
                >
                    <div>
                        {
                            !this.props.picUrl?''
                            : <img src={fileDomain+this.props.picUrl} className='w100 h100'/>

                        }

                    </div>
                </Modal>
            </div>
        );
    }
}

export default Imgmodel;

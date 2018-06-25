import { connect } from 'dva';
import { Modal, Button ,Icon,message} from 'antd';

const Infomodel =({num,amount,visible, handleCancel, handleOk}) => {

  return (
    <div>
      <Modal
        className='infomodels'
        title=""
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        closable={false}
        // footer={[
        //      <Button key="submit" type="primary"  onClick={handleOk}>确定</Button>,
        // ]}
      >
        <div><p className='f18 mt20 modeltext'>商品数量：{num}</p>
        <p className='f18 mb10 modeltext'>订单金额：{amount}</p></div>
      </Modal>
    </div>
  );
}


export default Infomodel;

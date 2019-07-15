import React, { Component } from "react";
import { Modal,Form } from "antd";
const FormItem = Form.Item;
import CommonUpload from "../components/UploadImg";

class Search extends Component {
  render() {
    const { visible, fileList, changeImg, onCancel, onOk } = this.props;
    return (
      <Modal width='500' visible={visible} okText="保存" onCancel={onCancel} onOk={onOk}>
        <FormItem label='设置背景图片'>
          <CommonUpload
            describe="750*199"
            fileList={fileList}
            changeImg={changeImg}
            exampleImg=""
            width={750}
            height={199}
          />
        </FormItem>
      </Modal>
    );
  }
}

export default Search;

import React, { Component } from "react";
import { Modal,Form } from "antd";
const FormItem = Form.Item;
import CommonUpload from "../components/UploadImg";
import AppImgUpload from '../components/UploadImg'
import IosImgUpload from '../components/UploadImg'

class Search extends Component {
  render() {
    const { visible, fileList,fileList2,fileList3, changeImg,changeImg2,changeImg3, onCancel, onOk,loading } = this.props;
    return (
      <Modal width={500} confirmLoading={loading} visible={visible} okText="保存" onCancel={onCancel} onOk={onOk}>
        <FormItem label='设置App背景图片(ios全面屏和安卓机型适用)'>
          <AppImgUpload
            describe="750*199"
            fileList={fileList}
            changeImg={changeImg}
            width={750}
            height={199}
          />
        </FormItem>
        <FormItem label='设置APP背景图片(ios非全面屏适用)'>
          <IosImgUpload
            describe="750*151"
            fileList={fileList2}
            changeImg={changeImg2}
            width={750}
            height={151}
          />
        </FormItem>
        <FormItem label='设置小程序背景图片'>
          <CommonUpload
            describe="750*120"
            fileList={fileList3}
            changeImg={changeImg3}
            width={750}
            height={120}
          />
        </FormItem>
        
      </Modal>
    );
  }
}

export default Search;

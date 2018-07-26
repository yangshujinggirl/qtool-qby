import React, { Component } from 'react';

/**
 * 列表搜索组件的基类
 * 1. 提供搜索框的默认布局（FormItem、Col）
 * 2. 提供默认的搜索、更改表单值方法
 */
export default class BaseCondition extends Component {
  constructor(props, store, action) {
    super(props);
    // // 搜索框表单的对应的值，可以设置默认值
    // this.state = {
    //   value: {}
    // };
    // 表单的FormItem的布局比例
    this.formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    // 表单的FormItem的布局比例
    this.formItemLayout2 = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 14
      }
    };
    // 表单的列布局
    this.colspans = {
      xs: 24,
      sm: 24,
      md:12,
      lg: 8,
      xxl: 6
    };
  }
  // handleSubmit() {
  //   let value = this.state.value;
  //
  //   for (let i in value) {
  //     // 替换搜索条件中字符串的前后空格
  //     if (typeof value[i] == 'string') {
  //       value[i] = value[i].replace(/^\s+|\s+$/gm, '');
  //     }
  //   }
  //
  //   this.props.onSubmit && this.props.onSubmit(this.state.value);
  // }
  // filterFormChange(value) {
  //   this.setState({
  //     value: value
  //   });
  // }
}

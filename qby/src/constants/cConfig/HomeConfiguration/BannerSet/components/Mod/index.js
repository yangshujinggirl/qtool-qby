import React , { Component } from 'react';
import { Input, Form, Select, Button } from 'antd';
import UpLoadImg from '../UpLoadImg';
import BaseEditTable from '../../../../../../components/BaseEditTable';
import {columns} from '../../columns';
import './index.less';

const FormItem = Form.Item;
class ModForm extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        align:'center',
        width:'6%',
        render:(text,record,index)=> {
          index++;
          return <span>{index}</span>
        }
      }, {
        title: 'banner图片',
        dataIndex: 'SpuId',
        key: 'SpuId',
        align:'center',
        width:'10%',
        render:(text,record,index)=> {
          return <UpLoadImg
                  fileList={[]}
                  form={this.props.form}
                  index={index}/>
        }
      }, {
        title: 'bannerID',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        width:'8%',
      }, {
        title: 'banner名称',
        dataIndex: 'displayName',
        key: 'displayName',
        align:'center',
        width:'15%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          return <FormItem>
                  {getFieldDecorator(`goods[${index}].name`,{
                    initialValue:record.name
                  })(
                    <Input
                      placeholder="请输入名称"
                      autoComplete="off"/>
                    )
                  }
                </FormItem>
        }
      }, {
        title: '适用端*',
        dataIndex: 'platform',
        key: 'platform',
        align:'center',
        width:'15%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          return <FormItem>
             {getFieldDecorator(`goods[${index}].platform`)(
               <Select
                 placeholder="请选择平台"
                 allowClear={true}>
                 <Select.Option
                   value={0}
                   key={0}>小程序</Select.Option>
                 <Select.Option
                   value={1}
                   key={1}>App</Select.Option>
                 <Select.Option
                   value={2}
                   key={2}>小程序+App</Select.Option>
               </Select>
             )}
             </FormItem>
        }
      }, {
        title: '跳转链接',
        dataIndex: 'link',
        key: 'shop',
        align:'center',
        width:'15%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          // console.log(this.props.form.getFieldValue('goods'));
          return <FormItem>
             {getFieldDecorator(`goods[${index}].link`)(
               <Select
                 placeholder="请选择平台"
                 allowClear={true}>
                 <Select.Option
                   value={0}
                   key={0}>小程序</Select.Option>
                 <Select.Option
                   value={1}
                   key={1}>App</Select.Option>
                 <Select.Option
                   value={2}
                   key={2}>小程序+App</Select.Option>
               </Select>
             )}
             </FormItem>
        }
      },  {
        title: 'URL链接',
        dataIndex: 'url',
        key: 'url',
        align:'center',
        width:'15%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          return <FormItem>
                  {getFieldDecorator(`goods[${index}].url`,{
                    initialValue:record.url
                  })(
                    <Input
                      placeholder="请输入url"
                      autoComplete="off"/>
                    )
                  }
                </FormItem>
        }
      }, {
        title: '开始时间',
        dataIndex: 'stime',
        key: 'stime',
        align:'center',
        width:'8%',
      },{
        title: '结束时间',
        dataIndex: 'etime',
        key: 'etime',
        align:'center',
        width:'8%',
        render:()=> {
          return <span>结束时间为下一张开始时间</span>
        }
      }];
  }
  //重置表单
  resetGoodsForm=(index,dataSource)=> {
    let goods = this.props.form.getFieldValue('goods');
    let dd = goods.filter((item,key) => {
      return key != index
    });
    setTimeout(()=> {
      this.props.form.setFieldsValue({
        goods:dd
      });
    },0)
  }
  submit=()=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    let { goodsList } =this.props;
    const { form } =this.props;
    return(
      <Form className="banner-set-tables">
        <BaseEditTable
          btnText="商品"
          resetForm={this.resetGoodsForm}
          columns={this.columns}
          dataSource={goodsList}/>
        <Button
          onClick={this.submit}
          size="large"
          type="primary">
            保存
        </Button>
      </Form>
    )
  }
}
const Mod = Form.create({
  // mapPropsToFields(props) {
  //   return {
  //     goods: Form.createFormField(props.goodsList),
  //   };
  // }
})(ModForm);
export default Mod;

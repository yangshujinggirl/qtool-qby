import React, { Component } from 'react';
import { Form, Select, Col, Row, Input } from 'antd';
import { connect } from 'dva';
import BaseEditTable from '../../../../../../components/BaseEditTable';
import './index.less';

const FormItem = Form.Item;

class GoodsTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        align:'center',
        width:'6%',
      }, {
        title: 'SpuId',
        dataIndex: 'SpuId',
        key: 'SpuId',
        align:'center',
        width:'8%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          return <FormItem>
                  {getFieldDecorator(`goods[${index}].SpuId`,{
                    initialValue:record.SpuId
                  })(
                    <Input
                      placeholder="请输入SpuId"
                      onBlur={(e)=>this.spuIdblur(e,index)}
                      autoComplete="off"/>
                    )
                  }
                </FormItem>
        }
      }, {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        width:'15%',
      }, {
        title: '商品分类',
        dataIndex: 'displayName',
        key: 'displayName',
        align:'center',
        width:'8%',
      }, {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        width:'8%',
      }, {
        title: '缺货门店',
        dataIndex: 'shop',
        key: 'shop',
        align:'center',
        width:'8%',
      },  {
        title: 'B端在售库存',
        dataIndex: 'qty',
        key: 'qty',
        align:'center',
        width:'8%',
      }, {
        title: '固定位置',
        dataIndex: 'position',
        key: 'position',
        align:'center',
        width:'15%',
        render:(text,record,index)=> {
          const { getFieldDecorator } =this.props.form;
          return <div>
                    该商品固定在
                  <FormItem>
                    {getFieldDecorator(`goods[${index}].order`)(
                      <Input
                        placeholder="请输入商品编码"
                        autoComplete="off"/>
                      )
                    }
                  </FormItem>
                  位置
                  <FormItem>
                    {getFieldDecorator(`goods[${index}].days`)(
                      <Input
                        placeholder="请输入商品编码"
                        autoComplete="off"/>
                      )
                    }
                  </FormItem>
                  天
          </div>
        }
      }];
  }
  spuIdblur=(e,index)=> {
    let value =e.target.value;
    let { goodsList } =this.props;
    goodsList[index] = {
      key:2,
      SpuId:value,
      name:'MORPHY便携榨汁杯',
      displayName:'奶粉辅食',
      price:'¥4.00-9.00',
      qty:'B端在售库存',
      shop:'200',
      position:1,
    }
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
  }
  //重置表单
  resetGoodsForm=(index,dataSource)=> {
    let goods = this.props.form.getFieldValue('goods');
    console.log(goods)
    let dd = goods.filter((item,key) => key != index);
    console.log(dd)
    this.props.form.setFieldsValue({
      goods:dd,
    });
    console.log(this.props.form.getFieldValue('goods'))
    // this.countTotal(dataSource);
  }
  render() {
    const { goodsList } =this.props;
    console.log(goodsList)
    return(
      <div className="commodity-flow-goods-table-component">
        <BaseEditTable
          btnText="商品"
          resetForm={this.resetGoodsForm}
          columns={this.columns}
          dataSource={goodsList}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(GoodsTable);
// export default GoodsTable;

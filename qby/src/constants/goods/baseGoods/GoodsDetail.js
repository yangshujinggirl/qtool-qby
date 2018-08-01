import React,{ Component } from 'react';
import { Input,Form} from 'antd';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import {
  OnLineDetailSizeColumns,
  OnLineDetailColumns,
  OutLineDetailColumns,
  OutLineDetailSizeColumns
} from './columns/detailColumns';
import './AddGoods.less';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
//线下部分详情
const OutLinePartDetail =({pdSpu})=>(
  <div>
    <FormItem
      label="商品状态" {...formItemLayout}>
      <label>{pdSpu.spuStatus}</label>
    </FormItem>
    <FormItem
      label="销售属性" {...formItemLayout}>
      <label>{pdSpu.salesAttr}</label>
    </FormItem>
    <FormItem
      label="季节商品" {...formItemLayout}>
      <label>{pdSpu.isSeasonSpu}</label>
    </FormItem>
    <FormItem
      label="上市开始时间" {...formItemLayout}>
      <label>{pdSpu.listTimeStart}</label>
    </FormItem>
    <FormItem
      label="上市结束时间" {...formItemLayout}>
      <label>{pdSpu.listTimeEnd}</label>
    </FormItem>
    <FormItem
      label="批次管理" {...formItemLayout}>
      <label>{pdSpu.lotStatus}</label>
    </FormItem>
    <FormItem
      label="保质期" {...formItemLayout}>
      <label>{pdSpu.expdays}</label>
    </FormItem>
    <FormItem
      label="保质依据" {...formItemLayout}>
      <label>{pdSpu.lotType}</label>
    </FormItem>
    <FormItem
      label="禁止入库" {...formItemLayout}>
      <label>{pdSpu.lotLimitInDay}</label>
    </FormItem>
    <FormItem
      label="分成类别" {...formItemLayout}>
      <label>{pdSpu.shareType}</label>
    </FormItem>
  </div>
)
//线上部分详情
const OnLinePartDetail =({pdSpu}) =>(
  <div>
    <FormItem
      label="保税仓库" {...formItemLayout}>
      <label>{pdSpu.warehouseId}</label>
    </FormItem>
    <FormItem
      label="分成比例" {...formItemLayout}>
      <label>{pdSpu.shareRatio}</label>
    </FormItem>
  </div>
)

class GoodsDetail extends Component {

  componentDidMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'baseGoodsDetail/fetchGoodsInfo',
      payload:{
        pdSpuId,
        source
      }
    })
  }
  render() {
    const { pdSpu, pdSkus, fileList } = this.props.baseGoodsDetail;
    console.log(pdSkus)
    return(
      <div className="basegoods-detail-components">
        <Form>
    			<FormItem label="商品名称" {...formItemLayout}>
            <label>{pdSpu.name}</label>
    			</FormItem>
    			<FormItem label="一级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory1Name}</label>
    			</FormItem>
    			<FormItem label="二级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory2Name}</label>
    			</FormItem>
    			<FormItem label="三级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory3Name}</label>
    			</FormItem>
    			<FormItem label="四级分类" {...formItemLayout}>
            <label>{pdSpu.pdCategory4Name}</label>
    			</FormItem>
    			<FormItem label="品牌" {...formItemLayout}>
            <label>{pdSpu.pdBrand&&pdSpu.pdBrand.name}</label>
    			</FormItem>
    			<FormItem label="国家地区" {...formItemLayout}>
            <label>{pdSpu.ipdCountry&&pdSpu.ipdCountry.name}</label>
    			</FormItem>
    			<FormItem label="商品图片" {...formItemLayout}>
              <ul className="img-list-wrap">
                {
                  fileList.length>0&&
                  fileList.map((el,index) => (
                    <li className="img-item" key={index}>
                      <img src={el.url}/>
                    </li>
                  ))
                }
              </ul>
    			</FormItem>
          {
            this.props.data.source == 1?
            <div>
              <FormItem label="商品信息" {...formItemLayout2}>
                <Qtable
                  columns={pdSpu.isSkus?OnLineDetailSizeColumns:OnLineDetailColumns}
                  dataSource={pdSkus}/>
              </FormItem>
              <OnLinePartDetail pdSpu={pdSpu}/>
            </div>
            :
            <div>
              <FormItem label="商品信息" {...formItemLayout2}>
                <Qtable
                  columns={pdSpu.isSkus?OutLineDetailSizeColumns:OutLineDetailColumns}
                  dataSource={pdSkus}/>
              </FormItem>
              <OutLinePartDetail pdSpu={pdSpu}/>
            </div>
          }
    		</Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { baseGoodsDetail } = state;
  return { baseGoodsDetail };
}

export default connect(mapStateToProps)(GoodsDetail);

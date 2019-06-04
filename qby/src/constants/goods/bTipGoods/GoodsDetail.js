import React,{ Component } from 'react';
import { Input,Form} from 'antd';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns';
import Imgmodel from '../../../components/model/modelimg';
import './AddGoods.less'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 6
  }
};
const formItemLayout2 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
};
const formItemLayout3 = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
class GoodsDetail extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'bTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId,
        source
      },
      callback:null
    })
  }

  render() {
    const { pdSpu, fileList } = this.props.bTipAddGoods;
    return(
      <div className="btip-add-goods-components">
        <Form>
          <FormItem label="SPU ID" {...formItemLayout}>
            <label>{pdSpu.pdSpuId}</label>
    			</FormItem>
    			<FormItem
    				label="商品名称" {...formItemLayout}>
            <label>{pdSpu.name}</label>
    			</FormItem>
    			<FormItem
    				label="B端名称" {...formItemLayout}>
            <label>{pdSpu.bname}</label>
    			</FormItem>
    			<FormItem
    				label="一级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory1Name}</label>
    			</FormItem>
    			<FormItem
    				label="二级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory2Name}</label>
    			</FormItem>
    			<FormItem
    				label="商品图片" {...formItemLayout3}>
            <ul className="img-list-wrap">
              {
                fileList.length>0&&
                fileList.map((el,index) => (
                  <li className="img-item" key={index}>
                    <Imgmodel picUrl={el.name}/>
                  </li>
                ))
              }
            </ul>
    			</FormItem>
    			<FormItem
    				label="商品信息" {...formItemLayout2}>
            <Qtable
              columns={pdSpu.isSkus?DetailSizeColumns:DetailColumns}
              dataSource={pdSpu.pdSkus}/>
    			</FormItem>
    			<FormItem
    				label="箱规销售" {...formItemLayout}>
            <label>{pdSpu.containerSpec}</label>
    			</FormItem>
          <FormItem
            label="上新商品" {...formItemLayout}>
            <label>{pdSpu.eventNew?'是':'否'}</label>
          </FormItem>
          <FormItem
            label="畅销商品" {...formItemLayout}>
            <label>{pdSpu.eventHot?'是':'否'}</label>
          </FormItem>
          <FormItem
            label="直邮商品" {...formItemLayout}>
            <label>{pdSpu.isDirectExpress?'是':'否'}</label>
          </FormItem>
          <FormItem
            label="预售商品" {...formItemLayout}>
            <label>{pdSpu.isPresell?'是':'否'}</label>
          </FormItem>
          <FormItem
            label="试销天数" {...formItemLayout}>
            <label>{pdSpu.trialDay}天</label>
          </FormItem>
          <FormItem
            label="缺货天数" {...formItemLayout}>
            <label>{pdSpu.outStockDay}天</label>
          </FormItem>
          <FormItem
            label="缺货率" {...formItemLayout}>
            <label>{pdSpu.outStockRate&&`${pdSpu.outStockRate}%`}</label>
          </FormItem>
          <FormItem
            label="目标周转天数" {...formItemLayout}>
            <label>{pdSpu.targetTurnoverDay}天</label>
          </FormItem>
          <FormItem
            label="商品描述" {...formItemLayout}>
              <ul className="goods-desc-wrap">
                {
                  pdSpu.pdSpuInfo&&pdSpu.pdSpuInfo.length>0&&
                  pdSpu.pdSpuInfo.map((el,index) => (
                    <li key={index} className="desc-item">
                      {
                        el.type == '1'?
                        <span>{el.content}</span>
                        :
                        <Imgmodel picUrl={el.content}/>
                      }
                    </li>
                  ))
                }
              </ul>
          </FormItem>
    		</Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { bTipAddGoods } = state;
  return { bTipAddGoods };
}

export default connect(mapStateToProps)(GoodsDetail);

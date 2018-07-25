import React,{ Component } from 'react';
import { Input,Form} from 'antd';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns';
import './AddGoods.less'
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
    span: 12
  }
};
class GoodsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
			dataSource:[],
			issku:false,
			spuIdPics:[],
			pdSpuInfo:[],
      pdSkus:[]
		};
  }
  componentWillMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'cTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId,
        source
      }
    })

  }
  render() {
    const { pdSpu } = this.props.cTipAddGoods;
    return(
      <div>
        <Form>
    			<FormItem
    				label="商品名称" {...formItemLayout}>
            <label>{pdSpu.name}</label>
    			</FormItem>
    			<FormItem
    				label="B端名称" {...formItemLayout}>
            <label>{pdSpu.name}</label>
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
    				label="商品图片" {...formItemLayout}>
            {
              pdSpu.spuPics&&pdSpu.spuPics.length>0&&
              <ul className="img-list-wrap">
                <li className="img-item"></li>
                <li className="img-item"></li>
              </ul>
            }
    			</FormItem>
    			<FormItem
    				label="商品信息" {...formItemLayout2}>
            <Qtable columns={DetailColumns} dataSource={pdSpu.pdSkus}/>
    			</FormItem>
    			<FormItem
    				label="箱规销售" {...formItemLayout}>
            <label>{pdSpu.containerSpec}</label>
    			</FormItem>
          <FormItem
            label="上新商品" {...formItemLayout}>
            <label>{pdSpu.isNew}</label>
          </FormItem>
          <FormItem
            label="畅销商品" {...formItemLayout}>
            <label>{pdSpu.isHot}</label>
          </FormItem>
          <FormItem
            label="直邮商品" {...formItemLayout}>
            <label>{pdSpu.isDirectExpress}</label>
          </FormItem>
          <FormItem
            label="预售商品" {...formItemLayout}>
            <label>{pdSpu.isPresell}</label>
          </FormItem>
          <FormItem
            label="试销天数" {...formItemLayout}>
            <label>{pdSpu.trialDay}</label>
          </FormItem>
          <FormItem
            label="缺货天数" {...formItemLayout}>
            <label>{pdSpu.outStockDay}</label>
          </FormItem>
          <FormItem
            label="缺货率" {...formItemLayout}>
            <label>{pdSpu.outStockRate}</label>
          </FormItem>
          <FormItem
            label="目标周转天数" {...formItemLayout}>
            <label>{pdSpu.targetTurnoverDay}</label>
          </FormItem>
          <FormItem
            label="商品描述" {...formItemLayout}>
            <label>{pdSpu.pdSpuInfo}</label>
          </FormItem>
    		</Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { cTipAddGoods } = state;
  return { cTipAddGoods };
}

export default connect(mapStateToProps)(GoodsDetail);

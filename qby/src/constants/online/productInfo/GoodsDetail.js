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
  componentWillMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'productEditGoods/fetchGoodsInfo',
      payload:{spuId:pdSpuId}
    })
  }
  render() {
    const { iPdSpu, fileList } = this.props.productEditGoods;
    return(
      <div className="btip-add-goods-components">
        <Form>
          <FormItem label="SPU ID" {...formItemLayout}>
            <label>{iPdSpu.pdSpuId}</label>
    			</FormItem>
    			<FormItem label="商品名称" {...formItemLayout}>
            <label>{iPdSpu.name}</label>
    			</FormItem>
    			<FormItem label="电商名称" {...formItemLayout}>
            <label>{iPdSpu.oname}</label>
    			</FormItem>
          <FormItem label="商品图片" {...formItemLayout}>
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
    			<FormItem label="一级分类" {...formItemLayout}>
    				<label>{iPdSpu.pdCategory1Name}</label>
    			</FormItem>
    			<FormItem label="二级分类" {...formItemLayout}>
    				<label>{iPdSpu.pdCategory2Name}</label>
    			</FormItem>
    			<FormItem label="商品信息" {...formItemLayout2}>
            <Qtable
              columns={iPdSpu.isSkus?DetailSizeColumns:DetailColumns}
              dataSource={iPdSpu.pdSkus}/>
    			</FormItem>
          <FormItem label="NEW商品" {...formItemLayout}>
            <div>{iPdSpu.eventNewO?'是':'否'}</div>
    			</FormItem>
          <FormItem label="HOT商品" {...formItemLayout}>
            <div>{iPdSpu.eventHotO?'是':'否'}</div>
    			</FormItem>
          <FormItem label="商品说明" {...formItemLayout}>
            {
              iPdSpu.pdExplain && iPdSpu.pdExplain.map(item=>(
                <div>{item.name}</div>
              ))
            }
    			</FormItem>

          <FormItem label="商品描述" {...formItemLayout}>
            <ul className="goods-desc-wrap">
              {
                iPdSpu.pdSpuInfo&&iPdSpu.pdSpuInfo.length>0&&
                iPdSpu.pdSpuInfo.map((el,index) => (
                  <li className="desc-item" key={index}>
                    {
                      el.type == 1?
                      <span>{el.content}</span>
                      :
                      <img src={el.content.url} style={{'width':'100px','height':'100px'}}/>
                    }
                  </li>
                ))
              }
            </ul>
          </FormItem>
          <FormItem label="商品备注1" {...formItemLayout}>
            <label>{iPdSpu.remark1}</label>
          </FormItem>
          <FormItem label="商品备注2" {...formItemLayout}>
            <label>{iPdSpu.remark2}</label>
          </FormItem>
          <FormItem label="商品备注3" {...formItemLayout}>
            <label>{iPdSpu.remark3}</label>
          </FormItem>
    		</Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { productEditGoods } = state;
  return { productEditGoods };
}

export default connect(mapStateToProps)(GoodsDetail);

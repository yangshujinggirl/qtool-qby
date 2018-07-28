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
  }
  componentWillMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'productEditGoods/fetchGoodsInfo',
      payload:{spuId:pdSpuId}
    })

  }

  render() {
    const { iPdSpu } = this.props.productEditGoods;
    return(
      <div>
        <Form>
    			<FormItem
    				label="商品名称" {...formItemLayout}>
            <label>{iPdSpu.name}</label>
    			</FormItem>
    			<FormItem
    				label="电商名称" {...formItemLayout}>
            <label>{iPdSpu.oname}</label>
    			</FormItem>
          <FormItem
    				label="商品图片" {...formItemLayout}>
            {
              iPdSpu.spuPics&&iPdSpu.spuPics.length>0&&
              <ul className="img-list-wrap">
                <li className="img-item"></li>
                <li className="img-item"></li>
              </ul>
            }
    			</FormItem>
    			<FormItem
    				label="一级分类" {...formItemLayout}>
    				<label>{iPdSpu.pdCategory1&&iPdSpu.pdCategory1.name}</label>
    			</FormItem>
    			<FormItem
    				label="二级分类" {...formItemLayout}>
    				<label>{iPdSpu.pdCategory2&&iPdSpu.pdCategory2.name}</label>
    			</FormItem>
    			<FormItem
    				label="商品信息" {...formItemLayout2}>
            <Qtable columns={DetailColumns} dataSource={iPdSpu.pdSkus}/>
    			</FormItem>
          <FormItem
            label="商品描述" {...formItemLayout}>
            <ul className="img-list-wrap">
              {
                iPdSpu.pdSpuInfo&&iPdSpu.pdSpuInfo.length>0&&
                iPdSpu.pdSpuInfo.map((el,index) => (
                  <li className="img-item" key={index}>
                    {
                      el.type == 1?
                      <span>{el.content}</span>
                      :
                      <img src={el.content} style={{'width':'100px','height':'100px'}}/>
                    }
                  </li>
                ))
              }
            </ul>
          </FormItem>
          <FormItem
            label="商品备注1" {...formItemLayout}>
            <label>{iPdSpu.remark1}</label>
          </FormItem>
          <FormItem
            label="商品备注2" {...formItemLayout}>
            <label>{iPdSpu.remark2}</label>
          </FormItem>
          <FormItem
            label="商品备注3" {...formItemLayout}>
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

import React,{ Component } from 'react';
import { Input,Form} from 'antd';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import {
  DetailColumns,
  DetailSizeColumns,
  DetailDeliveryColumns,
  SizeDeliveryColumns} from './columns/detailColumns';
import Imgmodel from '../../../components/model/modelimg';
import AddGoodsDesc from '../components/AddGoodsDesc/index.js';
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
    this.initPage()
  }
  initPage() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'cTipAddGoods/fetchGoodsInfo',
      payload:{
        spuId:pdSpuId
      },
      callback:null
    })
  }
  render() {
    const fileDomain = sessionStorage.getItem('fileDomain');
    const { pdSpu, fileList } = this.props.cTipAddGoods;
    console.log(pdSpu)
    return(
      <div className="btip-add-goods-components">
        <Form>
          <FormItem label="SPU ID" {...formItemLayout}>
            <label>{pdSpu.pdSpuId}</label>
    			</FormItem>
    			<FormItem label="商品名称" {...formItemLayout}>
            <label>{pdSpu.name}</label>
    			</FormItem>
    			<FormItem label="C端名称" {...formItemLayout}>
            <label>{pdSpu.cname}</label>
    			</FormItem>
          <FormItem label="商品图片" {...formItemLayout3}>
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
    				<label>{pdSpu.pdCategory1Name}</label>
    			</FormItem>
    			<FormItem label="二级分类" {...formItemLayout}>
    				<label>{pdSpu.pdCategory2Name}</label>
    			</FormItem>
    			<FormItem label="商品信息" {...formItemLayout2}>
            <Qtable
              columns={
                pdSpu.isSkus
                ?
                (pdSpu.brandDirectMail ? SizeDeliveryColumns : DetailSizeColumns)
                :
                (pdSpu.brandDirectMail ? DetailDeliveryColumns : DetailColumns)
              }
              dataSource={pdSpu.pdSkus}/>
    			</FormItem>
          <FormItem label="NEW商品" {...formItemLayout}>
            <label>{pdSpu.eventNewc?'是':'否'}</label>
          </FormItem>
          <FormItem label="HOT商品" {...formItemLayout}>
            <label>{pdSpu.eventHotc?'是':'否'}</label>
          </FormItem>
          <FormItem label="商品说明" {...formItemLayout}>
            {
              pdSpu.pdExplain && pdSpu.pdExplain.map(item=>(
                <p>{item.name}</p>
              ))
            }
          </FormItem>
          <FormItem label="品牌直供" {...formItemLayout}>
            <label>{pdSpu.brandDirectMail?'是':'否'}</label>
          </FormItem>
          {
            pdSpu.brandDirectMail
            ?
            <FormItem label="配送说明" {...formItemLayout}>
              <label>品牌方直邮，预计{pdSpu.deliveryExplain}工作日内发货</label>
            </FormItem>
            :''
          }
          <FormItem label="商品描述" {...formItemLayout}>
            <ul className="goods-desc-wrap">
              {
                pdSpu.pdSpuInfo&&pdSpu.pdSpuInfo.length>0&&
                pdSpu.pdSpuInfo.map((el,index) => (
                  <li className="desc-item" key={index}>
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
  const { cTipAddGoods } = state;
  return { cTipAddGoods };
}

export default connect(mapStateToProps)(GoodsDetail);

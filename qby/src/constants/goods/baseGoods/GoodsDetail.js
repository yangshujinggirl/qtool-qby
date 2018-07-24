import React,{ Component } from 'react';
import { Input,Form} from 'antd';
import { connect } from 'dva';
import Qtable from '../../../components/Qtable';
import { DetailColumns, DetailSizeColumns} from './columns/detailColumns'
const FormItem = Form.Item;

class GoodsDetail extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const { pdSpuId, source } =this.props.data;
    this.props.dispatch({
      type:'addGoods/fetchGoodsInfo',
      payload:{
        pdSpuId,
        source
      }
    })

  }
  render() {
    const { pdSpu, pdSkus } = this.props.addGoods;
    return(
      <div>
        <Form>
    			<FormItem
    				label="商品名称"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 6 }}>
            <label>{pdSpu.name}</label>
    			</FormItem>
    			<FormItem
    				label="一级分类"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 6 }}>
    				<label>{pdSpu.pdCategory1Name}</label>
    			</FormItem>
    			<FormItem
    				label="二级分类"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 6 }}
    				className='parentinput'
    			>
    				<label>{pdSpu.pdCategory2Name}</label>
    			</FormItem>
    			<FormItem
    				label="三级分类"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 6 }}>
    				<label>{pdSpu.pdCategory3Name}</label>
    			</FormItem>
    			<FormItem
    				label="四级分类"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>{pdSpu.pdCategory4Name}</label>
    			</FormItem>
    			<FormItem
    				label="品牌"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>{pdSpu.pdBrandName}</label>
    			</FormItem>
    			<FormItem
    				label="国家地区"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>{pdSpu.pdCountryBrandName}</label>
    			</FormItem>
    			<FormItem
    				label="商品图片"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            {
              pdSpu.spuPics&&pdSpu.spuPics.length>0&&
              <div className="godds-pic-list-wrap">
                图片占位
              </div>
            }

    			</FormItem>
    			<FormItem
    				label="商品规格"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>1234567</label>
    			</FormItem>
    			<FormItem
    				label="商品规格"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>1234567</label>
    			</FormItem>
    			<FormItem
    				label="商品信息"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <Qtable columns={DetailColumns} dataSource={pdSkus}/>
    			</FormItem>
    			<FormItem
    				label="商品状态"
    				labelCol={{ span: 8 }}
    				wrapperCol={{ span: 16 }}>
            <label>1234567</label>
    			</FormItem>
          {
            this.props.data.source =='1' ?
            <div>
              <FormItem
        				label="保税仓库"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.warehouseId}</label>
        			</FormItem>
        			<FormItem
        				label="分成比例"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.shareRatio}</label>
        			</FormItem>
            </div>
            :
            <div>
        			<FormItem
        				label="商品状态"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.spuStatus}</label>
        			</FormItem>
        			<FormItem
        				label="销售属性"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.salesAttr}</label>
        			</FormItem>
        			<FormItem
        				label="季节商品"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.isSeasonSpu}</label>
        			</FormItem>
        			<FormItem
        				label="上市开始时间"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.listTimeStart}</label>
        			</FormItem>
        			<FormItem
        				label="上市结束时间"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.listTimeEnd}</label>
        			</FormItem>
        			<FormItem
        				label="批次管理"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.lotStatus}</label>
        			</FormItem>
        			<FormItem
        				label="保质期"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.expdays}</label>
        			</FormItem>
        			<FormItem
        				label="保质依据"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.lotType}</label>
        			</FormItem>
        			<FormItem
        				label="禁止入库"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.lotLimitInDay}</label>
        			</FormItem>
        			<FormItem
        				label="分成类别"
        				labelCol={{ span: 8 }}
        				wrapperCol={{ span: 16 }}>
                <label>{pdSpu.shareType}</label>
        			</FormItem>
            </div>
          }
    		</Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { addGoods } = state;
  return { addGoods };
}

export default connect(mapStateToProps)(GoodsDetail);

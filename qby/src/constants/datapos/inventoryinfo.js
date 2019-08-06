import { GetServerData } from "../../services/services";
import { connect } from "dva";
import EditableTable from "../../components/table/tablebasic";
import Cardlist from "../../components/table/cardlist";
import {
  getGoodsInfoApi,
  getLogoInfoApi
} from "../../services/datapos/inventory";

class InventoryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.column = [
      {
        title: "商品条码",
        dataIndex: "barcode"
      },
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品规格",
        dataIndex: "displayName"
      },
      {
        title: "系统数量",
        dataIndex: "invQty"
      },
      {
        title: "盘点数量",
        dataIndex: "checkQty"
      },
      {
        title: "盘点差异",
        dataIndex: "diffQty"
      }
    ];

    this.column1 = [
      {
        title: "操作记录",
        dataIndex: "action"
      },
      {
        title: "操作人",
        dataIndex: "operater"
      },
      {
        title: "操作时间",
        dataIndex: "operateTime"
      }
    ];
    this.state = {
      headTit: [],
      details: [],
      pdSpus: [],
      checkRecords: [],
      limit: 15,
      currentPage: 1,
      total: 0
    };
  }
  componentDidMount() {
    this.infofetch();
  }
  //请求信息
  infofetch = () => {
    const { id, checkNo } = this.props.data;
    this.props.dispatch({ type: "tab/loding", payload: true });
    this.getLogoInfo(checkNo);
    this.getGoodInfo(id,0,15);
    this.props.dispatch({ type: "tab/loding", payload: false });
  };
  //日志
  getLogoInfo = checkNo => {
    getLogoInfoApi({ checkNo }).then(res => {
      if (res.code == "0") {
        const { checkNo, skuSum, qty, operater, operateTime } = this.props.data;
        const checkRecords = res.checkRecords.map((item,index)=>{
          item.key = index ;
          return item;
        });
        const headTit = [
          {
            lable: "订单号",
            text: checkNo
          },
          {
            lable: "盘点SKU数量",
            text: skuSum
          },
          {
            lable: "盘点商品数量",
            text: qty
          },
          {
            lable: "创建人",
            text: operater
          },
          {
            lable: "创建时间",
            text: operateTime
          }
        ];
        this.setState({
          checkRecords,
          headTit: headTit
        });
      }
    });
  };
  //商品信息
  getGoodInfo = (checkId,currentPage,limit) => {
    getGoodsInfoApi({ checkId,currentPage,limit }).then(res => {
      if (res.code == "0") {
        let {checkdetails,limit,currentPage,total} = res;
        const pdSpus = checkdetails.map((item,index)=>{ 
          item.key = index;
          return item;
        });
        this.setState({
          pdSpus,
          limit,
          currentPage:currentPage+1,
          total
        });
      };
    });
  };
  pageChange=(currentPage,limit)=>{
    const {id} = this.props.data;
    this.setState({
      currentPage,
      limit
    });
    const current = currentPage - 1;
    this.getGoodInfo(id,current,limit)
  }
  pageSizeChange=(currentPage,limit)=>{
    const {id} = this.props.data;
    this.setState({
      currentPage,
      limit
    });
    this.getGoodInfo(id,currentPage,limit)
  }
  render() {
    const {headTit,pdSpus,checkRecords,limit,currentPage,total} = this.state;
    return (
      <div>
        <div className="mb10">
          <Cardlist cardtitle="商品盘点信息" cardlist={headTit} />
        </div>
        <div className="mb10">
          <EditableTable
            columns={this.column}
            dataSource={pdSpus}
            title="商品信息"
            bordered={true}
            footer={true}
            limit={limit}
            current={currentPage}
            total={total}
            pageChange={this.pageChange}
            pageSizeChange={this.pageSizeChange}
          />
        </div>
        <div className="mb10">
          <EditableTable
            columns={this.column1}
            dataSource={checkRecords}
            title="订单日志"
            bordered={true}
            footer={false}
          />
        </div>
      </div>
    );
  }
}

export default connect()(InventoryInfo);

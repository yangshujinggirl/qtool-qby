const StatusOption = [{
          key:1,//1启用，2关闭
          value:'启用'
        },
        {
          key:0,
          value:'关闭'
      }]
const NumberOption = [{
          key:1,//1启用，2关闭
          value:'是'
        },
        {
          key:0,
          value:'否'
      }]
const LotStatusOption = [{
          key:1,//1启用，2关闭
          value:'开启'
        },
        {
          key:0,
          value:'关闭'
      }]
const BooleanOption = [{
          key:true,//1启用，2关闭
          value:'是'
        },
        {
          key:false,
          value:'否'
      }]
//保税仓库
const WarehouseOption = [{
          key:1,
          value:'杭州下沙保税'
        },
        {
          key:2,
          value:'重庆丰趣保税'
        },
        {
          key:3,
          value:'香港天弋丽直邮'
        },
        {
          key:4,
          value:'知识付费'
        },
        {
          key:5,
          value:'德国直邮'
        },
        {
          key:6,
          value:'杭州学月保税'
        }]
//保税状态
const GoosStatusOption = [{
          key:1,
          value:'初始化商品'
        },
        {
          key:2,
          value:'新商品'
        },
        {
          key:3,
          value:'正常商品'
        },
        {
          key:4,
          value:'待淘汰商品'
        },
        {
          key:5,
          value:'淘汰商品'
        },
        {
          key:6,
          value:'删除商品'
        }]
//保税状态
const SalePropertyOption = [{
          key:1,
          value:'待观察商品'
        },
        {
          key:2,
          value:'畅销商品'
        },
        {
          key:3,
          value:'滞销商品'
        }]


export default {
  NumberOption,
  BooleanOption,
  StatusOption,
  WarehouseOption,
  GoosStatusOption,
  SalePropertyOption,
  LotStatusOption
}

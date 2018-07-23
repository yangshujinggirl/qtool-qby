
const FirstSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'one',
   },{
     title: '一级分类状态',
     dataIndex: 'status1'
   },{
     title: '操作',
     dataIndex: 'receivePrice',
     render:(text,record,index)=>{
       return <p onClick={()=>record.onOperateClick(record)}>修改</p>
     }
   }];
const SecondSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'one',
   },{
     title: '二级分类名称',
     dataIndex: 'two',
   },{
     title: '二级分类状态',
     dataIndex: 'status2'
   },{
     title: '操作',
     dataIndex: 'receivePrice'
   }];
const ThrSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'one',
   },{
     title: '二级分类名称',
     dataIndex: 'two',
   },{
     title: '三级分类名称',
     dataIndex: 'thr'
   },{
     title: '三级分类状态',
     dataIndex: 'status3'
   },{
     title: '操作',
     dataIndex: 'receivePrice'
   }];
const FourSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'one',
   },{
     title: '二级分类名称',
     dataIndex: 'two',
   },{
     title: '三级分类名称',
     dataIndex: 'thr'
   }, {
     title: '四级分类名称',
     dataIndex: 'four'
   },{
     title: '四级分类状态',
     dataIndex: 'status4'
   },{
     title: '操作',
     dataIndex: 'receivePrice'
   }];

export default {
  FirstSortColumns,
  SecondSortColumns,
  ThrSortColumns,
  FourSortColumns
};

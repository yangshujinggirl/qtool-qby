import { Button } from 'antd';

const FirstSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'name',
   },{
     title: '一级分类状态',
     dataIndex: 'statusStr'
   },{
     title: '操作',
     dataIndex: 'receivePrice',
     render:(text,record,index)=>{
       return <p
         className="theme-color pointer"
         onClick={()=>record.onOperateClick()}>修改</p>
     }
   }];
const SecondSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'name1',
   },{
     title: '二级分类名称',
     dataIndex: 'name',
   },{
     title: '二级分类状态',
     dataIndex: 'statusStr'
   },{
     title: '操作',
     dataIndex: 'receivePrice',
     render:(text,record,index)=>{
       return <p
               className="theme-color pointer"
               onClick={()=>record.onOperateClick()}>修改</p>
     }
   }];
const ThrSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'name1',
   },{
     title: '二级分类名称',
     dataIndex: 'name2',
   },{
     title: '三级分类名称',
     dataIndex: 'name'
   },{
     title: '三级分类状态',
     dataIndex: 'statusStr'
   },{
     title: '操作',
     dataIndex: 'receivePrice',
     render:(text,record,index)=>{
       return <p
         className="theme-color pointer"
         onClick={()=>record.onOperateClick()}>修改</p>
     }
   }];
const FourSortColumns = [{
     title: '一级分类名称',
     dataIndex: 'name1',
   },{
     title: '二级分类名称',
     dataIndex: 'name2',
   },{
     title: '三级分类名称',
     dataIndex: 'name3'
   }, {
     title: '四级分类名称',
     dataIndex: 'name'
   },{
     title: '四级分类状态',
     dataIndex: 'statusStr'
   },{
     title: '操作',
     dataIndex: 'receivePrice',
     render:(text,record,index)=>{
       return <p
         className="theme-color pointer"
         onClick={()=>record.onOperateClick()}>修改</p>
     }
   }];

export default {
  FirstSortColumns,
  SecondSortColumns,
  ThrSortColumns,
  FourSortColumns
};

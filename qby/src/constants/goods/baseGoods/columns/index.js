
const Columns = [{
     title: '操作类型',
     dataIndex: 'actionTypeStrr',
   },{
     title: '操作描述',
     dataIndex: 'operationTypeStrr',
     render:(text, record, index)=> {
       return record.operationTypeStrr;
     }
   }, {
     title: '操作时间',
     dataIndex: 'createTime'
   },{
     title: '操作人',
     dataIndex: 'urUserId'
   }];

   export default Columns;

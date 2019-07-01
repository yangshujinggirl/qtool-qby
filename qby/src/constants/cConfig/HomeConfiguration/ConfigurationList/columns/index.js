import { Button } from 'antd';

const IndexColumns = [
  {
     title: '版本名称',
     dataIndex: 'name',
   },{
     title: '版本编码',
     dataIndex: 'code',
     width:'15%',
   },{
     title: '发布时间',
     dataIndex: 'stime',
   }, {
     title: '最后修改时间',
     dataIndex: 'etime',
   },{
     title: '最后修改人',
     dataIndex: 'auth',
   },{
     title: '当前版本状态',
     dataIndex: 'status',
   },{
     title: '操作',
     dataIndex: 'action',
     render:(text, record, index)=> {
       return <div>
              {
                record.btnList&&
                record.btnList.map((el,index)=>(
                  <span
                  className="action-btn"
                  onClick={()=>record.onOperateClick(el.type)}
                  key={index}>
                    {el.name}
                  </span>
                ))
              }
             </div>
     }
   }];
export default {
 IndexColumns
};

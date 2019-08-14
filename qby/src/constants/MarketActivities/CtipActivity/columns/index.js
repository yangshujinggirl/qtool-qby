const columnsIndex=[
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
  },{
    title: '活动ID',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '活动类型',
    dataIndex: 'type',
    key: 'type',
  },{
    title: '活动时间',
    dataIndex: 'time',
    key: 'time',
  },{
    title: '活动状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '发起人',
    dataIndex: 'user',
    key: 'user',
  },{
    title: '操作',
    dataIndex: 'opreation',
    key: 'opreation',
    render:(text,record,index) => {
      return(
        <div className="list-handle-opreation">
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('info')}>查看</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('edit')}>编辑</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('delete')}>删除</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('cancel')}>撤销审核</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('zuofei')}>作废</span>
          <span className="theme-color table-btn-item" onClick={()=>record.onOperateClick('forcedEnd')}>强制结束</span>
        </div>
      )
    }
  },];

export {
  columnsIndex
}

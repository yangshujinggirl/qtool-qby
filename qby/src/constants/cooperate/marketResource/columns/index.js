 const Columns = [
    {
        title:'联系人',
        dataIndex:'accountName',
        render: (text,record) => {
            return(
                <a href='javascript:;'>{text}</a>
            )
        },
    },
    {
        title:'联系电话',
        dataIndex:'contactTel'
    },
    {
        title:'公司名称',
        dataIndex:'companyName'
    },
    {
        title:'部门',
        dataIndex:'department'
    },
    {
        title:'职位',
        dataIndex:'position'
    },
    {
        title:'资源类型',
        dataIndex:'type'
    },
    {
        title:'操作',
        dataIndex:'operate'
    }
]
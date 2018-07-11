 const Columns = [{
    title:'联系人',
    dataIndex:'contact',
    render: (text,record) => {
        return(
            <a href='javascript:;'>{text}</a>
        )
    }
}

]
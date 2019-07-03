export function columns(form){
  // console.log(props)
  // const { form } =props;
  // console.log(props)
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align:'center',
      width:'6%',
      render:(text,record,index)=> {
        index++;
        return <span>{index}</span>
      }
    }, {
      title: 'banner图片',
      dataIndex: 'SpuId',
      key: 'SpuId',
      align:'center',
      width:'10%',
      // render:(text,record,index)=> {
      //   return <UpLoadImg
      //           form={this.props.form}
      //           index={index}/>
      // }
    }, {
      title: 'bannerID',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      width:'8%',
    }, {
      title: 'banner名称',
      dataIndex: 'displayName',
      key: 'displayName',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].name`,{
                  initialValue:record.name
                })(
                  <Input
                    placeholder="请输入名称"
                    autoComplete="off"/>
                  )
                }
              </FormItem>
      }
    }, {
      title: '适用端*',
      dataIndex: 'platform',
      key: 'platform',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        return <FormItem>
           {getFieldDecorator(`goods[${index}].platform`)(
             <Select
               placeholder="请选择平台"
               allowClear={true}>
               <Select.Option
                 value={0}
                 key={0}>小程序</Select.Option>
               <Select.Option
                 value={1}
                 key={1}>App</Select.Option>
               <Select.Option
                 value={2}
                 key={2}>小程序+App</Select.Option>
             </Select>
           )}
           </FormItem>
      }
    }, {
      title: '跳转链接',
      dataIndex: 'link',
      key: 'shop',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =form;
        // console.log(this.props.form.getFieldValue('goods'));
        return <FormItem>
           {getFieldDecorator(`goods[${index}].link`)(
             <Select
               placeholder="请选择平台"
               allowClear={true}>
               <Select.Option
                 value={0}
                 key={0}>小程序</Select.Option>
               <Select.Option
                 value={1}
                 key={1}>App</Select.Option>
               <Select.Option
                 value={2}
                 key={2}>小程序+App</Select.Option>
             </Select>
           )}
           </FormItem>
      }
    },  {
      title: 'URL链接',
      dataIndex: 'url',
      key: 'url',
      align:'center',
      width:'15%',
      render:(text,record,index)=> {
        const { getFieldDecorator } =this.props.form;
        return <FormItem>
                {getFieldDecorator(`goods[${index}].url`,{
                  initialValue:record.url
                })(
                  <Input
                    placeholder="请输入url"
                    autoComplete="off"/>
                  )
                }
              </FormItem>
      }
    }, {
      title: '开始时间',
      dataIndex: 'stime',
      key: 'stime',
      align:'center',
      width:'8%',
    },{
      title: '结束时间',
      dataIndex: 'etime',
      key: 'etime',
      align:'center',
      width:'8%',
      render:()=> {
        return <span>结束时间为下一张开始时间</span>
      }
    }]
}

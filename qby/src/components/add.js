


//输入框发生变化
textChange =(e,index)=> {
  let value = e.target.value;
  let { DescArr } = this.state;
  DescArr[index].content = value;
  this.setState({DescArr});
}
//删除图片/文本
deleteContent =(index)=> {
  let { DescArr } = this.state;
  DescArr.splice(index,1)
  this.setState({DescArr});
}

<FormItem
  {...formItemLayout}
  label='合作记录'
>
  <div>
    <Button
      style={{marginRight:'30px'}}
      onClick={()=>this.addContent('text')}
    >
      添加文本
    </Button>
    <Button onClick={()=>this.addContent('img')}>添加图片</Button>
  </div>
</FormItem>
<FormItem
  wrapperCol={{ offset:6 ,span: 8 }}
>
{
  DescArr.length>0?DescArr.map((item,index)=>{
    if(item.type=='1'){
      return(
        <div key={index} className='addForm'>
          <Input
            style={{width:'80%'}}
            value={item.content}
            placeholder='请输入'
            onChange={(e)=>this.textChange(e,index)}
          />
          <a
            style={{float:'right',color:'#35BAB0'}}
            onClick={()=>this.deleteContent(index)}
          >删除</ a>
        </div>
      )
    }else if(item.type == '2'){
      return(
        <div key={index} className='addForm'>
          <div>
            <Upload
              name='imgFile'
              showUploadList={false}
              action="/erpWebRest/qcamp/upload.htm?type=spu"
              listType="picture-card"
              onChange={(fileList)=>this.handleChange(fileList,index)}
            >
              {item.content ? <img src={fileDomain + item.content} style={{width:'102px',height:'102px'}} alt="avatar" /> : uploadButton}
            </Upload>
         </div>
          <a
            style={{float:'right',color:'#35BAB0',marginTop:'-80px'}}
            onClick={()=>this.deleteContent(index)}
          >删除
          </a>
        </div>
      )
    }
  }):null
}
</FormItem>

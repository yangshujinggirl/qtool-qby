import React, { Component } from 'react';
import { connect } from 'dva';
import { Tag, Input, Tooltip, Icon, message } from 'antd';

class Creatlabel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      judgeTags:[],//本地进行去重
      inputVisible: false,
      inputValue: '',
    }
  }
  saveInputRef = input => this.input = input
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  //关闭
  handleClose = (removedTag) => {
    const judgeTags = this.state.judgeTags.filter(judgeTags => judgeTags !== removedTag.name);
    this.setState({ judgeTags });
    this.props.deleteGoodsLabel&&this.props.deleteGoodsLabel(removedTag,this.props.level);
  }
  //新建
  handleInputConfirm = (e) => {
    const { inputValue } = this.state;
    let { judgeTags } = this.state;
    if (inputValue && judgeTags.indexOf(inputValue) === -1) {
      judgeTags = [...judgeTags, inputValue];
      this.props.addGoodsLabel(inputValue,this.props.level);
    } else {
      message.error('此属性已存在');
      return
    }
    this.setState({
      judgeTags,
      inputVisible: false,
      inputValue: '',
    });
  }


  render() {
    const { inputVisible, inputValue } = this.state;
    const tags = this.props.level=='one'?this.props.addGoods.specData.specOne:this.props.addGoods.specData.specTwo;
    return(
      <div>
        {
          tags.map((tag, index) => (
            <Tag
              key={tag.key}
              closable={true}
              afterClose={() => this.handleClose(tag)}>
              {tag.name}
            </Tag>
          ))
        }
        {
          inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )
        }
        {
          !inputVisible && (
            this.props.disabled?
            <Tag
              style={{ background: '#fff', borderStyle: 'dashed','cursor':'not-allowed' }}>
              <Icon type="plus"/>新建属性
            </Tag>
            :
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed',}}>
              <Icon type="plus"/>新建属性
            </Tag>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { addGoods } = state;
  return { addGoods};
}
export default connect(mapStateToProps)(Creatlabel);

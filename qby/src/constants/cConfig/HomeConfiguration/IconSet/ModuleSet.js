import React, { Component } from "react";
import { Form, Button, Input, Radio, Row, Col, Modal, message } from "antd";
import { getSaveModuleApi } from "../../../../services/cConfig/homeConfiguration/iconSet";
import { getModuleApi } from "../../../../services/cConfig/homeConfiguration/goodSet";
import { connect } from "dva";
const FormItem = Form.Item;

class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      moduleBackColor:'',
      titleColor:0
    };
  }
  componentDidMount=()=>{
    this.initPage()
  }
  initPage =()=> {
    const {homepageModuleId} = this.props;
    getModuleApi({homepageModuleId}).then(res=>{
      if(res.code == '0'){
        const {moduleBackColor,titleColor} = res.homepageModuleVo;
        this.setState({
          moduleBackColor,
          titleColor:Number(titleColor)
        })
      }
    })
  }
  lookExample = () => {
    this.setState({
      visible: true
    });
  };
  sendRequest = values => {
    getSaveModuleApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.setState({
          loading:false
        });
        this.props.callback()
      }
    });
  };
  handleSubmit = () => {
    this.setState({
      loading:true
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.homepageModuleId = this.props.homepageModuleId;
        this.sendRequest(values);
      }
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    console.log(this.props)
    const { visible,titleColor,moduleBackColor,loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <FormItem
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 5 }}
            label="设置模块背景色号"
          >
            {getFieldDecorator("moduleBackColor", {
              initialValue: moduleBackColor
            })(
              <Input
                style={{ width: "400px" }}
                placeholder="标题颜色的色号，常用色号可在示例中查看"
              />
            )}
            <p>请填写#+六位数字</p>
          </FormItem>
          <FormItem labelCol={{ span: 3 }} label="icon名称样式">
            {getFieldDecorator("titleColor", {
              rules: [{ required: true, message: "icon名称样式" }],
              initialValue: titleColor?titleColor:0
            })(
              <Radio.Group>
                <Radio value={0}>黑色</Radio>
                <Radio value={1}>白色</Radio>
              </Radio.Group>
            )}
            <a className="theme-color" onClick={this.lookExample}>
              查看示例
            </a>
          </FormItem>
          <Row>
            <Col offset={3}>
              <Button type="primary" loading={loading} onClick={this.handleSubmit}>
                保存设置
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img src={require('../../../../assets/ex1.png')} style={{width:'470px'}} />
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { tab } = state;
  return tab;
}
const ModuleSets = Form.create({})(ModuleSet)
export default connect(mapStateToProps)(ModuleSets);

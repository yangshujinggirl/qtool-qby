import { Button, Modal, Form, Input,Select } from 'antd';
import {GetServerData} from '../../../services/services';
import { connect } from 'dva';
import Avatar from './upload';


const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form,title,url} = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form>
                    <FormItem 
                        label="品牌图片"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                    {getFieldDecorator('url', {
                    })(
                        <Avatar imageUrl={url}/>
                    )}
                    </FormItem>

                <FormItem 
                    label="品牌名称"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入属性名称' }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem 
                    label="品牌状态"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <Select
                    >
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                    )}
                </FormItem>
                </Form>
            </Modal>
        );
    }
    );

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true },function(){
            this.setValues()
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, value) => {
        if (err) {
            return;
        }
        console.log(value)

        value.url=this.props.brandurl
        if(this.props.data.pdBrandId){
            value.pdBrandId=this.props.data.pdBrandId
        }

        const values={pdBrand:value}
        const result=GetServerData('qerp.web.pd.brand.save',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                form.resetFields();
                this.setState({ visible: false });
                this.props.dispatch({
                    type:'goods/brandfetch',
                    payload:{code:'qerp.web.pd.brand.list',values:{}}
                })

            }
        })


        
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    setValues=()=>{
        const brandurl=this.props.url
        const form = this.form;
        const data=this.props.data
        form.setFieldsValue({
            name:data.name,
            status:String(data.status)
        });
        this.props.dispatch({
            type:'goods/brandurl',
            payload:brandurl
        })
    }


  render() {
    return (
      <div style={{display:'inline-block'}}>
          { 
              this.props.type=='1'
              ?
              <div onClick={this.showModal} style={{color:'#35bab0',width:'122px',height:'82px'}}>
                <img src={this.props.fileDomain+this.props.url} className='w100 h100'/>
              </div>
              :
              <Button type={this.props.statetype} onClick={this.showModal}>{this.props.text}</Button>

          }
        
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          setValues={this.setValues}
          data={this.props.data}
          title={this.props.title}
          url={this.props.url}

        />
      </div>
    );
  }
}

function mapStateToProps(state) {
    const {pdBrands,brandurl} = state.goods;
    const {fileDomain} = state.IndexPage;
    return {pdBrands,fileDomain,brandurl};
}


export default connect(mapStateToProps)(CollectionsPage);


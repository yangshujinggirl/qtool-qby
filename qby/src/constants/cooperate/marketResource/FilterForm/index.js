import React, { Component } from 'react'
import{
    Form,
    Row,
    Col,
    Input,
    Button,
    Select
}from 'antd'
import '../index.css'
const FormItem = Form.Item;
const Option = Select.option;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

class NormalForm extends Component{
    render(){
        return(
            <div className='search'>
                <Form>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='联系人'>
                                <Input placeholder='请输入联系人'/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='联系电话'>
                                <Input placeholder='请输入联系人'/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='公司名称'>
                                <Input placeholder='请输入联系人'/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='资源类型'>
                                <Input placeholder='请输入联系人'/>
                            </FormItem>
                        </Col>
                        <Col className='submit'>
                            <FormItem {...formItemLayout}>
                                <Button type="primary">
                                    搜索
                                </Button>
                            </FormItem>
                        </Col>
                        </Row>
                    </Form>
                </div> 
            )
        }
    }

export default NormalForm
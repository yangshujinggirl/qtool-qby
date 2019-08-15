import React, { Component } from 'react';
import {Form,Input} from 'antd'
const FormItem = Form.Item
import './index.less'
class DiscountTwo extends Component {
    componentDidMount(){
        
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className='discountTwo'>
                <div className='step'>
                <Form>
                    <FormItem className='satified_price'>
                    阶梯：单笔订单满　
                        {
                            getFieldDecorator('111')(
                                <Input style={{'width':'150px'}}/>
                            )
                        } 元, 减　
                        <FormItem className='reduce_price'>
                        {
                            getFieldDecorator('11')(
                                <Input style={{'width':'150px'}}/>
                            )
                        }
                        
                        </FormItem>
                    </FormItem>
                </Form>
                </div>
            </div>
        );
    }
}
const DiscountTwos = Form.create({})(DiscountTwo)
export default DiscountTwos;
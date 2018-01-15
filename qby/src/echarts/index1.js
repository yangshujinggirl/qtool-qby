import React, { Component } from 'react';
import { DatePicker,Switch } from 'antd'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

// 引入 ECharts 主模块
var echarts = require('echarts');

class EchartsTest extends Component {
    state={
        xdata:['周一','周二','周三','周四','周五','周六','周日'],
        type:'1',
        data1:[11, 21, 15, 13, 12, 13, 10],
		data2:[1, 2, 2, 5, 3, 2, 0],
		data3:[7, 11, 15, 13, 12, 13, 10],
        data4:[3, 22, 2, 5, 3, 2, 0],
        startRpDate:null,
        endRpDate:null
    }


    hindChange=(date,dateString)=>{
        console.log(dateString)
    }

    checkonChange=(checked)=>{
        console.log(checked)
        this.setState({
            type:checked
        },function(){
            this.writeCall()
        })

    }
    
    //绘制
    writeCall=()=>{
        const xdata=this.state.xdata
        const data1=this.state.data1
        const data2=this.state.data2
        const data3=this.state.data3
        const data4=this.state.data4
        const type=this.state.type

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '门店销售趋势图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['掌柜销售','POS销售']
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: xdata
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:'掌柜销售',
                    type:'line',
                    data:type=='1'?data1:data3
                },
                {
                    name:'POS销售',
                    type:'line',
                    data:type=='1'?data2:data4
                }
            ]
        });
    }

    render() {
        return (
            <div>
                <RangePicker
                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                />
                <Switch checked={this.state.type=='1'?true:false} onChange={this.checkonChange.bind(this)} checkedChildren="销售数量" unCheckedChildren="销售金额"/>
                <div id="main" style={{ height: 400 }}></div>
            </div>
        );
    }
    componentDidMount() {
        // const values={startRpDate:this.state.startRpDate,endRpDate:this.state.endRpDate}
        // const result=GetServerData('qerp.web.sp.voucher.detail',values)
        // result.then((res) => {
        //     return res;
        // }).then((json) => {
        //     console.log(json)
        //     if(json.code=='0'){
        //         const shopSaleDatas=json.shopSaleDatas
		// 		const xdata=[]
		// 		const data1=[] 
		// 		const data2=[] 
		// 		const data3=[] 
		// 		const data4=[] 
		// 		for(var i=0;i<shopSaleDatas.length;i++){
		// 			xdata[i].push(shopSaleDatas[i].rpDateMd)
		// 			data1[i].push(shopSaleDatas[i].qbyQty) //掌柜数量
		// 			data2[i].push(shopSaleDatas[i].posQty) //pos数量
		// 			data3[i].push(shopSaleDatas[i].qbyAmount) //掌柜金额
		// 			data4[i].push(shopSaleDatas[i].posAmount) //pos金额
		// 		}

        //         this.setState({
        //             xdata:xdata,
        //             type:'1',
        //             data1:data1,
        //             data2:data2,
        //             data3:data3,
        //             data4:data4
        //         },function(){
        //             this.writeCall()
                        // this.props.dispatch({
                        //     type:'dataspsell/tablefetch',
                        //     payload:shopSaleDatas
                        // })

        //         })
        //     }
        // }) 


        this.writeCall()
    }

}



function mapStateToProps(state) {
    const {data1,data2,data3,data4,xdata} = state.dataspsell;
    return {data1,data2,data3,data4,xdata};
}

export default connect(mapStateToProps)(EchartsTest);
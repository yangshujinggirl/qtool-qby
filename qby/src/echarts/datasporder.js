import React, { Component } from 'react';
import { DatePicker,Switch } from 'antd'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';
import {timeForMat} from '../utils/meth';
import Clisklists from '../components/switchs/lrswa';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';

// 引入 ECharts 主模块
var echarts = require('echarts');

// var echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/line');
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

class EchartsTest extends Component {
    state={
        xdata:[],
        type:'1',
        data1:[],
		data2:[],
        startDate:null,
        endDate:null,
    }


    hindChange=(date,dateString)=>{
        this.setState({
            startDate:dateString[0],
            endDate:dateString[1],
        },function(){
            const values={startDate:this.state.startDate,endDate:this.state.endDate}
            this.fetdraw(values)
        })
    }

    checkonChange1=()=>{
        this.setState({
            type:1
        },function(){
            this.writeCall()
        })
    }
    checkonChange2=()=>{
        this.setState({
            type:2
        },function(){
            this.writeCall()
        })
    }
    //数据请求

    fetdraw=(values)=>{
        const result=GetServerData('qerp.web.rp.shop.orderdate.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const shopOrderData=json.shopOrderDatas
				const xdata=[]
				const data1=[]
				const data2=[]
				for(var i=0;i<shopOrderData.length;i++){
                    if(values.startDate==values.endDate){
                        xdata.push(shopOrderData[i].rpDateTime)
                    }else{
                        xdata.push(shopOrderData[i].rpDate)
                    }

					data1.push(shopOrderData[i].qtySum) //订单数
					data2.push(shopOrderData[i].amountSum) //销售额
				}

                this.setState({
                    xdata:xdata,
                    type:'1',
                    data1:data1,
                    data2:data2
                },function(){
                    this.writeCall()
                })




            }
        })
    }





    checkonChange=(checked)=>{
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
        const type=this.state.type
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainsporder'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '订单变化趋势图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[],
            },
            grid:{
                left:"80",
                top:'100'
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
                    name:type=='1'?'订单数量':'订单金额',
                    type:'line',
                    data:type=='1'?data1:data2
                }

            ]
        });
    }

    render() {
        const startDate=timeForMat(7).t2
        const endDate=timeForMat(7).t1
        return (
            <div className='rel'>
                <div style={{position:"absolute",left:"0px",top:"40px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    allowClear={false}
                />
                </div>
                <div style={{position:"absolute",right:"100px",top:"40px",zIndex:'1000'}}><Clisklists listClick1={this.checkonChange1.bind(this)} listClick2={this.checkonChange2.bind(this)} type={this.state.type}/></div>
                <div id="mainsporder" style={{ height: 400 ,width:"100%"}}></div>
            </div>
        );
    }
    componentDidMount() {
        const startDate=timeForMat(7).t2
        const endDate=timeForMat(7).t1
        this.setState({
            startDate:startDate,
            endDate:endDate,
        },function(){
            const values={startDate:startDate,endDate:endDate}
            this.fetdraw(values)
        })


    }

}





export default connect()(EchartsTest);

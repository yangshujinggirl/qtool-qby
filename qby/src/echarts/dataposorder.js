import React, { Component } from 'react';
import { DatePicker,Switch } from 'antd'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';
import {timeForMat} from '../utils/meth';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';

// 引入 ECharts 主模块
var echarts = require('echarts');

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

    //数据请求
    fetdraw=(values)=>{
        const result=GetServerData('qerp.web.rp.pos.orderdate.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const posOrderDatas=json.posOrderDatas
				const xdata=[]
				const data1=[] 
                const data2=[] 
				for(var i=0;i<posOrderDatas.length;i++){
                    if(values.startDate==values.endDate){
                        xdata.push(posOrderDatas[i].rpDateTimeStr)
                    }else{
                        xdata.push(posOrderDatas[i].rpDateStr)
                    }
					
					data1.push(posOrderDatas[i].orderQtySum) //订单数
					data2.push(posOrderDatas[i].amount) //销售额
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
        var myChart = echarts.init(document.getElementById('mains'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '订单变化趋势图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[]
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
                    data:type=='1'?data1:data2
                }
                
            ]
        },{
            notMerge:true
        });
    }

    render() {
        const startDate=timeForMat(7).t2
        const endDate=timeForMat(7).t1
        return (
            <div className='rel'>
                <div style={{position:"absolute",right:"102px",top:"-4px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    allowClear={false}
                />
                </div>
                <div style={{position:"absolute",left:"322px",top:"1px",zIndex:'1000'}}><Switch checked={this.state.type=='1'?true:false} onChange={this.checkonChange.bind(this)} checkedChildren="销售数量" unCheckedChildren="销售金额"/></div>
                <div id="mains" style={{ height: 400 }}></div>
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
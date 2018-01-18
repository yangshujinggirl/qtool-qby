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
		data3:[],
        data4:[],
        startRpDate:null,
        endRpDate:null,
        code:null
    }


    hindChange=(date,dateString)=>{
        console.log(dateString)
        this.setState({
            startRpDate:dateString[0],
            endRpDate:dateString[1],
        },function(){
            const values={startRpDate:this.state.startRpDate,endRpDate:this.state.endRpDate,code:this.state.code}
            this.fetdraw(values)
        })
    }

    //数据请求

    fetdraw=(values)=>{
        const result=GetServerData('qerp.web.rp.pd.analysis.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const analysis=json.analysis
				const xdata=[]
				const data1=[] 
				const data2=[] 
				const data3=[] 
                const data4=[] 
                console.log(values)
                console.log(json)
				for(var i=0;i<analysis.length;i++){
					xdata.push(analysis[i].rpDateMd)
					data1.push(analysis[i].qbyQty) //掌柜数量
					data2.push(analysis[i].posQty) //pos数量
					data3.push(analysis[i].qbyAmount) //掌柜金额
					data4.push(analysis[i].posAmount) //pos金额
				}

                this.setState({
                    xdata:xdata,
                    type:'1',
                    data1:data1,
                    data2:data2,
                    data3:data3,
                    data4:data4
                },function(){
                    this.writeCall()
                })
            }
        })
    }


    disabledTimes=(dates,partial)=>{
        console.log(dates)
        console.log(partial)
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

        console.log(xdata)
        console.log(data1)
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
            <div className='rel'>
                <div style={{position:"absolute",right:"102px",top:"-4px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(timeForMat(30).t2, dateFormat), moment(timeForMat(30).t1, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    disabledTime={this.disabledTimes.bind(this)}
                />
                </div>
                <div style={{position:"absolute",left:"322px",top:"1px",zIndex:'1000'}}><Switch checked={this.state.type=='1'?true:false} onChange={this.checkonChange.bind(this)} checkedChildren="销售数量" unCheckedChildren="销售金额"/></div>
                <div id="main" style={{ height: 400 }}></div>
            </div>
        );
    }
    componentDidMount() {
        const startRpDate=timeForMat(30).t2
        const endRpDate=timeForMat(30).t1
        const values={startRpDate:startRpDate,endRpDate:endRpDate,code:null}
        this.fetdraw(values)
        
    }

}



function mapStateToProps(state) {
    const {data1,data2,data3,data4,xdata} = state.datagodes;
    return {data1,data2,data3,data4,xdata};
}

export default connect(mapStateToProps)(EchartsTest);
import React, { Component } from 'react';
import { DatePicker,Switch } from 'antd'
import NP from 'number-precision'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';

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
        const result=GetServerData('qerp.web.rp.category.analysis.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            console.log(json)
            if(json.code=='0'){
                const categoryAnalysis=json.categoryAnalysis
                for(var i=0;i<categoryAnalysis.length;i++){
                    categoryAnalysis[i].qbyQtyBi=NP.round(NP.divide(categoryAnalysis[i].qbyQty,categoryAnalysis[i].ofQbyQty),2) //掌柜数量占比
                    categoryAnalysis[i].qbyAmountBi=NP.round(NP.divide(categoryAnalysis[i].qbyAmount,categoryAnalysis[i].ofQbyAmount),2) //掌柜金额占比
                    categoryAnalysis[i].posQtyBi=NP.round(NP.divide(categoryAnalysis[i].posQty,categoryAnalysis[i].ofPosQty),2) //pos数量占比
                    categoryAnalysis[i].posAmountBi=NP.round(NP.divide(categoryAnalysis[i].posAmount,categoryAnalysis[i].ofPosAmount),2) //pos金额占比
                }
                const updateTime=json.updateTime
				const xdata=[]
				const data1=[] 
				const data2=[] 
				const data3=[] 
				const data4=[] 
				for(var i=0;i<categoryAnalysis.length;i++){
					xdata.push(categoryAnalysis[i].name)
					data1.push(categoryAnalysis[i].qbyQty) //掌柜数量
					data2.push(categoryAnalysis[i].posQty) //pos数量
					data3.push(categoryAnalysis[i].qbyAmount) //掌柜金额
					data4.push(categoryAnalysis[i].posAmount) //pos金额
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
                    this.props.dispatch({
                        type:'dataclassdes/tablefetch',
                        payload:{categoryAnalysis,updateTime}
                    })
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
        var myChart = echarts.init(document.getElementById('mains'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '商品分类售卖情况'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['掌柜销售', 'POS销售']
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
            xAxis:  [{
                type: 'category',
                axisTick: {show: false},
                data: xdata
            }],
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '掌柜销售',
                    type: 'bar',
                    barGap: 0,
                    data:type=='1'?data1:data3
                    
                },
                {
                    name: 'POS销售',
                    type: 'bar',
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
                    defaultValue={[moment('2017-12-15', dateFormat), moment('2018-1-15', dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    disabledTime={this.disabledTimes.bind(this)}
                />
                </div>
                <div style={{position:"absolute",left:"322px",top:"1px",zIndex:'1000'}}><Switch checked={this.state.type=='1'?true:false} onChange={this.checkonChange.bind(this)} checkedChildren="销售数量" unCheckedChildren="销售金额"/></div>
                <div id="mains" style={{ height: 400 }}></div>
            </div>
        );
    }
    componentDidMount() {
        const startRpDate='2017-12-15'
        const endRpDate='2018-1-15'
        const values={startRpDate:startRpDate,endRpDate:endRpDate,code:null}
        this.fetdraw(values)
        
    }

}



function mapStateToProps(state) {
    const {data1,data2,data3,data4,xdata} = state.datagodes;
    return {data1,data2,data3,data4,xdata};
}

export default connect(mapStateToProps)(EchartsTest);
import React, { Component } from 'react';
import { DatePicker,Switch,Input } from 'antd'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';
import {timeForMat} from '../utils/meth';
import Clisklist from '../components/switchs/lrsw';

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



    //绘制
    writeCall=()=>{
        const xdata=this.state.xdata
        const data1=this.state.data1
        const data2=this.state.data2
        const data3=this.state.data3
        const data4=this.state.data4
        const type=this.state.type
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('maingod'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '门店销售趋势图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[{
                    name:'掌柜销售'
                },{
                    name:'POS销售'
                }],
                top:"43",
                left:"460"
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

    hindkeyup=(e)=>{
        if(e.keyCode=='13'){
            const values={startRpDate:this.state.startRpDate,endRpDate:this.state.endRpDate,code:e.target.value}
            this.fetdraw(values)
        }
    }

    render() {
        return (
            <div className='rel'>
                <div style={{position:"absolute",left:'300px',top:'40px',zIndex:'1000'}}><Input placeholder="请输入商品编码" style={{width:"150px"}} onKeyUp={this.hindkeyup.bind(this)}/></div>
                <div style={{position:"absolute",left:"0px",top:"40px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(timeForMat(30).t2, dateFormat), moment(timeForMat(30).t1, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    allowClear={false}
                />
                </div>
                <div style={{position:"absolute",right:"50px",top:"40px",zIndex:'1000'}}><Clisklist listClick1={this.checkonChange1.bind(this)} listClick2={this.checkonChange2.bind(this)} type={this.state.type}/></div>
                <div id="maingod" style={{ height: 400}}></div>
            </div>
        );
    }
    componentDidMount() {
        const startRpDate=timeForMat(30).t2
        const endRpDate=timeForMat(30).t1
        this.setState({
            startRpDate:startRpDate,
            endRpDate:endRpDate,
        },function(){
            const values={startRpDate:startRpDate,endRpDate:endRpDate,code:null}
            this.fetdraw(values)
        })


    }

}






export default connect()(EchartsTest);

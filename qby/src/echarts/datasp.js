import React, { Component } from 'react';
import { DatePicker,Switch,Input } from 'antd'
import moment from 'moment';
import { connect } from 'dva';
import {GetServerData} from '../services/services';
import {timeForMat} from '../utils/meth';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';
import Clisklist from '../components/switchs/lrsw';

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
            this.gettabledata()
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
        const result=GetServerData('qerp.web.rp.shop.sale.data.chart.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const analysis=json.shopSaleDatas
				const xdata=[]
				const data1=[]
				const data2=[]
				const data3=[]
                const data4=[]
				for(var i=0;i<analysis.length;i++){
                    if(values.startRpDate==values.endRpDate){
                        xdata.push(analysis[i].rpDateTime)
                    }else{
                        xdata.push(analysis[i].rpDate)
                    }
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


    gettabledata=()=>{
        const values={
            startRpDate:this.state.startRpDate,
            endRpDate:this.state.endRpDate,
        }
		this.props.dispatch({
			type:'dataspsell/tablefetch',
			payload:{code:'qerp.web.rp.shop.sale.data.list',values:values}
        })
        this.props.dispatch({
			type:'dataspsell/synvalues',
			payload:values
        })
        this.props.dispatch({ type: 'tab/loding', payload:true});

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
        const data3=this.state.data3
        const data4=this.state.data4
        const type=this.state.type

        for(var i=0;i<data1.length;i++){
            data1[i]=String(data1[i])
        }

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainsp'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '门店销售趋势图'
            },
            tooltip: {
                trigger: 'axis',
                // formatter: this.state.type=='1'?'{b0}-{b1}<br />{a1}: {c0}<br />{a0}: {c1}':null
            },
            legend: {
                data:['掌柜销售','POS销售'],
                top:"43",
                left:"300"

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
            grid:{
                left:"80",
                top:'100'
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
                },

            ]
        });
    }


    render() {
        var myDate=new Date()
        const tody=String(myDate.getFullYear()+'-'+("0"+(myDate.getMonth()+1)).slice(-2)+'-'+("0"+myDate.getDate()).slice(-2))
        return (
            <div className='rel'>
                <div style={{position:"absolute",left:"0px",top:"40px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(tody, dateFormat), moment(tody, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                    allowClear={false}
                />
                </div>
                <div  style={{position:"absolute",right:"100px",top:"40px",zIndex:'1000'}}><Clisklist listClick1={this.checkonChange1.bind(this)} listClick2={this.checkonChange2.bind(this)} type={this.state.type}/></div>
                <div id="mainsp" style={{ height: 400 }}></div>
            </div>
        );
    }
    componentDidMount() {
        var myDate=new Date()
        const tody=String(myDate.getFullYear()+'-'+("0"+(myDate.getMonth()+1)).slice(-2)+'-'+("0"+myDate.getDate()).slice(-2))
        const startRpDate=tody
        const endRpDate=tody
        this.setState({
            startRpDate:startRpDate,
            endRpDate:endRpDate,
        },function(){
            const values={startRpDate:startRpDate,endRpDate:endRpDate}
            this.fetdraw(values)
            this.gettabledata()
        })


    }

}





export default connect()(EchartsTest);

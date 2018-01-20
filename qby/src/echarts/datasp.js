import React, { Component } from 'react';
import { DatePicker,Switch,Input } from 'antd'
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
        this.setState({
            startRpDate:dateString[0],
            endRpDate:dateString[1],
        },function(){
            const values={startRpDate:this.state.startRpDate,endRpDate:this.state.endRpDate,code:this.state.code}
            this.fetdraw(values)
            this.gettabledata()
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
                    if(values.startDate==values.endDate){
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
        var myDate=new Date()
        const tody=String(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate())
        return (
            <div className='rel'>
                <div style={{position:"absolute",right:"102px",top:"-4px",zIndex:'1000'}}>
                <RangePicker
                    defaultValue={[moment(tody, dateFormat), moment(tody, dateFormat)]}
                    format={dateFormat}
                    onChange={this.hindChange.bind(this)}
                />
                </div>
                <div style={{position:"absolute",left:"322px",top:"1px",zIndex:'1000'}}><Switch checked={this.state.type=='1'?true:false} onChange={this.checkonChange.bind(this)} checkedChildren="销售数量" unCheckedChildren="销售金额"/></div>
                <div id="main" style={{ height: 400 }}></div>
            </div>
        );
    }
    componentDidMount() {
        var myDate=new Date()
        const tody=String(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate())
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


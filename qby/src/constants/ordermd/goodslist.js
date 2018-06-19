import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload,Cascader} from 'antd';
import {GetServerData} from '../../services/services';
import React from 'react';
import { connect } from 'dva';



class GoodsListTable extends React.Component {
    constructor(props) {
      super(props);
      this.columns = [{
        title: '商品编码',
        width:"150px",
        dataIndex: 'Code',
        render: (text, record, index) => {
            return (
                <Input 
                    value={this.state.dataSource[index].Code} 
                    placeholder="请输入商品编码" 
                    onChange={this.handleChangeCode.bind(this, index)} 
                    onBlur={this.onBluepdCode.bind(this,index)}
                    />
            );
        }
      }, {
        title: '预订数量',
        dataIndex: 'qty',
        width:"100px",
        render: (text, record, index) => {
            return (
                    <Input 
                        value={this.state.dataSource[index].qty} 
                        placeholder="预订数量" 
                        onChange={this.handleChangeQty.bind(this, index)} 
                        onBlur={this.onBluepdqty.bind(this,index)}/>
            );
        }
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width:"100px",
        render: (text, record, index) => {
            return (
                <p style={{textAlign:'center'}}>{this.state.dataSource[index].name}</p>
            );
        }
      },
      {
        title: '商品规格',
        dataIndex: 'displayName',
        width:"100px",
        render: (text, record, index) => {
            return (
                <p style={{textAlign:'center'}}>{this.state.dataSource[index].displayName}</p>
            );
        }
      },
      {
        title: '商品单价',
        dataIndex: 'price',
        width:"100px",
        render: (text, record, index) => {
            return (
                <p style={{textAlign:'center'}}>{this.state.dataSource[index].price}</p>
            );
        }
      },{
        title: '',
        dataIndex: 'operation',
        width:'80px',
        render: (text, record, index) => {
          return (
            this.state.dataSource.length > 1
            ?
            <div style={{color: '#35bab0', cursor:'pointer'}} onClick={this.onDelete.bind(this,index)}>删除</div>
            :
            null
          );
        }
      }];
  
      this.state = {
        dataSource: [{
          key: 0,
          Code:'',
          qty: '',
          price:''
        }],
        count: 2
      };
    }
    
    onDelete = (index) => {
      let dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({
        dataSource:dataSource
         },function(){
          const Getdetail=this.props.Getdetail
          Getdetail(this.state.dataSource)
        });
    }
  
    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        Code:'',
        qty: '',
        price:'',
        name:null,
        displayName:null,
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1
      });
    }
  
    handleChangeCode=(index, e)=>{
        let temDataSource = this.state.dataSource;
        temDataSource[index].Code = e.target.value;
        this.setState({
            dataSource:temDataSource
        })
    }
  
    onBluepdCode=(index)=>{
        let temDataSource = this.state.dataSource;
        let code = temDataSource[index].Code;
        if (!code) {
            return;
        }
        let data={code:code};
        const result=GetServerData('qerp.web.pd.spu.invinfo',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                temDataSource[index].price=(!json.pdSku?json.pdSpu.toBPrice:json.pdSku.toBPrice);
                temDataSource[index].name=json.name;
                // temDataSource[index].displayName=(!json.pdSku?null:(json.pdSku.pdType2Val?json.pdSku.pdType1Val.name+'/'+json.pdSku.pdType2Val.name:json.pdSku.pdType1Val.name));
                temDataSource[index].displayName=json.displayName
                this.setState({
                    dataSource:temDataSource
                },function(){
                    const Getdetail=this.props.Getdetail;
                    Getdetail(this.state.dataSource);
                })
            }
        })
    }
    onBluepdqty=(index,e)=>{
       const Getdetail=this.props.Getdetail
        Getdetail(this.state.dataSource)
    }
  
    handleChangeQty=(index, e)=>{
        const pays=/^[0-9]*$/
        const changevalue=e.target.value
        const srt=pays.test(changevalue)
        if(srt){
            let temDataSource = this.state.dataSource;
            temDataSource[index].qty = e.target.value;
            this.setState({
                dataSource:temDataSource
            })
        }
    }

    settable=(value)=>{
        this.setState({
            dataSource:value
        },function(){
            const Getdetail=this.props.Getdetail;
            Getdetail(this.state.dataSource)
        });
    }

  
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div style={{marginTop:'0px'}}>
            <Table dataSource={dataSource} style = {{padding:0}} columns={columns} pagination={false} showHeader={true} bordered={false} 
            className='OrderCenterEidt' ref="dfafalk"/>
            <Button style={{margin:'15px 10px 0 7px', width:'100px'}} onClick={this.handleAdd}>+商品</Button>
            </div>
        );
    }

    componentDidMount(){
        const mdopdermeth={
            funct:this.settable
        }
        this.props.dispatch({
            type:'ordermd/mdopdermeth',
            payload:mdopdermeth
        })
    }
  }

function mapStateToProps(state) {
    const {goodsInfo}  = state.ordermd;
    return {goodsInfo};
}   

export default connect(mapStateToProps)(GoodsListTable);

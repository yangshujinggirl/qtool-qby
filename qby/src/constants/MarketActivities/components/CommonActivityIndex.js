import React, { Component } from 'react';
import moment from 'moment';

class CommonActivityIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields:{
        mktActivityId:'',
        name:'',
        status:'',
        type:'',
        createUser:'',
        time:''
      }
    }
  }
  handleOperateClick=(record, type)=> {
    switch (type) {
      case "info":
        this.goInfo(record);
        break;
      case "edit":
        this.goEdit(record);
        break;
      case "delete":
        this.goDelete(record);
        break;
      case "cancel":
        this.goCancel(record);
        break;
      case "zuofei":
        this.goZuofei(record);
        break;
      case "forcedEnd":
        this.goForcedEnd(record);
        break;
    }
  }
  formatParams=(values)=> {
    let { time ,...paramsVal} =values;
    if(time&&time.length>0) {
      paramsVal.activityStrTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
      paramsVal.activityEndTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    return paramsVal;
  }
  //分页
  changePage = (currentPage) => {
    const { fields } =this.state;
    currentPage--;
    this.initData({...fields,currentPage})
  }
  //修改pageSize
  changePageSize =(values)=> {
    const { fields } =this.state;
    values= {...values,...fields};
    this.initData(values)
  }
  handleFormChange = changedFields => {
   this.setState(({ fields }) => ({
     fields: { ...fields, ...changedFields },
   }));
  };
  submitSearch=(values)=> {
    values = this.formatParams(values);
    this.initData(values)
  }
}
export default CommonActivityIndex;

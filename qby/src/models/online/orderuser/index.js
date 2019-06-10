export default{
  namespace:'orderuser',
  state:{
    editChange:false,
    identify:false,
  },
  reducers:{
    setAuthority(state, { payload : authorityData }) {
      let editChange = null;
      let identify = null;
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 801800:
            editChange = true;
            break;
          case 801900:
            identify = true;
            break;
        };
      });
      return { ...state, editChange, identify }
    },
  },
  effects:{}
}

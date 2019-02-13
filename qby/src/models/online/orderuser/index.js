export default{
  namespace:'orderuser',
  state:{
    authorityList:{
      editChange:false,
    }
  },
  reducers:{
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 801800:
            authorityList.editChange = true;
            break;
        };
      });
      return { ...state, authorityList }
    },
  },
  effects:{}
}

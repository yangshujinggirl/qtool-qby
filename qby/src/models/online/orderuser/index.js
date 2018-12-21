export default{
  namespace:'orderuser',
  state:{
    authorityList:{
      editorder:false,
      postgood:false,
    }
  },
  reducers:{
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 801400:
            authorityList.editorder=true;
            break;
          case 801700:
            authorityList.postgood = true;
            break;
        };
      });
      return { ...state, authorityList }
    },
  },
  effects:{}
}

export default{
  namespace:'orderuser',
  state:{
    editChange:false,
  },
  reducers:{
    setAuthority(state, { payload : authorityData }) {
      let editChange = null;
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 801800:
            editChange = true;
            break;
        };
      });
      return { ...state, editChange }
    },
  },
  effects:{}
}

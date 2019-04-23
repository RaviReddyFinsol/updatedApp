const initialState = {
    token:undefined
  };
  
  function authReducer(state = initialState, action) {
      switch(action.type){
          case 'LOGIN':{
              return {
                ...state,
                token:12
              };
          }
          case 'LOGOUT':{
            return {
              ...state,
              token:undefined
            };
        }
      }
    return state;
  };
  
  export default authReducer;
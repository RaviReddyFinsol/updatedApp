const initialState = {
    token:undefined
  };
  
  export default function authReducer(state = initialState, action) {
      switch(action.type){
          case 'LOGIN':{
            console.log(action.val)
              return {
                ...state,
                token:action.val
              };
          }
          case 'LOGOUT':{
            return {
              ...state,
              token:undefined
            };
        }
        default : return state;
      }
  };
  
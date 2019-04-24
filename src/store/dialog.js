const initialState = {
    isDialogOpened:false
  };
  
  export default function authReducer(state = initialState, action) {
      switch(action.type){
          case 'OPEN':{
              return {
                ...state,
                isDialogOpened:true
              };
          }
          case 'CLOSE':{
            return {
              ...state,
              isDialogOpened:false
            };
        }
        default : return state;
      }
  };
  
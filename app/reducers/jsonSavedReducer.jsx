import INITIAL_STATE from './../constants/constants.jsx'

function jsonSavedReducer(state ={}, action){
  switch (action.type){
  case 'JSONSAVED':
    let newState = JSON.parse(JSON.stringify(state));
    newState = action.quiz;
    return newState;

  default:
    return state;
  }
}

export default jsonSavedReducer;

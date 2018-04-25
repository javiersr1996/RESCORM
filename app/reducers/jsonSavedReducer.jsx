import JSON_INTERNO from './../constants/constants.jsx'

function jsonSavedReducer(state = JSON_INTERNO, action){
  switch (action.type){
  case 'JSONSAVED':
    return action.jsonredux



  default:
    return state;
  }
}

export default jsonSavedReducer;

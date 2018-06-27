function initialScreenReducer(state = false, action){
  switch (action.type){
  case 'TOGGLE_INITIAL_SCREEN':
    if ([true,false].indexOf(action.show) != -1){
      return action.show;
    }
    return state;
  default:
    return state;
  }
}

export default initialScreenReducer;
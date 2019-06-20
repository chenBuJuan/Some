export default reducers => (state = {}, action) => Object.keys(reducers).reduce(
  (t, key) => {
    const newState = t;
    newState[key] = reducers[key](state[key], action);
    return newState;
  },
  {},
);

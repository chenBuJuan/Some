export default (reducer, initialState) => {
  let state = initialState || {};
  const listeners = [];
  const getState = () => state;
  const subscribe = listener => listeners.push(listener);
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  return { getState, subscribe, dispatch };
};

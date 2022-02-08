export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

const initialState = {
  data: 42,
};
export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, data: state.data + action.payload };
    case DECREMENT:
      return { ...state, data: state.data - action.payload };
    default:
      return state;
  }
}

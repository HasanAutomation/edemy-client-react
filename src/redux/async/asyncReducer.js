const ASYNC_START = 'ASYNC_START';
const ASYNC_FINISH = 'ASYNC_FINISH';
const ASYNC_ERROR = 'ASYNC_ERROR';
export const APP_LOADED = 'APP_LOADED';

export function asyncStart() {
  return {
    type: ASYNC_START,
  };
}

export function asyncFinish() {
  return {
    type: ASYNC_FINISH,
  };
}

export function asyncError(error) {
  return {
    type: ASYNC_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export default function asyncReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASYNC_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYNC_FINISH:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ASYNC_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case APP_LOADED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}

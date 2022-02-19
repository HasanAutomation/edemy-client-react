import { GET_ADMIN_COURSES } from './courseConstants';

const initialState = {
  adminCourses: [],
};

export default function courseReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ADMIN_COURSES:
      return {
        ...state,
        adminCourses: payload,
      };
    default:
      return state;
  }
}

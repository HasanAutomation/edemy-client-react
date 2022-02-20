import { GET_ADMIN_COURSES, UPDATE_COURSE } from './courseConstants';

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
    case UPDATE_COURSE:
      return {
        ...state,
        adminCourses: [
          ...state.adminCourses.filter(course => course.slug !== payload.slug),
          payload,
        ],
      };
    default:
      return state;
  }
}

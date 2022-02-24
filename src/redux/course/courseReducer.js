import {
  GET_ADMIN_COURSES,
  GET_USER_COURSES,
  PUBLISHED_COURSES,
  UPDATE_COURSE,
} from './courseConstants';

const initialState = {
  adminCourses: [],
  publishedCourses: [],
  userCourses: [],
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
    case PUBLISHED_COURSES:
      return {
        ...state,
        publishedCourses: payload,
      };
    case GET_USER_COURSES:
      return {
        ...state,
        userCourses: payload,
      };
    default:
      return state;
  }
}

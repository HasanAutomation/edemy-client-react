import { GET_ADMIN_COURSES } from './courseConstants';

export function listenAdminCourses(courses) {
  return {
    type: GET_ADMIN_COURSES,
    payload: courses,
  };
}

import { GET_ADMIN_COURSES, UPDATE_COURSE } from './courseConstants';

export function listenAdminCourses(courses) {
  return {
    type: GET_ADMIN_COURSES,
    payload: courses,
  };
}

export function updateCourse(updatedCourse) {
  return {
    type: UPDATE_COURSE,
    payload: updatedCourse,
  };
}

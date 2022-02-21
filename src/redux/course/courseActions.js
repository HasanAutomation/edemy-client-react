import {
  GET_ADMIN_COURSES,
  PUBLISHED_COURSES,
  UPDATE_COURSE,
} from './courseConstants';

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

export function getPublishedCourses(courses) {
  return {
    type: PUBLISHED_COURSES,
    payload: courses,
  };
}

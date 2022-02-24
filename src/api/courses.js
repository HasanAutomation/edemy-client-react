import constants from '../utils/constant';
import agent from './agent';

const coursesApi = {
  createCourse: body => agent.post(constants.endpoints.createCourse, body),
  getAdminCourses: () => agent.get(constants.endpoints.adminCourses),
  getSingleCourse: slug => agent.get(`/courses/${slug}`),
  updateCourse: (slug, body) => agent.put(`/courses/${slug}`, body),
  addSection: (slug, instructor, body) =>
    agent.put(`/courses/${slug}/sections/add/${instructor}`, body),
  addLesson: ({ slug, instructor, body, sectionId }) =>
    agent.put(`/courses/${slug}/${sectionId}/lessons/add/${instructor}`, body),
  publishUnpublishCourse: (courseID, published) =>
    agent.put(`courses/${courseID}/publish-unpublish`, { published }),
  getPublishedCourses: () => agent.get('/courses/published-courses'),
  checkEnrollmentServer: slug => agent.get(`/courses/check-enrollment/${slug}`),
  freeEnroll: courseId => agent.put(`/courses/free-enrollment/${courseId}`, {}),
};

export default coursesApi;

import constants from '../utils/constant';
import agent from './agent';

const coursesApi = {
  createCourse: body => agent.post(constants.endpoints.createCourse, body),
  getAdminCourses: () => agent.get(constants.endpoints.adminCourses),
  getSingleCourse: slug => agent.get(`/courses/${slug}`),
  updateCourse: (slug, body) => agent.put(`/courses/${slug}`, body),
  addSection: (slug, instructor, body) =>
    agent.put(`/courses/${slug}/sections/add/${instructor}`, body),
};

export default coursesApi;

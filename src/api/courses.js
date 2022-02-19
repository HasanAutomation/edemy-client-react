import constants from '../utils/constant';
import agent from './agent';

const coursesApi = {
  createCourse: body => agent.post(constants.endpoints.createCourse, body),
  getAdminCourses: () => agent.get(constants.endpoints.adminCourses),
  getSingleCourse: slug => agent.get(`/courses/${slug}`),
};

export default coursesApi;

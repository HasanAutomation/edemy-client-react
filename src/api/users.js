import constants from '../utils/constant';
import agent from './agent';

const usersApi = {
  userCourses: () => agent.get(constants.endpoints.userCourses),
};

export default usersApi;

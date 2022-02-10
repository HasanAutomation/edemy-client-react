import constants from '../utils/constant';
import agent from './agent';

const usersApi = {
  createUser: creds => agent.post(constants.endpoints.createUser, creds),
  currentUser: () => agent.get(constants.endpoints.currentUser),
};

export default usersApi;
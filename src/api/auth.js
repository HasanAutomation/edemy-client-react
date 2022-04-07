import constants from '../utils/constant';
import agent from './agent';

const authApi = {
  sendVerificationOtp: email =>
    agent.post(constants.endpoints.auth.sendOtp, { email }),
  verifyVerificationOtp: data =>
    agent.post(constants.endpoints.auth.verifyOtp, data),
  completeRegistration: data =>
    agent.post(constants.endpoints.auth.newUser, data),
  login: data => agent.post(constants.endpoints.auth.login, data),
  getCurrentUser: () => agent.get(constants.endpoints.auth.current),
};
export default authApi;

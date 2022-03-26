import constants from '../utils/constant';
import agent from './agent';

const authApi = {
  sendVerificationOtp: email =>
    agent.post(constants.endpoints.auth.sendOtp, { email }),
  verifyVerificationOtp: data =>
    agent.post(constants.endpoints.auth.verifyOtp, data),
  completeRegistration: data =>
    agent.post(constants.endpoints.auth.newUser, data),
};
export default authApi;

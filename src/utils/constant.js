const constants = {
  TOKEN_KEY: 'ledemy-id_ttt',
  endpoints: {
    createUser: '/users/create',
    currentUser: '/users/current',
    createCourse: '/courses/create',
    adminCourses: '/courses/admin',
    userCourses: '/users/courses',
    auth: {
      sendOtp: '/auth/send-otp',
      verifyOtp: '/auth/verify-otp',
      newUser: '/auth/new-user',
      login: '/auth/login',
      current: '/auth/current',
    },
  },
  roles: {
    admin: 'admin',
  },
};

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export default constants;

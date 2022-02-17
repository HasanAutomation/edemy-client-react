const constants = {
  TOKEN_KEY: 'ledemy-id_ttt',
  endpoints: {
    createUser: '/users/create',
    currentUser: '/users/current',
  },
  roles: {
    admin: 'admin',
  },
};

export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export default constants;

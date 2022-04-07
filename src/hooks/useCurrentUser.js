import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import authApi from '../api/auth';
import { APP_LOADED } from '../redux/async/asyncReducer';
import { setUserData } from '../redux/auth/actions/auth';

export function useCurrentUser() {
  const dispatch = useDispatch();
  async function getCurrentUser() {
    try {
      const {
        data: { data },
      } = await authApi.getCurrentUser();
      dispatch(setUserData(data.user));
      dispatch({ type: APP_LOADED });
    } catch (err) {
      const error = err.response.data.errors[0].error;
      // toast.error(error);
      dispatch({ type: APP_LOADED });
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);
}

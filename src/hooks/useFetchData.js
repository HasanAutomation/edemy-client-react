import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  asyncError,
  asyncFinish,
  asyncStart,
} from '../redux/async/asyncReducer';

export default function useFetchData({ request, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncStart());
    request()
      .then(res => {
        data(res.data);
        dispatch(asyncFinish());
      })
      .catch(err => {
        dispatch(asyncError(err.response.data.errors));
      });
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

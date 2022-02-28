import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AdminDashboard, Home, Landing, UserDashboard } from './pages';
import Navbar from './components/nav/Navbar';
import ModalManager from './components/modals/ModalManager';
import SandBox from './pages/sandBox/SandBox';
import { useSelector } from 'react-redux';
import LoadingComponent from './components/loader/LoadingComponent';
import { ToastContainer } from 'react-toastify';
import AdminRoute from './components/routes/AdminRoute';
import PublicCourse from './pages/course/PublicCourse';
import PrivateRoute from './components/routes/PrivateRoute';
import UserCoursesListContainer from './pages/user/UserCoursesListContainer';
import SingleCoursePage from './pages/user/SingleCoursePage';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const { initialized } = useSelector(state => state.async);
  const [loading, setLoading] = useState(false);

  // const queryString = useLocation().search;
  // let token = queryString.split('=')[1];

  // useEffect(() => {
  //   // Make request to the backend
  //   const t = localStorage.getItem('data-from-bookmarker');
  //   let tokenDataFromStorage = t ? JSON.parse(t).accessToken : null;
  //   if (token || tokenDataFromStorage) {
  //     if (!token && tokenDataFromStorage) token = tokenDataFromStorage;
  //     setLoading(true);
  //     axios
  //       .get('https://bookmark-web-api.herokuapp.com/api/v1/users/me', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(({ data }) => {
  //         localStorage.setItem('data-from-bookmarker', JSON.stringify(data));
  //         console.log('DATA==', data);
  //         if (!tokenDataFromStorage)
  //           window.location.href = window.location.href.split('?')[0];
  //         setLoading(false);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [queryString]);

  // var elem = document.documentElement;

  // function openFullscreen() {
  //   if (elem) {
  //     if (elem.requestFullscreen) {
  //       elem.requestFullscreen();
  //     } else if (elem.webkitRequestFullscreen) {
  //       /* Safari */
  //       elem.webkitRequestFullscreen();
  //     } else if (elem.msRequestFullscreen) {
  //       /* IE11 */
  //       elem.msRequestFullscreen();
  //     }
  //   }
  // }

  if (!initialized || loading) return <LoadingComponent />;

  return (
    <>
      <ToastContainer hideProgressBar position='bottom-right' />
      <ModalManager />
      <Route exact path='/' component={Landing} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <div className='main'>
              <Switch>
                {/* <AdminRoute path='/sandbox' component={SandBox} /> */}
                <Route exact path='/courses' component={Home} />
                <Route exact path='/courses/:slug' component={PublicCourse} />
                <AdminRoute
                  path='/admin/dashboard'
                  component={AdminDashboard}
                />
                <PrivateRoute
                  path='/user/dashboard'
                  component={UserDashboard}
                />
                <PrivateRoute
                  path='/user/my-learning'
                  component={UserCoursesListContainer}
                />
                <PrivateRoute
                  path='/user/courses/:slug'
                  component={SingleCoursePage}
                />
              </Switch>
            </div>
          </>
        )}
      />
    </>
  );
}

export default App;

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

function App() {
  const { initialized } = useSelector(state => state.async);

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

  if (!initialized) return <LoadingComponent />;

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
                <AdminRoute path='/sandbox' component={SandBox} />
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
              </Switch>
            </div>
          </>
        )}
      />
    </>
  );
}

export default App;

import './App.css';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages';
import Navbar from './components/nav/Navbar';
import ModalManager from './components/modals/ModalManager';
import SandBox from './pages/sandBox/SandBox';
import { useSelector } from 'react-redux';
import LoadingComponent from './components/loader/LoadingComponent';
import { ToastContainer } from 'react-toastify';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  const { initialized } = useSelector(state => state.async);

  if (!initialized) return <LoadingComponent />;

  return (
    <>
      <ToastContainer hideProgressBar position='bottom-right' />
      <ModalManager />
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container className='main'>
              <Switch>
                <AdminRoute path='/sandbox' component={SandBox} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;

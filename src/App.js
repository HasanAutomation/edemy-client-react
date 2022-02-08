import './App.css';
import { Container, Header } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages';
import Navbar from './components/nav/Navbar';
import ModalManager from './components/modals/ModalManager';
import SandBox from './pages/sandBox/SandBox';

function App() {
  return (
    <>
      <ModalManager />
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container className='main'>
              <Switch>
                <Route path='/sandbox' component={SandBox} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;

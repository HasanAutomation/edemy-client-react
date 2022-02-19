import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import './Sidebar.scss';

function Sidebar({ menus }) {
  const { path, url } = useRouteMatch();
  const { key } = useLocation();

  return (
    <Grid>
      <Grid.Column width={3}>
        <div className='custom-sidebar'>
          {menus.map(
            menu =>
              menu.name && (
                <Menu.Item
                  key={menu.path}
                  as={NavLink}
                  to={`${url}${
                    menu.path === '/'
                      ? ''
                      : Array.isArray(menu.path)
                      ? menu.path[0]
                      : menu.path
                  }`}
                  className='link-item'
                >
                  {menu.name}
                </Menu.Item>
              )
          )}
        </div>
      </Grid.Column>
      <Grid.Column width={13}>
        <Switch>
          {menus.map(({ path: pathCompo, component, exact, redirect = null }) =>
            redirect ? (
              <Route key={pathCompo} path={`${path}`} exact={exact}>
                {redirect()}
              </Route>
            ) : Array.isArray(pathCompo) ? (
              <Route
                key={key}
                path={[`${path}${pathCompo[0]}`, `${path}${pathCompo[1]}`]}
                exact={exact}
                component={component}
              />
            ) : (
              <Route
                key={pathCompo}
                path={`${path}${pathCompo === '/' ? '' : pathCompo}`}
                exact={exact}
                component={component}
              />
            )
          )}
        </Switch>
      </Grid.Column>
    </Grid>
  );
}

export default Sidebar;

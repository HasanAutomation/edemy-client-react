import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import './Sidebar.scss';

function Sidebar({ menus }) {
  const { path, url } = useRouteMatch();

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
                  to={`${url}/${menu.path}`}
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
            ) : (
              <Route
                key={pathCompo}
                path={`${path}/${pathCompo}`}
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

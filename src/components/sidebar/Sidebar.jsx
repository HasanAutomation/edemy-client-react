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
          {menus.map(menu => (
            <Menu.Item
              key={menu.path}
              as={NavLink}
              to={`${url}/${menu.path}`}
              className='link-item'
            >
              {menu.name}
            </Menu.Item>
          ))}
        </div>
      </Grid.Column>
      <Grid.Column width={13}>
        <Switch>
          {menus.map(menu => (
            <Route
              key={menu.path}
              path={`${path}/${menu.path}`}
              component={menu.component}
            />
          ))}
        </Switch>
      </Grid.Column>
    </Grid>
  );
}

export default Sidebar;

import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

const TopNavigation = ({
  user,
  logout
}: {
  user: {},
  logout: {}
}): Element<any> => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(): void => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

function mapStateToProps(state: {}): {} {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);

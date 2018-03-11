import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';
import { allBooksSelector } from '../../reducers/books';

const TopNavigation = ({
  user,
  logout,
  hasBooks
}: {
  user: {},
  logout: {},
  hasBooks: boolean
}): Element<any> => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        Add New Book
      </Menu.Item>
    )}
    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(): void => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

function mapStateToProps({ user }: { user: {} }): {} {
  return {
    user,
    hasBooks: allBooksSelector(state) > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);

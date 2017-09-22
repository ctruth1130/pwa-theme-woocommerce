import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';
import { closeMenu } from './views/Home/actions';
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';

class App extends Component {
  constructor(props) {
    super(props);

    this.hideSidebar = this.hideSidebar.bind(this);
  }

  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  render() {
    return (
      <Sidebar.Pushable>
        <SideMenu isVisible={this.props.sideMenuVisible} />
        <Sidebar.Pusher dimmed={this.props.sideMenuVisible} onClick={this.hideSidebar}>
          <NavBar />
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

App.propTypes = {
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

App.defaultProps = {
  children: null,
};

function mapStateToProps(state) {
  return {
    sideMenuVisible: state.sideMenuVisible,
  };
}

export default connect(mapStateToProps, { closeMenu })(App);

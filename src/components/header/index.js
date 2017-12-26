import React, { Component } from 'react';
import InnerContainer from '../inner-container';
import Search from '../search';
import './style.css';

class Header extends Component {
  render() {
    return (
      <header>
        <InnerContainer>
          <h1>Mini github client</h1>
          <Search onSearch={this.props.onSearch} />
        </InnerContainer>
      </header>
    );
  }
}

export default Header;

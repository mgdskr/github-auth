import React from 'react';
import InnerContainer from '../inner-container';
import Search from '../search';
import './style.css';

const Header = ({ onSearch }) => (
  <header>
    <InnerContainer>
      <h1>Mini github client</h1>
      <Search />
    </InnerContainer>
  </header>
);

export default Header;

import React from 'react';
import { compose, setStatic } from 'recompose';
import PropTypes from 'prop-types';
import InnerContainer from '../inner-container';
import Search from '../search';
import './style.css';

const propTypes = {
  onSearch: PropTypes.func
};

const Header = ({ onSearch }) => (
  <header>
    <InnerContainer>
      <h1>Mini github client</h1>
      <Search onSearch={onSearch} />
    </InnerContainer>
  </header>
);

export default compose(setStatic('propTypes', propTypes))(Header);

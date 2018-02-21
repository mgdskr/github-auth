import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sort } from '../../redux/modules/sort';
import { sortingOptions } from './sorting';

class Sorting extends Component {
  static defaultProps = {
    sortingField: 'full_name',
    sortingOrder: 'asc'
  };

  static propTypes = {
    sortingField: PropTypes.string,
    sortingOrder: PropTypes.string,
    sort: PropTypes.func
  };

  handlerOnSort = event => {
    const sortingType = [].find.call(
      event.target.childNodes,
      option => option.selected
    ).value;
    const sortingObj = sortingOptions[sortingType];
    this.props.sort(sortingObj);
  };

  render() {
    const { sortingField, sortingOrder } = this.props;

    return (
      <div className="sortingContainer">
        <div className="sort">
          <label htmlFor="sorting">Sort</label>
          <select
            size="1"
            id="sorting"
            name="sorting"
            onChange={this.handlerOnSort}
          >
            {Object.keys(sortingOptions).map(key => (
              <option
                value={key}
                key={key}
                defaultChecked={
                  sortingOptions[key].sortingField === sortingField &&
                  sortingOptions[key].sortingOrder === sortingOrder
                }
              >
                {sortingOptions[key].title}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sort: { sortingField, sortingOrder } }) => ({
  sortingField,
  sortingOrder
});

export { Sorting };
export default connect(mapStateToProps, dispatch => ({ sort: sort(dispatch) }))(
  Sorting
);

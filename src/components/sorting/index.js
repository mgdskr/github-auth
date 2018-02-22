import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sort } from '../../redux/modules/sort';
import { sortingOptions } from './sorting';

class Sorting extends Component {
  static defaultProps = {
    sortingObj: {
      sortingField: 'full_name',
      sortingOrder: 'asc'
    }
  };

  handlerOnSort = event => {
    const sortingType = [].find.call(
      event.target.childNodes,
      option => option.selected
    ).value;
    const sortingObj = sortingOptions[sortingType];
    sort(this.props.dispatch)(sortingObj);
  };

  render() {
    const { sortingObj: { sortingField, sortingOrder } } = this.props;

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

const mapStateToProps = ({ sorting: sortingObj }) => ({ sortingObj });

export { Sorting };
export default connect(mapStateToProps)(Sorting);

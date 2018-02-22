import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, defaultProps, setStatic, withHandlers } from 'recompose';
import { sort } from '../../redux/modules/sort';
import { sortingOptions } from './sorting';

const _defaultProps = {
  sortingField: 'full_name',
  sortingOrder: 'asc'
};

const propTypes = {
  sortingField: PropTypes.string,
  sortingOrder: PropTypes.string,
  sort: PropTypes.func
};

const handlerOnSort = ({ sort }) => event => {
  const sortingType = [].find.call(
    event.target.childNodes,
    option => option.selected
  ).value;
  const sortingObj = sortingOptions[sortingType];
  sort(sortingObj);
};

const Sorting = ({ sortingField, sortingOrder, handlerOnSort }) => {
  return (
    <div className="sortingContainer">
      <div className="sort">
        <label htmlFor="sorting">Sort</label>
        <select size="1" id="sorting" name="sorting" onChange={handlerOnSort}>
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
};

const enhance = compose(
  defaultProps(_defaultProps),
  setStatic('propTypes', propTypes),
  withHandlers({ handlerOnSort })
);

const enhancedSorting = enhance(Sorting);

const mapStateToProps = ({ sort: { sortingField, sortingOrder } }) => ({
  sortingField,
  sortingOrder
});

export { enhancedSorting };
export default connect(mapStateToProps, dispatch => ({ sort: sort(dispatch) }))(
  enhancedSorting
);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setStatic, withHandlers } from 'recompose';
import { filter } from '../../redux/modules/filters';
import './style.css';

const propTypes = {
  filterObj: PropTypes.shape({
    hasOpenIssues: PropTypes.bool,
    hasTopics: PropTypes.bool,
    starredGTXTimes: PropTypes.number,
    updatedAfter: PropTypes.string,
    type: PropTypes.string,
    lang: PropTypes.string
  }),
  languages: PropTypes.arrayOf(PropTypes.string)
};

const handlerOnFilterBy = ({ filterObj, dispatch }) => event => {
  const t = event.target;
  const $inputId = t.id;
  let {
    hasOpenIssues,
    hasTopics,
    starredGTXTimes,
    updatedAfter,
    type,
    lang
  } = filterObj;

  if ($inputId === 'hasOpenIssues') {
    hasOpenIssues = t.checked;
  } else if ($inputId === 'hasTopics') {
    hasTopics = t.checked;
  } else if ($inputId === 'starred') {
    starredGTXTimes = t.value;
  } else if ($inputId === 'updatedAfter') {
    updatedAfter = t.value;
  } else if ($inputId === 'type') {
    type = [].find
      .call(t.childNodes, option => option.selected)
      .value.toLowerCase();
  } else if ($inputId === 'language') {
    lang = [].find.call(t.childNodes, option => option.selected).value;
  }

  const newFilterObj = {
    hasOpenIssues,
    hasTopics,
    starredGTXTimes,
    updatedAfter,
    type,
    lang
  };

  filter(dispatch)(newFilterObj);
};

const Filters = ({ filterObj, languages, handlerOnFilterBy }) => {
  return (
    <div className="filtersContainer">
      <div className="filter">
        <input
          id="hasOpenIssues"
          type="checkbox"
          checked={filterObj.hasOpenIssues}
          onChange={handlerOnFilterBy}
        />
        <label className="checkbox" htmlFor="hasOpenIssues">
          Open issues
        </label>
      </div>

      <div className="filter">
        <input
          id="hasTopics"
          type="checkbox"
          checked={filterObj.hasTopics}
          onChange={handlerOnFilterBy}
        />
        <label className="checkbox" htmlFor="hasTopics">
          Topics
        </label>
      </div>

      <div className="filter">
        <label htmlFor="starred">Stars</label>
        <input
          id="starred"
          type="number"
          value={filterObj.starredGTXTimes}
          onInput={handlerOnFilterBy}
        />
      </div>

      <div className="filter">
        <label htmlFor="updatedAfter">Updated</label>
        <input
          id="updatedAfter"
          type="date"
          value={filterObj.updatedAfter}
          onChange={handlerOnFilterBy}
        />
      </div>
      <div className="filterSelect">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" size="1" onChange={handlerOnFilterBy}>
          {['All', 'Fork', 'Source'].map(type => (
            <option
              key={type}
              value={type}
              defaultValue={type.toLowerCase() === filterObj.type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filterSelect">
        <label htmlFor="language">Language</label>
        <select
          name="language"
          id="language"
          size="1"
          onChange={handlerOnFilterBy}
        >
          {languages.map(language => (
            <option
              key={language}
              value={language}
              defaultValue={language === filterObj.lang}
            >
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const enhance = compose(
  setStatic('propTypes', propTypes),
  withHandlers({ handlerOnFilterBy })
);

const enhancedFilters = enhance(Filters);

const mapStateToProps = ({ filters: filterObj, repos: { languages } }) => ({
  filterObj,
  languages
});

export { enhancedFilters };
export default connect(mapStateToProps)(enhancedFilters);

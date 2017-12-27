import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter } from '../../redux/modules/filters';
import './style.css';

class Filters extends Component {
  // handlerOnFilterBy = event => {console.log('!');};

  handlerOnFilterBy = event => {
    console.log('1');
    const t = event.target;
    const $inputId = t.id;
    // const $inputName = t.name;
    const filterObj = { ...this.props.filterObj };

    if ($inputId === 'hasOpenIssues') {
      filterObj.hasOpenIssues = t.checked;
    } else if ($inputId === 'hasTopics') {
      filterObj.hasTopics = t.checked;
    } else if ($inputId === 'starred') {
      filterObj.starredGTXTimes = t.value;
    } else if ($inputId === 'updatedAfter') {
      filterObj.updatedAfter = t.value;
    } else if ($inputId === 'type') {
      filterObj.type = [].find
        .call(t.childNodes, option => option.selected)
        .value.toLowerCase();
    } else if ($inputId === 'language') {
      filterObj.lang = [].find.call(
        t.childNodes,
        option => option.selected
      ).value;
    }

    filter(this.props.dispatch)(filterObj);
  };

  render() {
    const { filterObj, languages } = this.props;
    // const { filterObj } = this.props;
    // const languages = [];

    return (
      <div className="filtersContainer">
        <div className="filter">
          <input
            id="hasOpenIssues"
            type="checkbox"
            checked={filterObj.hasOpenIssues}
            onChange={this.handlerOnFilterBy}
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
            onChange={this.handlerOnFilterBy}
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
            onInput={this.handlerOnFilterBy}
          />
        </div>

        <div className="filter">
          <label htmlFor="updatedAfter">Updated</label>
          <input
            id="updatedAfter"
            type="date"
            value={filterObj.updatedAfter}
            onChange={this.handlerOnFilterBy}
          />
        </div>
        <div className="filterSelect">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            size="1"
            onChange={this.handlerOnFilterBy}
          >
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
            onChange={this.handlerOnFilterBy}
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
  }
}

const mapStateToProps = ({ filters, repos }) => ({
  filterObj: filters,
  languages: repos.languages
});

export { Filters };
export default connect(mapStateToProps)(Filters);

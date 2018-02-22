import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import {
  branch,
  compose,
  defaultProps,
  lifecycle,
  renderNothing,
  setStatic,
  withHandlers
} from 'recompose';
import { dialogClose } from '../../redux/modules/dialog';
import { getLanguagesShares } from '../../libs/utils';
import drawPieChart from '../../libs/drawPieChart';
import languageColors from '../../libs/language-colors';
import './style.css';

const _defaultProps = {
  dialogItem: {},
  isDialogOpen: false
};

const propTypes = {
  dialogItem: PropTypes.shape({
    fullName: PropTypes.string,
    htmlUrl: PropTypes.string,
    sourceUrl: PropTypes.string,
    sourceName: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        html_url: PropTypes.string,
        avatar_url: PropTypes.string,
        login: PropTypes.string,
        contributions: PropTypes.number,
        id: PropTypes.number
      })
    ),
    languages: PropTypes.object,
    pulls: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        html_url: PropTypes.string,
        id: PropTypes.number
      })
    )
  })
};

const handlerOnClose = ({ dialogClose }) => event => {
  if (
    event.target.id === 'dialogContainer' ||
    event.target.id === 'dialogClose'
  ) {
    dialogClose();
  }
};

const hideIfNoData = hasNoData => branch(hasNoData, renderNothing);

const SourceUrl = hideIfNoData(({ sourceUrl }) => !sourceUrl)(
  ({ sourceUrl, sourceName }) => (
    <span className="dialogSource">
      Forked from
      <a className="dialogSourceLink" href={sourceUrl}>
        {sourceName}
      </a>
    </span>
  )
);

const Contributors = hideIfNoData(({ contributors }) => !contributors.length)(
  ({ contributors }) => (
    <div>
      <h4>Contributors list</h4>
      <ul className="contributorsList">
        {contributors.map(
          ({ html_url, avatar_url, login, contributions, id }) => (
            <li className="contributor" key={id}>
              <img className="contributorAvatar" src={avatar_url} alt={login} />
              <div className="contributorDetails">
                <a className="contributorLink" href={html_url}>
                  {login}
                </a>
                <span className="contributions">{contributions} commits</span>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  )
);

const Pulls = hideIfNoData(({ pulls }) => !pulls.length)(({ pulls }) => (
  <div className="pullsContainer">
    <h4>Pull requests</h4>
    <ul className="pullsList">
      {pulls.map(({ title, html_url, id }) => (
        <li className="pullItem" key={id}>
          <a className="pullItemLink" href={html_url}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  </div>
));

const Languages = hideIfNoData(({ languagesInPercent }) => !languagesInPercent)(
  ({ languagesInPercent }) => (
    <div className="languagesContainer">
      <canvas id="pieChart" />
      <ul className="languagesList">
        {Object.keys(languagesInPercent).map(language => (
          <li className="language" key={language}>
            <i
              className="languageIcon"
              style={{
                backgroundColor:
                  language && languageColors[language]
                    ? languageColors[language].color
                    : '#586069'
              }}
            />
            {language}
            <span className="languageShare">
              {languagesInPercent[language].toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
);

const Dialog = hideIfNoData(({ isDialogOpen }) => !isDialogOpen)(
  ({
    handlerOnClose,
    languagesInPercent,
    fullName,
    htmlUrl,
    sourceUrl,
    sourceName,
    contributors,
    pulls
  }) => (
    <div
      id="dialogContainer"
      className="dialogContainer"
      onClick={handlerOnClose}
    >
      <div id="dialog" className="dialog">
        <span id="dialogClose" className="dialogClose">
          &times;
        </span>
        <a className="dialogTitle" href={htmlUrl}>
          <h3>{fullName}</h3>
        </a>
        <SourceUrl sourceUrl={sourceUrl} sourceName={sourceName} />
        <Languages languagesInPercent={languagesInPercent} />
        <div className="repoDetails">
          <Contributors contributors={contributors} />
          <Pulls pulls={pulls} />
        </div>
      </div>
    </div>
  )
);

function componentDidUpdate() {
  if (!this.props.isDialogOpen) return;
  drawPieChart(
    document.querySelector('#pieChart'),
    getLanguagesShares(this.props.languages)
  );
}

const enhance = compose(
  setStatic('propTypes', propTypes),
  defaultProps(_defaultProps),
  withHandlers({ handlerOnClose }),
  lifecycle({
    componentDidUpdate
  })
);

const enhancedDialog = enhance(Dialog);

const data = ({ dialog: { data } }) => data;
const repoId = ({ dialog: { repoId } }) => repoId;
const isDialogOpen = ({ dialog: { isDialogOpen } }) => isDialogOpen;

const selector = createSelector(
  data,
  repoId,
  isDialogOpen,
  (data, repoId, isDialogOpen) => {
    const dialogItem = data.find(({ id }) => id === repoId) || {};
    const languages = dialogItem.languages;

    return {
      languagesInPercent: languages && (getLanguagesShares(languages) || {}),
      ...dialogItem,
      isDialogOpen
    };
  }
);

export { enhancedDialog };
export default connect(selector, dispatch => ({
  dialogClose: dialogClose(dispatch)
}))(enhancedDialog);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dialogClose } from '../../redux/modules/dialog';
import { getLanguagesShares } from '../../libs/utils';
import drawPieChart from '../../libs/drawPieChart';
import languageColors from '../../libs/language-colors';
import './style.css';

class Dialog extends Component {
  static defaultProps = {
    dialogItem: {},
    isDialogOpen: false
  };

  static propTypes = {
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
          contributions: PropTypes.string,
          id: PropTypes.string
        })
      ),
      languages: PropTypes.object,
      pulls: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          html_url: PropTypes.string,
          id: PropTypes.string
        })
      )
    })
  };

  handlerOnClose = event => {
    if (
      event.target.id === 'dialogContainer' ||
      event.target.id === 'dialogClose'
    ) {
      this.props.dialogClose();
    }
  };

  componentDidUpdate() {
    if (!this.props.isDialogOpen) return;
    console.log('returned', document.querySelector('#pieChart'));

    drawPieChart(
      document.querySelector('#pieChart'),
      getLanguagesShares(this.props.dialogItem.languages)
    );
  }

  render() {
    const { dialogItem, isDialogOpen } = this.props;
    const {
      fullName,
      htmlUrl,
      sourceUrl,
      sourceName,
      contributors,
      languages,
      pulls
    } = dialogItem;

    if (!isDialogOpen) return null;

    console.log('rendered', dialogItem);

    const languagesInPercent = getLanguagesShares(languages) || {};

    return (
      <div
        id="dialogContainer"
        className="dialogContainer"
        onClick={this.handlerOnClose}
      >
        <div id="dialog" className="dialog">
          <span id="dialogClose" className="dialogClose">
            &times;
          </span>
          <a className="dialogTitle" href={htmlUrl}>
            <h3>{fullName}</h3>
          </a>
          {sourceUrl && (
            <span className="dialogSource">
              Forked from
              <a className="dialogSourceLink" href={sourceUrl}>
                {sourceName}
              </a>
            </span>
          )}

          {languagesInPercent && (
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
          )}

          <div className="repoDetails">
            {contributors && (
              <div>
                <h4>Contributors list</h4>
                <ul className="contributorsList">
                  {contributors.map(
                    ({ html_url, avatar_url, login, contributions, id }) => (
                      <li className="contributor" key={id}>
                        <img
                          className="contributorAvatar"
                          src={avatar_url}
                          alt={login}
                        />
                        <div className="contributorDetails">
                          <a className="contributorLink" href={html_url}>
                            {login}
                          </a>
                          <span className="contributions">
                            {contributions} commits
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {pulls.length ? (
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dialog: { data, repoId, isDialogOpen } }) => ({
  dialogItem: data.find(({ id }) => id === repoId),
  isDialogOpen
});

export { Dialog };
export default connect(mapStateToProps, dispatch => ({
  dialogClose: dialogClose(dispatch)
}))(Dialog);

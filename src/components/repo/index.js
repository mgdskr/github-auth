import React from 'react';
import PropTypes from 'prop-types';
import { compose, setStatic } from 'recompose';
import './style.css';
import languageColors from '../../libs/language-colors';

const propTypes = {
  repo: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    description: PropTypes.string,
    fork: PropTypes.boolean,
    stargazers_count: PropTypes.number,
    language: PropTypes.string,
    updated_at: PropTypes.string
  })
};

const Repo = ({
  repo: {
    id,
    full_name,
    description,
    fork,
    stargazers_count,
    language,
    updated_at
  },
  handlerOnOpenDialog
}) => {
  const languageColor = {
    backgroundColor:
      language && languageColors[language]
        ? languageColors[language].color
        : '#586069'
  };
  const stars =
    stargazers_count < 1000
      ? stargazers_count
      : (stargazers_count / 1000).toFixed(1) + 'k';

  return (
    <div className="repo" onClick={handlerOnOpenDialog(id)}>
      <h2 className="repoName">{full_name}</h2>
      <h3 className="repoDescription">{description}</h3>
      {fork && <span className="repoForked">Forked</span>}
      {stars && (
        <span className="repoStars">
          <i className="repoStarsIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              width="14px"
            >
              <path
                fillRule="evenodd"
                fill="#586069"
                d="M 14 6 l -4.9 -0.64 L 7 1 L 4.9 5.36 L 0 6 l 3.6 3.26 L 2.67 14 L 7 11.67 L 11.33 14 l -0.93 -4.74 Z"
              />
            </svg>
          </i>
          {stars}
        </span>
      )}
      <time className="repoUpdatedAt" dateTime={updated_at}>
        Updated at: {updated_at.slice(0, 10)}
      </time>
      {language && (
        <span className="repoLanguage">
          <i className="repoLanguageIcon" style={languageColor} />
          {language}
        </span>
      )}
    </div>
  );
};

export default compose(setStatic('propTypes', propTypes))(Repo);

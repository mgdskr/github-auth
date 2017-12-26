import React from 'react';
import style from './style.css';
import languageColors from '../../libs/language-colors';

const Repo = ({ repo }) => {
  console.log('repo', repo);

  const languageColor = {
    backgroundColor:
      repo.language && languageColors[repo.language]
        ? languageColors[repo.language].color
        : '#586069'
  };

  const stars =
    repo.stargazers_count < 1000
      ? repo.stargazers_count
      : (repo.stargazers_count / 1000).toFixed(1) + 'k';

  return (
    <div className={style.repo}>
      <h2 className={style.repoName}>{repo.full_name}</h2>
      <h3 className={style.repoDescription}>{repo.description}</h3>
      {repo.fork ? <span className={style.repoForked}>Forked</span> : null}
      {stars ? (
        <span className={style.repoStars}>
          <i className={style.repoStarsIcon}>
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
      ) : null}
      <time className={style.repoUpdatedAt} dateTime={repo.updated_at}>
        Updated at: {repo.updated_at.slice(0, 10)}
      </time>
      {repo.language ? (
        <span className={style.repoLanguage}>
          <i className={style.repoLanguageIcon} style={languageColor} />
          {repo.language}
        </span>
      ) : null}
    </div>
  );
};

export default Repo;

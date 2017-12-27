const sortingAlg = (x, y) => {
  if (typeof x === 'string' || typeof y === 'string') {
    x = x.toLowerCase();
    y = y.toLowerCase();
  }
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
};

const filterFunction = ({
  hasOpenIssues,
  hasTopics,
  starredGTXTimes,
  updatedAfter,
  type,
  lang
}) => item => {
  return (
    (hasOpenIssues ? item.open_issues_count > 0 : true) &&
    (hasTopics ? item.topics.length > 0 : true) &&
    item.stargazers_count >= starredGTXTimes &&
    item.updated_at > updatedAfter &&
    (lang === 'Any' ? true : item.language === lang) &&
    (type === 'fork'
      ? item.fork === true
      : type === 'source' ? item.fork === false : true)
  );
};

const sortingFunction = ({ sortingField, sortingOrder = 'asc' }) => (a, b) => {
  return sortingOrder === 'asc'
    ? sortingAlg(a[sortingField], b[sortingField])
    : sortingAlg(b[sortingField], a[sortingField]);
};

export { filterFunction, sortingFunction };

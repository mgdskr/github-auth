import languageColors from './language-colors';

const drawPieChart = ($piechart, languagesInPercent) => {
  console.log('gonna draw chart');
  console.log($piechart, languagesInPercent);
  $piechart.width = 150;
  $piechart.height = 150;
  const ctx = $piechart.getContext('2d');
  const initialShift = 1.5 * Math.PI;
  let shift = initialShift;
  const centerX = 75;
  const centerY = 75;
  const radius = 50;
  Object.keys(languagesInPercent).forEach((language, id) => {
    const share = languagesInPercent[language];
    const angle = share / 100 * 2 * Math.PI + shift;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, shift, angle);
    ctx.closePath();
    ctx.fillStyle = languageColors[language]
      ? languageColors[language].color
      : '#586069';
    ctx.strokeStyle = '#fff';
    ctx.fill();
    shift = angle;
  });
};

export default drawPieChart;

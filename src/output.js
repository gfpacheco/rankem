const fs = require('fs');

async function output(groupedRanks, scoresFilePath, ranksFilePath) {
  const scoresContent = await fs.promises.readFile(scoresFilePath);
  const flattenedRanks = [].concat(...groupedRanks);

  const ranksContent = scoresContent
    .toString()
    .split('\n')
    .map(string => {
      return (string && flattenedRanks.shift()) || '';
    });

  await fs.promises.writeFile(ranksFilePath, ranksContent.join('\n'));
}

module.exports = output;

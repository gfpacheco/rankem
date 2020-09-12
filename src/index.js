const readFile = require('./readFile');
const rank = require('./rank');
const compare = require('./compare');

async function run(scoresFilePath, ranksFilePath) {
  const groupedScores = await readFile(scoresFilePath);
  const groupedRanks = rank(groupedScores);
  const expectedGroupedRanks = await readFile(ranksFilePath);
  compare(groupedScores, groupedRanks, expectedGroupedRanks);
}

const [, , scoresFilePath, ranksFilePath] = process.argv;

run(scoresFilePath, ranksFilePath).catch(console.error);

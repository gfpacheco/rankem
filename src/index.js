const readFile = require('./readFile');
const rank = require('./rank');
const compare = require('./compare');
const output = require('./output');

async function run(scoresFilePath, test, ranksFilePath) {
  const groupedScores = await readFile(scoresFilePath);
  const groupedRanks = rank(groupedScores);

  if (test) {
    const expectedGroupedRanks = await readFile(ranksFilePath);
    compare(groupedScores, groupedRanks, expectedGroupedRanks);
  } else {
    output(groupedRanks, scoresFilePath, ranksFilePath);
  }
}

const [, , scoresFilePath, flag, ranksFilePath] = process.argv;

run(scoresFilePath, flag === '-t', ranksFilePath).catch(console.error);

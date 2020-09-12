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

if (!scoresFilePath || !['-t', '-o'].includes(flag) || !ranksFilePath) {
  console.log(`Usage: yarn start SCORES_FILE_PATH FLAG RANKS_FILE_PATH

    FLAG is one of:

        -t  test computed ranks against ranks from RANKS_FILE_PATH
        -o  output computed ranks to RANKS_FILE_PATH
`);
  return;
}

run(scoresFilePath, flag === '-t', ranksFilePath).catch(console.error);

const readFile = require('./readFile');
const rank = require('./rank');

async function run(scoresFilePath) {
  const groupedScores = await readFile(scoresFilePath);
  const groupedRanks = rank(groupedScores);
}

const [, , scoresFilePath] = process.argv;

run(scoresFilePath).catch(console.error);

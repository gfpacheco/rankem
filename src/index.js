const getData = require('./getData');

async function run(filePath) {
  const records = await getData(filePath);
  console.log(records);
}

const [, , filePath] = process.argv;

run(filePath).catch(console.error);

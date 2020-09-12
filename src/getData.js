const fs = require('fs');

async function getData(filePath) {
  const content = await fs.promises.readFile(filePath);

  let record = { scores: [], ranks: [] };
  return content
    .toString()
    .split('\n')
    .map(line => line.split('\t'))
    .reduce((records, [score, rank]) => {
      if (score) {
        record.scores.push(parseFloat(score.replace(',', '.')));
        record.ranks.push(rank ? parseInt(rank, 10) : 0);
      } else if (record.scores.length > 0) {
        records.push(record);
        record = { scores: [], ranks: [] };
      }

      return records;
    }, []);
}

module.exports = getData;

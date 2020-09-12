const fs = require('fs');

async function readFile(filePath) {
  const content = await fs.promises.readFile(filePath);

  let group = [];
  return content
    .toString()
    .split('\n')
    .reduce((groups, string) => {
      if (string) {
        group.push(parseFloat(string.replace(',', '.')));
      } else if (group.length > 0) {
        groups.push(group);
        group = [];
      }

      return groups;
    }, []);
}

module.exports = readFile;

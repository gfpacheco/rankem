function compare(groupedScores, groupedRanks, expectedGroupedRanks) {
  let errorCount = 0;

  groupedRanks.forEach((ranks, groupIndex) => {
    const expectedRanks = expectedGroupedRanks[groupIndex];

    if (ranks.some((rank, rankIndex) => rank !== expectedRanks[rankIndex])) {
      errorCount += 1;

      console.log(
        `Error:
    scores: [${groupedScores[groupIndex].join(', ')}]
  expected: [${expectedRanks.join(', ')}]
       got: [${ranks.join(', ')}]`,
      );
    }
  });

  console.log(`${errorCount || 'No'} errors found`);
}

module.exports = compare;

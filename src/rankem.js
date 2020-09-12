const initialTolerance = 0.26;
const defaultTolerance = 0.15;

function rankem(groupedScores) {
  return groupedScores.map(scores => {
    let currentScore = Number.MAX_SAFE_INTEGER;
    let currentRank = 0;

    return scores.map((score, index) => {
      if (7 - score > initialTolerance) {
        return 0;
      }

      let minRank;
      if (8 - score > initialTolerance) {
        minRank = Math.max(currentRank, 3);
      } else if (9 - score > initialTolerance) {
        minRank = Math.max(currentRank, 2);
      } else {
        minRank = Math.max(currentRank, 1);
      }

      const tolerance =
        currentScore === Number.MAX_SAFE_INTEGER ? initialTolerance : defaultTolerance;

      const isFarFromCurrentScore = currentScore - score > tolerance;
      const isCloserToNextScore =
        index < scores.length - 1 &&
        currentScore - scores[index + 1] > tolerance &&
        currentScore - score > score - scores[index + 1];

      if (isFarFromCurrentScore || isCloserToNextScore) {
        currentRank = Math.max(currentRank + 1, minRank);
        currentScore = score;
      }

      return currentRank > 3 ? 0 : currentRank;
    });
  });
}

module.exports = rankem;

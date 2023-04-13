export const getScores = async (gameID) => {
  const result = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return result;
};

export const addScores = async (gameID, user, scores) => {
  const result = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`, {
    method: 'POST',
    body: JSON.stringify({ user, score: scores }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return result;
};
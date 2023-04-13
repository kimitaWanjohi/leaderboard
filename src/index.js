import './input.css';
import './style.css';
import createGame from './module/createGame.js';
import { addScores, getScores } from './module/scores.js';

const form = document.getElementById('form');
const refresh = document.getElementById('refresh');

const getGameID = async () => {
  if (localStorage.getItem('gameID')) {
    return localStorage.getItem('gameID');
  }
  let id;
  const game = await createGame('My Game');
  const gameJSON = await game.json();
  const gameID = gameJSON.result;
  const regex = /ID: (\w+)/;
  const match = regex.exec(gameID);

  if (match) {
    id = match[1];
    localStorage.setItem('gameID', id);
  }
  return id;
};

const retriveScores = async (gameID) => {
  const scores = await getScores(gameID);
  const scoresJSON = await scores.json();
  const scoresList = scoresJSON.result;
  const scoresListArray = Object.values(scoresList);
  const scoresListArraySort = scoresListArray.sort((a, b) => b.score - a.score);
  const scoresListArraySortLimit = scoresListArraySort.slice(0, 5);
  const scoresListArraySortLimitMap = scoresListArraySortLimit.map((score) => {
    const { user } = score;
    const scoreValue = score.score;
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <tr class="bg-gray-100">
                <td class="border px-4 py-2">${user}</td>
                <td class="border px-4 py-2">${scoreValue}</td>
            </tr>`;
    return tr;
  });
  const table = document.getElementById('scoreList');
  table.innerHTML = '';
  scoresListArraySortLimitMap.forEach((tr) => {
    table.appendChild(tr);
  });
};

const postScores = (gameID, user, score) => {
  addScores(gameID, user, score);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('name').value;
  const score = document.getElementById('score').value;
  getGameID().then((gameID) => {
    postScores(gameID, user, score);
    form.reset();
  });
});

refresh.addEventListener('click', () => {
  getGameID().then((gameID) => {
    retriveScores(gameID);
  });
});

getGameID().then((gameID) => {
  retriveScores(gameID);
});
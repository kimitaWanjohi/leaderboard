import './input.css';
import './style.css';
import {createGame} from './module/createGame.js';

const getGameID = async () => {
    const game = await createGame('My Game');
    const gameJSON = await game.json();
    const gameID = gameJSON['result'];
    const regex = /ID: (\w+)/;
    const match = regex.exec(gameID);

    if (match) {
    const id = match[1];
    localStorage.setItem('gameID', id);
    return id;
    }
}

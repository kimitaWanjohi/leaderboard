export const createGame = async (game) => {
    const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
        method: 'POST',
        body: JSON.stringify({ name: game }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return result;
}
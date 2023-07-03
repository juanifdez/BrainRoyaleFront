import axios from 'axios';

export const SERVER_URL = 'https://brainroyale-backend.onrender.com'
console.log('SERVER_URL:', SERVER_URL);

export const getCategories = async () => {
  try {
    const url = `${SERVER_URL}/categories`;
    const response = await axios.get(url);
  return response.data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getBoard = async () => {
  try {
  const url = `${SERVER_URL}/boards`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
    console.error('Error getting board:', error);
    throw error;
  }
};

export const getSquare = async (id) => {
  try {
  const url = `${SERVER_URL}/boards/${id}`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
    console.error('Error getting board:', error);
    throw error;
  }
};

export const getCard = async (categoryId) => {
  try {
  const url = `${SERVER_URL}/cards/${categoryId}`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
  console.error('Error getting card:', error);
  throw error;
  }
};

export const createUser = async (userName, passWord) => {
  const url = `${SERVER_URL}/users`;
  const body = {
    username: userName,
    password: passWord,
  };
  try {
    const response = await axios.post(url, body);
    const userId = response.data.id;
    return userId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error
  }
};

export const getUsers = async () => {
  try {
  const url = `${SERVER_URL}/users`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
  console.error('Error getting users:', error);
  throw error;
  }
};

export const getUser = async (userId) => {
  try {
  const url = `${SERVER_URL}/users/${userId}`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
  console.error('Error getting user:', error);
  throw error;
  }
};

export const createGame = async (userId, playersNumber) => {
  const url = `${SERVER_URL}/games`;
  const body = {
    user_id: userId,
    players: playersNumber,
  };
  try {
    const response = await axios.post(url, body);
    const gameId = response.data.id;
    return gameId;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error
  }
};

export const getGame = async (gameId) => {
  try{
  const url = `${SERVER_URL}/games/${gameId}`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
    console.error('Error getting game:', error);
    throw error;
  }
};

export const updateGame = async (gameId) => {
  const url = `${SERVER_URL}/games/${gameId}`;
  try {
    await axios.put(url, {});
  } catch (error) {
    console.error('Error updating game:', error);
    throw error;
  }
};

export const createPlayer = async (gameId, playerNumber, categoryId) => {
  const url = `${SERVER_URL}/players`;
  const body = {
    game_id: gameId,
    number: playerNumber,
    category_id: categoryId,
  };
  try {
    const response = await axios.post(url, body);
    const playerId = response.data.id;
    return playerId;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error
  }
};

export const getPlayer = async (gameId, playerNumber) => {
  try{
  const url = `${SERVER_URL}/players/${gameId}/${playerNumber}`;
  const response = await axios.get(url);
  return response.data;
  } catch (error) {
    console.error('Error getting player:', error);
    throw error;
  }
};

export const updatePosition = async (playerId, newPosition) => {
  const url = `${SERVER_URL}/players/${playerId}`;
  const body = {
    position: newPosition
  };
  try {
    console.log('New position:', newPosition);
    await axios.put(url, body);
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};

export const updateBrains = async (playerId, brainChange) => {
  const url = `${SERVER_URL}/players/brain/${playerId}`;
  const body = {
    brain_change: brainChange
  };
  try {
    await axios.put(url, body);
  } catch (error) {
    console.error('Error updating brains:', error);
    throw error;
  }
};

export const updateSkip = async (playerId) => {
  const url = `${SERVER_URL}/players/skip/${playerId}`;
  try {
    await axios.put(url, {});
  } catch (error) {
    console.error('Error updating skip:', error);
    throw error;
  }
};
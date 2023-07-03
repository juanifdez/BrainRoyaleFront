import React, { useState, useEffect } from 'react';
import './Game.css';
import { getCategories, createGame, createPlayer } from '../Comunications';
import Board from './Board';

export default function Players({ onStartGame }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [playerAssignments, setPlayerAssignments] = useState([]);
  const [error, setError] = useState('');
  const [gameId, setGameId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleDecrease = () => {
    if (numberOfPlayers > 2) {
      setNumberOfPlayers(numberOfPlayers - 1);
      setError('');
    }
  };

  const handleIncrease = () => {
    if (numberOfPlayers < 4) {
      setNumberOfPlayers(numberOfPlayers + 1);
      setError('');
    }
  };

  const handleCategorySelection = (category, playerNumber) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      updatedCategories[playerNumber - 1] = category;
      return updatedCategories;
    });
    setPlayerAssignments((prevAssignments) => {
      const updatedAssignments = [...prevAssignments];
      updatedAssignments[playerNumber - 1] = {
        category: category,
        playerNumber: playerNumber,
      };
      return updatedAssignments;
    });
    setError('');
  };

  const handleStartGame = async () => {
    if (selectedCategories.length < numberOfPlayers) {
      setError('Selecciona una categoría para cada jugador.');
    } else {
      try {
        const gameId = await createGame(1, numberOfPlayers); // Cambiar por ID del usuario en sesión
        onStartGame(gameId);
  
        for (let playerNumber = 1; playerNumber <= numberOfPlayers; playerNumber++) {
          const assignment = playerAssignments[playerNumber - 1];
          const categoryId = assignment.category.split('. ')[0];
          await createPlayer(gameId, playerNumber, categoryId);
        }
        
        setGameId(gameId);
        setGameStarted(true); 
      } catch (error) {
        console.error('Error al crear partida:', error);
        setError('Error al crear partida. Por favor, inténtalo de nuevo.');
      }
    }
  };
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategoryNames(categories);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };

    fetchCategories();
    setNumberOfPlayers(2);
    setSelectedCategories([]);
  }, []);

  return (
    <div className="block">
      <h1>Brain Royale: Crear Partida</h1>
      <img src="logos/logo.png" id="logo" width="200" height="200" />

      {!gameStarted ? (
        <div>
          <p>Selecciona el número de jugadores:</p>
          <div className="number-input">
            <button onClick={handleDecrease}>-</button>
            <input type="number" min="2" max="4" value={numberOfPlayers} readOnly />
            <button onClick={handleIncrease}>+</button>
          </div>

          <p>Selecciona las categorías para cada jugador:</p>

          {Array.from({ length: numberOfPlayers }).map((_, index) => (
            <div key={index}>
              <p>Jugador {index + 1}:</p>
              <div className="category-selection">
                <select
                  value={selectedCategories[index]}
                  onChange={(e) => handleCategorySelection(e.target.value, index + 1)}
                >
                  <option value="">Seleccione una categoría</option>
                  {categoryNames.slice(0, -2).map((category) => (
                    <option key={category.id} value={`${category.id}. ${category.name}`}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <p>Esta elección es importante porque cada jugador podrá saltarse una pregunta de su categoría una vez en la partida.</p>
          {error && <p className="error">{error}</p>}
          <p> </p>
          <a onClick={handleStartGame}>
            <button>Comenzar Partida</button>
          </a>
        </div>
      ) : (
        <Board gameId={gameId} />
      )}
    </div>
  );
}

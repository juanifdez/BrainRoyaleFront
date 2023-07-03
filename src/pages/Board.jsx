import React, { useState, useEffect } from 'react';
import './Board.css';
import { getBoard, getCategories, getPlayer, getGame, updatePosition, updateGame } from '../Comunications';
import RollDice from '../components/RollDice'

export default function Board({ gameId }) {
  const [cells, setCells] = useState([]);
  const [categories, setCategories] = useState([]);
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState(null);
  const [diceResult, setDiceResult] = useState([0, 0]);

  useEffect(() => {
    const fetchGameData = async (gameId) => {
      try {
        const gameData = await getGame(gameId);
        setGame(gameData);
      } catch (error) {
        console.error('Error getting game:', error);
      }
    };
  
    if (gameId) {
      fetchGameData(gameId);
    }
  }, [gameId]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardData = await getBoard();
        setCells(boardData);
      } catch (error) {
        console.error('Error getting board data:', error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
  
    if (gameId) {
      fetchBoardData();
      fetchCategories();
    }
  }, [gameId]);
  
  useEffect(() => {
    const fetchPlayers = async (game) => {
      try {
        const playerData = [];
        for (let playerNumber = 1; playerNumber <= game?.players; playerNumber++) {
          const player = await getPlayer(game?.id, playerNumber);
          playerData.push(player);
        }
        setPlayers(playerData);
      } catch (error) {
        console.error('Error getting players:', error);
      }
    };

    if (game) {
      fetchPlayers(game);
    }
  }, [game]);
   
  const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  };

  const handleRollDice = (result1, result2) => {
    setDiceResult([result1, result2]);
  
    const currentPlayer = players[game.turn - 1];
    let newPosition = currentPlayer.board_id + numberMap[result1] + numberMap[result2];
  
    if (newPosition >= cells.length) {
      newPosition = cells.length;
      const winnerPlayer = players[game.turn - 1];
      alert(`Juego finalizado: Ganador - Jugador ${winnerPlayer.number}`);
    }
    updatePosition(currentPlayer.id, newPosition)
    .then(() => {
      handleQuestion();
    })
    .catch((error) => {
      console.error('Error updating position:', error);
      throw error;
    });
};

  const handleQuestion = () => {
    console.log('Handling question...');
    let answer = false;
    handleNewTurn(answer);
  };

  const handleNewTurn = (answer) => {
    if (answer === false) {
      updateGame(gameId)
    }
  };

  return (
    <div className="board">
      <h1>
        <img src="logos/logo.png" width="50" height="50" /> Brain Royale {' '}
        <img src="logos/logo.png" width="50" height="50" />
      </h1>
      {game && <h2>TURNO: JUGADOR {game.turn}</h2>}
      <RollDice updateDiceResult={handleRollDice} />
      <div className="grid">
      {cells.map((cell, index) => {
      const category = categories[cell.category_id - 1];
      const cellClassName = category ? category.name : '';

      return (
        <div
          key={index}
          className={`cell ${cellClassName}`}
          style={{ backgroundColor: category?.color }}
        >
          <img
            src={`logos/logo_${category?.name}.png`}
            alt={category?.name}
            className="category-logo"
            width="80"
            height="80"
          />
        </div>
      );
      })}
      </div>

      <div className="players">
        {cells.map((cell, index) => {
          const category = categories[cell.category_id - 1];
          const cellClassName = category ? category.name : '';

          const playersInCell = players.filter((player) => player.board_id === cell.id);

          return (
            <div
              key={index}
              className={`cell ${cellClassName}`}
              style={{
                backgroundColor: category?.color,
                borderColor: 'transparent',
                display: 'flex',
              }}
            >
              {playersInCell.map((player) => (
                <img
                  key={player.number}
                  src={`fichas/ficha_${player.category_id}.png`}
                  alt={`Ficha del Jugador ${player.number}`}
                  className="player-token"
                  width="80"
                  height="80"
                  style={{ marginRight: '5px' }}
                />
              ))}
            </div>
          );
        })}
      </div>


      <div className="player-sidebar">
      {players.map((player) => (
        <div key={player.number} className="player-sidebar-item">
          <h2>JUGADOR {player.number} <img
              src={`fichas/ficha_${player.category_id}.png`}
              alt={`Ficha ${player.category_id}`}
              width="20"
              height="15"
            /></h2>
          <p>
          <h3>PASO: {player.skip === 0 ? 'NO OCUPADO' : 'OCUPADO'}</h3> 
          </p>
            <p>
            <h3>FICHAS CEREBRO: {player.brain}</h3> 
          </p>
          <br></br>
        </div>
      ))}
    </div>
    </div>
  );
}

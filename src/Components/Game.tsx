import React, { useState } from 'react'

interface SquareProps{
    value: string | null;
    onSquareClick?: React.MouseEventHandler<HTMLButtonElement>; //sets it to just work as an onclick button default.
}

function Square({value,onSquareClick}: SquareProps)
{
    return <button className='square' onClick={onSquareClick}>{value}</button>
}

const Game = () => {

    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null)); //creates an empty array with 9 empty elements 

    function handleClick(i: number)
    {
        const nextSquares = squares.slice();
        nextSquares[i] = 'X';
        setSquares(nextSquares);
    }

  return (
    <>
        <div className='board-row'>
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className='board-row'>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className='board-row'>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
 
    </>
  )
}

export default Game

import React, { useState } from 'react'

interface SquareProps{
    value: string | null;
    onSquareClick?: React.MouseEventHandler<HTMLButtonElement>; //sets it to just work as an onclick button default.
}

function Square({value,onSquareClick}: SquareProps)
{
    return <button className='square' onClick={onSquareClick}>{value}</button>
}

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null)); //creates an empty array with 9 empty elements 

    function handleClick(i: number)
    {
        if(squares[i] || calulateWinner(squares))
        {
            return;
        }

        const nextSquares = squares.slice();
        if(xIsNext)
        {
            nextSquares[i] = 'X';
        }
        else
        {
            nextSquares[i] = 'O'
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext)
    }

    const winner = calulateWinner(squares);
    let status;
    if(winner)
    {
        status = 'Winner: ' + winner;
    }
    else
    {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

  return (
    <>
    <div className='status'>{status}</div>
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

function Game()
{
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHisory] = useState<(string | null)[]>(Array(9).fill(null));
    const currentSquares = history[history.length - 1]

    function handlePlay(nextSquares){

    }

    return(
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol></ol>
            </div>
        </div>
    )
}


function calulateWinner(squares: (string | null)[])
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++)
    {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

export default Game

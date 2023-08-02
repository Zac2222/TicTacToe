import React, { useState } from 'react'

interface SquareProps{
    value: string | null;
    color: string;
    onSquareClick?: React.MouseEventHandler<HTMLButtonElement>; //sets it to just work as an onclick button default.
}

interface BoardProps {
    xIsNext: boolean;
    squares: (string | null)[];
    onPlay: (nextSquares: (string | null)[]) => void;
}

function Square({value,color,onSquareClick}: SquareProps)
{
    return <button className='square' style={{backgroundColor: color}} onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext,squares,onPlay}:BoardProps) {
    // const [xIsNext, setXIsNext] = useState(true)
    // const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null)); 
    const [colors, setColors] = useState<string[]>(Array(9).fill('white'));
    

    function handleClick(i: number)
    {
        if(squares[i] || calulateWinner(squares))
        {
            return;
        }

        const nextSquares = squares.slice();
        const nextColors = colors.slice();
        if(xIsNext)
        {
            nextSquares[i] = 'X';
            nextColors[i] = 'blue';
        }
        else
        {
            nextSquares[i] = 'O'
            nextColors[i] = 'violet';
        }
        onPlay(nextSquares)
        setColors(nextColors);
    }

    const winner = calulateWinner(squares);
    let status;
    if(winner === 'X')
    {
        status = 'Winner: ' + winner;
        document.body.classList.add('winner-x');
    }
    else if(winner === 'O')
    {
        status = 'Winner: ' + winner;
        document.body.classList.add('winner-o');
    }
    else
    {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
        document.body.classList.remove('winner-x');
        document.body.classList.remove('winner-o');
    }

  return (
    <>
    <div className='status'>{status}</div>
        <div className='board-row'>
            <Square value={squares[0]} color={colors[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} color={colors[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} color={colors[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className='board-row'>
            <Square value={squares[3]}  color={colors[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]}  color={colors[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]}  color={colors[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className='board-row'>
            <Square value={squares[6]} color={colors[6]}  onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} color={colors[7]}  onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} color={colors[8]}  onSquareClick={() => handleClick(8)}/>
        </div>
 
    </>
  )
}

const Game = () => {

    type SquaresArray = (string | null)[]

    // const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState<SquaresArray[]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: SquaresArray){ 
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: (number)){ 
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) =>{
        let description = '';
        if(move > 0)
        {
            description = 'Go to move #' + move;
        }
        else
        {
            description = 'Go to game start';
        }
        return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return(
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    )

    //left the colors the same on purpose after going back to previous moves.
    //i thought being able to see the colored squares of where each one went and then being able to write over them is a cool feature.
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

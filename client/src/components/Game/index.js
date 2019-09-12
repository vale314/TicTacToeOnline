import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import ChatContext from '../../context/chat/chatContext';

import { Button } from 'reactstrap';


const socket = io('http://localhost:5000');

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


const Board = () => {

    const chatContext = useContext(ChatContext);


    const [state, setState] = useState({
        squares: Array(9).fill(null),
        xIsNext: true,
        status: ''
    });

    const { squares, xIsNext, status } = state;
    const { id_room } = chatContext;

    useEffect(() => {
        socket.emit('login-room', id_room);
    }, [id_room]);

    useEffect(() => {
        
        socket.on('online-game-room', payload => {

            setState({ ...state, squares: payload.body});

        });
        

        // eslint-disable-next-line
    }, []);

    const handleClick = (i) => {
        const squaresS = squares.slice();
        if (calculateWinner(squaresS) || squaresS[i]) {
            return;
        }
        squaresS[i] = xIsNext ? 'X' : 'O';
        setState({
            ...state,
            squares: squaresS,
        });

        socket.emit('online-game-room', {
            room: id_room,
            data: squaresS
        });
    }

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
            />
        );
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }


    const render = () => {
        const winner = calculateWinner(squares);
        if (winner) {
            setState({ ...state, status: 'Winner: ' + winner });
        } else {
            setState({ ...state, status: 'Winner: ' + 'Next player: ' + (xIsNext ? 'X' : 'O') });
        }
    }

    const onClickChange = () => {
        setState({ ...state, xIsNext: !xIsNext })
        localStorage.setItem('word',!xIsNext);
    }


    return (
        <div>
            <div>
                {render}
                <div className="status">{status}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <Button color="primary" onClick={onClickChange} value={xIsNext}>Exit</Button>
            <h1> {xIsNext ? <div>X</div> : <div>O</div>} </h1>
        </div>
    );
}


export default Board;
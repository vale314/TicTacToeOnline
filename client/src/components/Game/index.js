import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import ChatContext from '../../context/chat/chatContext';
import packageJson from '../../../package.json';

import './styles.css'

// import { Button } from 'reactstrap';


const socket = io(packageJson.proxy);

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


const Board = () => {

    const chatContext = useContext(ChatContext);

    const { id_room, isX } = chatContext;
    
    const [state, setState] = useState({
        squares: Array(9).fill(null),
        xIsNext: isX,
        status: ''
    });
    
    const { squares, status } = state;

    useEffect(() => {
        socket.emit('login-room', id_room);
    }, [id_room]);

    useEffect(() => {
        
        socket.on('online-game-room', payload => {

            setState({ ...state, squares: payload.body});
            return()=>{
                socket.close()
            }
        });
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        render();
         // eslint-disable-next-line
    },[squares])

    const handleClick = (i) => {
        const squaresS = squares.slice();
        if (calculateWinner(squaresS) || squaresS[i]) {
            return;
        }
        squaresS[i] = isX ? 'X' : 'O';
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
        }
    }

    // const onClickChange = () => {
    //     chatContext.changeVar(!isX)
    // }


    return (
        <div>
            <div>
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
            {/* <Button color="primary" onClick={onClickChange} value={isX}>Cambiar</Button> */}
            <h1> {isX ? <div>X</div> : <div>O</div>} </h1>
        </div>
    );
}


export default Board;
import React from "react";
import "./style.css";

function Square(props) {
    return (
        <button
            className={"square " + (props.isWinning ? "square--winning" : null)}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                isWinning={this.props.winningSquares.includes(i)}
                key={"square " + i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquares(n) {
        let squares = [];
        for (let i = n; i < n + 3; i++) {
            squares.push(this.renderSquare(i));
        }
        return squares;
    }

    renderRows(i) {
        return <div className="board-row">{this.renderSquares(i)}</div>;
    }

    render() {
        return (
            <div>
                {this.renderRows(0)}
                {this.renderRows(3)}
                {this.renderRows(6)}
            </div>
        );
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    location: locations[i]
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = "Ganador: " + winner.player;
        } else if (!current.squares.includes(null)) {
            status = "No Hay Ganador";
        } else {
            status = "Siguiente Jugador: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game mt-5 d-flex justify-content-center">
                <div className="game-board mt-5">
                    <Board
                        winningSquares={winner ? winner.line : []}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }
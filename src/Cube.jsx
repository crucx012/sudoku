import React from 'react';
import Square from './Square.jsx';

class Cube extends React.Component {
  render() {
    const {color, onClick, state, topLeft} = this.props;
    let rows = [];
    for (let i = 0; i < state.size; i++) {
      rows.push(this.getRow(topLeft[0], topLeft[1]+i, color, onClick, state))
    }
    return (
      <div className="cube">
        {rows}
      </div>
    );
  }

  getRow(column, row, color, onClick, state) {
    let squares = [];
    for (let i = 0; i < state.size; i++) {
      const index = state.board.findIndex((sqr) => sqr.column === (column + i) && sqr.row === row);
      squares.push(<Square key={`square_${column+i}${row}`} color={color} onClick={onClick} square={state.board[index]} selected={state.selected} />);
    }
    return (
      <div key={`row${column}_${row}`} className="container">
        {squares}
      </div>
    )
  }
}

export default Cube;

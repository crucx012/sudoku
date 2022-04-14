import React from 'react';
import Square from './Square.jsx';

class Cube extends React.Component {
  render() {
    const {color, onClick, state, topLeft} = this.props;
    return (
      <div className="cube">
        {this.getRow(topLeft[0], topLeft[1], color, onClick, state)}
        {this.getRow(topLeft[0], topLeft[1]+1, color, onClick, state)}
        {this.getRow(topLeft[0], topLeft[1]+2, color, onClick, state)}
      </div>
    );
  }

  getRow(column, row, color, onClick, state) {
    const index1 = state.board.findIndex((sqr) => sqr.column === column && sqr.row === row);
    const index2 = state.board.findIndex((sqr) => sqr.column === column + 1 && sqr.row === row);
    const index3 = state.board.findIndex((sqr) => sqr.column === column + 2 && sqr.row === row);
    return (
      <div className="container">
        <Square color={color} onClick={onClick} square={state.board[index1]} selected={state.selected} />
        <Square color={color} onClick={onClick} square={state.board[index2]} selected={state.selected} />
        <Square color={color} onClick={onClick} square={state.board[index3]} selected={state.selected} />
      </div>
    )
  }
}

export default Cube;

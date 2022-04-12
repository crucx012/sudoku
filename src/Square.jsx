import React from 'react';

class Square extends React.Component {
  render() {
    let {column: col, row, color, state, index} = this.props;
    const id = `${index}${col}${row}`;
    let value = 0;
    if (state.board) {
      value = state.board[row-1][col-1];
    }
    if (value === 0) {
      value = "";
    }
    if (value === state.selected) {
      color = "lightYellow";
    }
    return (
      <div id={id} className={`square ${color}`} onClick={() => this.props.onClick(this.props.column, this.props.row)}>
        <div className="noselect">{value}</div>
      </div>
    );
  }
}

export default Square;

import React from 'react';

class Square extends React.Component {
  render() {
    let {color, square, state} = this.props;
    let value = 0;
    let textColor = "";
    if (square) {
      value = square.value;
    }
    if (value === 0) {
      value = "";
    }
    if (square.hasError) {
      textColor = "red";
    } else if (state.numberSelected !== null && value === state.numberSelected) {
      color = "lightYellow";
    } else if (state.squareSelected !== null && (square.column === state.squareSelected.column || square.row === state.squareSelected.row || square.cube === state.squareSelected.cube)) {
      color = "lightYellow";
    }
    return (
      <div id={`${square.column}${square.row}`} className={`square ${color} ${textColor}`} onClick={() => this.props.onClick(square)}>
        <div className="noselect">{value}</div>
      </div>
    );
  }
}

export default Square;

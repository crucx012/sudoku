import React from 'react';

class Square extends React.Component {
  render() {
    let {color, square, selected} = this.props;
    let value = 0;
    if (square) {
      value = square.value;
    }
    if (value === 0) {
      value = "";
    }
    if (value === selected) {
      color = "lightYellow";
    }
    return (
      <div id={`${square.column}${square.row}`} className={`square ${color}`} onClick={() => this.props.onClick(square.column, square.row)}>
        <div className="noselect">{value}</div>
      </div>
    );
  }
}

export default Square;

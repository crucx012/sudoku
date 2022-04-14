import React from 'react';

class Square extends React.Component {
  render() {
    let {color, square, selected} = this.props;
    let value = 0;
    let textColor = "";
    if (square) {
      value = square.value;
    }
    if (value === 0) {
      value = "";
    } else if (square.hasError) {
      textColor = "red";
    } else if (value === selected) {
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

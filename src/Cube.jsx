import React from 'react';
import Square from './Square.jsx';

class Cube extends React.Component {
  render() {
    const {color, onClick, index, state} = this.props;
    const baseRow = this.getBaseRow(index);
    const baseColumn = this.getBaseColumn(index);
    return (
      <div className="cube">
        <div className="container">
          <Square color={color} onClick={onClick} index={index} column={baseColumn} row={baseRow} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+1} row={baseRow} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+2} row={baseRow} state={state} />
        </div>
        <div className="container">
          <Square color={color} onClick={onClick} index={index} column={baseColumn} row={baseRow+1} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+1} row={baseRow+1} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+2} row={baseRow+1} state={state} />
        </div>
        <div className="container">
          <Square color={color} onClick={onClick} index={index} column={baseColumn} row={baseRow+2} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+1} row={baseRow+2} state={state} />
          <Square color={color} onClick={onClick} index={index} column={baseColumn+2} row={baseRow+2} state={state} />
        </div>
      </div>
    );
  }

  getBaseRow(index) {
    return this.props.index <= 3 ? 1 : this.props.index <= 6 ? 4 : 7;
  }

  getBaseColumn(index) {
    return this.props.index % 3 === 1 ? 1 : this.props.index % 3 === 2 ? 4 : 7;
  }
}

export default Cube;

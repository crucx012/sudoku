import React from 'react';
import Cube from './Cube.jsx';
import Selector from './Selector.jsx';
import './styles/main.css';

const modes = ['Square First','Number First'];
let numbers = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 1; i <= Math.pow(props.size,2); i++){
      numbers.push(i);
    }
    const board = this.getEmptyBoard(props.size)
    this.state = {
      size: props.size,
      numberSelected: 1,
      squareSelected: null,
      board: board,
      mode: modes[1]
    };
    this.handleSelectionChangeClick = this.handleSelectionChangeClick.bind(this);
    this.handleBoardSquareClick = this.handleBoardSquareClick.bind(this);
  }

  handleModeChangeClick() {
    const index = modes.findIndex((val) => val === this.state.mode);
    const nextIndex = (index+1)%modes.length;
    const newMode = modes[nextIndex];
    this.setState({
      mode: newMode,
      numberSelected: null,
      squareSelected: null
    });
  }

  handleSelectionChangeClick(val) {
    if (this.state.mode === modes[0]) {
      this.setSquare(this.state.squareSelected, val);
    } else if (this.state.mode === modes[1]) {
      this.setState({
        numberSelected: val
      });
    }
  }

  handleBoardSquareClick(square) {
    if (this.state.mode === modes[0]) {
      this.setState({
        squareSelected: square
      });
    } else if (this.state.mode === modes[1]) {
      this.setSquare(square, this.state.numberSelected);
    }
  }

  setSquare(square, val) {
    const index = this.state.board.findIndex((sqr) => sqr.column === square.column && sqr.row === square.row);
    if (index >= 0) {
      let squares = this.state.board;
      let updatedSquare = squares[index];
      if (updatedSquare.value !== val) {
        updatedSquare.value = val;
      } else {
        updatedSquare.value = 0;
      }
      squares[index] = updatedSquare;
      this.setState({
        board: squares
      });
    this.checkErrors();
    }
  }

  checkErrors() {
    let newSquares = this.state.board;
    newSquares.forEach((sqr) => {
      const index = this.state.board.findIndex((s) => s.column === sqr.column && s.row === sqr.row);
      let updatedSquare = newSquares[index];
      const row = newSquares.filter((s) => sqr.row === s.row);
      const column = newSquares.filter((s) => sqr.column === s.column);
      const cube = newSquares.filter((s) => sqr.cube === s.cube);
      updatedSquare.hasError = sqr.value > 0 && (this.hasDuplicateValue(sqr, row) || this.hasDuplicateValue(sqr, column) || this.hasDuplicateValue(sqr, cube));
      updatedSquare.possible = this.getPossibleNumbers(sqr, row, column, cube);
      newSquares[index] = updatedSquare;
    });
    this.setState({
      board: newSquares
    });
  }

  getPossibleNumbers(square, row, column, cube) {
    let possible = numbers.slice();
    row = row.filter((sqr) => sqr.value > 0 && sqr !== square).map((sqr) => {return sqr.value})
    column = column.filter((sqr) => sqr.value > 0 && sqr !== square).map((sqr) => {return sqr.value});
    cube = cube.filter((sqr) => sqr.value > 0 && sqr !== square).map((sqr) => {return sqr.value});
    let values = row.concat(column).concat(cube);
    possible = possible.filter((n) => {return !values.includes(n)});
    return possible;
  }

  hasDuplicateValue(square, collection) {
    const duplicates = collection.filter((sqr) => {
      if (sqr.value === square.value) {
        return true;
      }
      return false;
    })
    return duplicates.length > 1;
  }

  getEmptyBoard(size) {
    const max = Math.pow(size,2);
    let board = [];
    for (let cube = 0; cube < max; cube++) {
      const topLeft = this.getTopLeft(cube, size);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          board.push(this.Square(topLeft[0]+i,topLeft[1]+j, cube));
        }
      }
    };
    return board;
  }

  getTopLeft(cube, size) {
    return [this.getBaseColumn(cube, size), this.getBaseRow(cube, size)];
  }

  getBaseRow(index, size) {
    let number = 0;
    while (index >= size + number) {
      number += size;
    }
    return number;
  }

  getBaseColumn(index, size) {
    return (index % size) * size;
  }

  Square(column, row, cube) {
    return { column, row, cube, value: 0, hasError: false, possible: numbers.slice()};
  }

  render() {
    return (
      <div className="small-margin container">
        {this.getCubeRows()}
        <div>
          <div className='small-margin rectangle border' onClick={() => this.handleModeChangeClick()}>
            <div className='noselect full center white'>{this.state.mode}</div>
          </div>
          <Selector state={this.state} onClick={this.handleSelectionChangeClick}/>
        </div>
      </div>
    )
  }

  getCubeRows() {
    let rows = [];
    for (let i = 0; i < this.state.size; i++) {
      rows.push(this.getCubeRow(i * this.state.size));
    }
    return (
      <div className="small-margin">
        {rows}
      </div>
    )
  }

  getCubeRow(index) {
    let row = [];
    for (let i = 0; i < this.state.size; i++) {
      row.push(this.getCube(index + i));
    }
    return (
      <div key={`cube_row${index}`} className="container">
        {row}
      </div>
    )
  }

  getCube(index) {
    const topLeft = this.getTopLeft(index, this.state.size);
    let color = "white";
    if ((parseInt(index / this.state.size) + (index % this.state.size)) % 2 === 1) {
      color = "gray";
    }
    return (
      <Cube key={`cube${index}`}topLeft={topLeft} color={color} state={this.state} onClick={this.handleBoardSquareClick} />
    )
  }
}

export default App;

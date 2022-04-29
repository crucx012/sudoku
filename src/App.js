import React from 'react';
import Cube from './Cube.jsx';
import Selector from './Selector.jsx';
import './styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const board = this.getEmptyBoard(props.size)
    this.state = {
      size: props.size,
      selected: 1,
      board: board
    };
    this.handleSelectionChangeClick = this.handleSelectionChangeClick.bind(this);
    this.handleBoardSquareClick = this.handleBoardSquareClick.bind(this);
  }

  handleSelectionChangeClick(val) {
    this.setState({
      selected: val
    });
  }

  handleBoardSquareClick(square) {
    const index = this.state.board.findIndex((sqr) => sqr.column === square.column && sqr.row === square.row);
    if (index >= 0) {
      let squares = this.state.board;
      let updatedSquare = squares[index];
      if (updatedSquare.value !== this.state.selected) {
        updatedSquare.value = this.state.selected;
      } else {
        updatedSquare.value = 0;
      }
      squares[index] = updatedSquare;
      this.setState({
        board: squares
      });
    }
    this.checkErrors();
  }

  checkErrors() {
    const max = Math.pow(this.state.size, 2);
    let errors = [];
    for (let i = 0; i < max; i++) {
      for (let j = 0; j < max; j++) {
        const square = this.state.board.filter((sqr) => sqr.row === i && sqr.column === j)[0];
        if (square.value > 0) {
          const row = this.state.board.filter((sqr) => sqr.row === square.row);
          const column = this.state.board.filter((sqr) => sqr.column === square.column);
          const cube = this.state.board.filter((sqr) => sqr.cube === square.cube);
          if (this.hasDuplicateValue(square, row) || this.hasDuplicateValue(square, column) || this.hasDuplicateValue(square, cube)) {
            errors.push(square);
          }
        }
      }
    }
    this.updateErrors(errors);
  }

  updateErrors(errors) {
    const max = Math.pow(this.state.size,2);
    let newSquares = this.state.board;
    for (let i = 0; i < max; i++) {
      for (let j = 0; j < max; j++) {
        const index = this.state.board.findIndex((s) => s.column === i && s.row === j);
        if (index >= 0) {
          let updatedSquare = newSquares[index];
          if (errors.includes(updatedSquare)) {
            updatedSquare.hasError = true;
          } else {
            updatedSquare.hasError = false;
          }
          newSquares[index] = updatedSquare;
        }
      }
    }
    this.setState({
      board: newSquares
    });
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
    return { column, row, cube, value: 0, hasError: false };
  }

  render() {
    return (
      <div className="small-margin container">
        {this.getCubeRows(this.handleBoardSquareClick)}
        <Selector state={this.state} onClick={this.handleSelectionChangeClick}/>
      </div>
    )
  }

  getCubeRows(onClick) {
    let rows = [];
    for (let i = 0; i < this.state.size; i++) {
      rows.push(this.getCubeRow(i * this.state.size, onClick));
    }
    return (
      <div className="small-margin">
        {rows}
      </div>
    )
  }

  getCubeRow(index, onClick) {
    let row = [];
    for (let i = 0; i < this.state.size; i++) {
      row.push(this.getCube(index + i, onClick));
    }
    return (
      <div key={`cube_row${index}`} className="container">
        {row}
      </div>
    )
  }

  getCube(index, onClick) {
    const topLeft = this.getTopLeft(index, this.state.size);
    let color = "white";
    if ((parseInt(index / this.state.size) + (index % this.state.size)) % 2 === 1) {
      color = "gray";
    }
    return (
      <Cube key={`cube${index}`}topLeft={topLeft} color={color} state={this.state} onClick={onClick} />
    )
  }
}

export default App;

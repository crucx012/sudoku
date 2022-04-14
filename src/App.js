import React from 'react';
import Cube from './Cube.jsx';
import Selector from './Selector.jsx';
import './styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      board: this.getEmptyBoard()
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
    let errors = [];
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
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
    let newSquares = this.state.board;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
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

  getEmptyBoard() {
    let board = [];
    for (let cube = 1; cube < 10; cube++) {
      const topLeft = this.getTopLeft(cube);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          board.push(this.Square(topLeft[0]+i,topLeft[1]+j, cube));
        }
      }
    };
    return board;
  }

  getTopLeft(cube) {
    return [this.getBaseColumn(cube), this.getBaseRow(cube)];
  }

  getBaseRow(index) {
    return index <= 3 ? 1 : index <= 6 ? 4 : 7;
  }

  getBaseColumn(index) {
    return index % 3 === 1 ? 1 : index % 3 === 2 ? 4 : 7;
  }

  Square(column, row, cube) {
    return { column, row, cube, value: 0, hasError: false };
  };

  render() {
    return (
      <div className="small-margin container">
        <div className="small-margin">
          <div className="container">
            <Cube topLeft={this.getTopLeft(1)} color="white" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(2)} color="gray" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(3)} color="white" state={this.state} onClick={this.handleBoardSquareClick} />
          </div>
          <div className="container">
            <Cube topLeft={this.getTopLeft(4)} color="gray" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(5)} color="white" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(6)} color="gray" state={this.state} onClick={this.handleBoardSquareClick} />
          </div>
          <div className="container">
            <Cube topLeft={this.getTopLeft(7)} color="white" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(8)} color="gray" state={this.state} onClick={this.handleBoardSquareClick} />
            <Cube topLeft={this.getTopLeft(9)} color="white" state={this.state} onClick={this.handleBoardSquareClick} />
          </div>
        </div>
        <Selector selected={this.state.selected} onClick={this.handleSelectionChangeClick}/>
      </div>
    )
  };
}

export default App;

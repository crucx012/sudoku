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

  handleBoardSquareClick(col, row) {
    const index = this.state.board.findIndex((sqr) => sqr.column === col && sqr.row === row);
    if (index >= 0) {
      let squares = this.state.board;
      let square = squares[index];
      square.value = this.state.selected;
      squares[index] = square;
      this.setState({
        board: squares
      });
    }
    this.checkErrors();
  }

  checkErrors() {
    for (let i = 1; i < 10; i++) {
      const row = this.state.board.filter((sqr) => sqr.row === i && sqr.value > 0);
      const column = this.state.board.filter((sqr) => sqr.column === i && sqr.value > 0);
      const cube = this.state.board.filter((sqr) => sqr.cube === i && sqr.value > 0);
      for (let j = 1; j < 10; j++) {
        if (this.validateCellByComparator(j, row) || this.validateCellByComparator(j, column) || this.validateCellByComparator(j, cube)) {
          // record error
        }
      }
    }
  }

  validateCellByComparator(val, collection) {
    if (val === 0) return false;
    const duplicates = collection.filter((sqr) => {
      if (sqr.value === val) {
        return true;
      }
      return false;
    })
    return duplicates.length > 1;
  }

  getEmptyBoard() {
    let board = [];
    for (let cube = 1; cube < 10; cube++) {
      const baseRow = this.getBaseRow(cube);
      const baseColumn = this.getBaseColumn(cube);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          board.push(this.Square(baseColumn+i,baseRow+j, cube, 0));
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

  Square(column, row, cube, value) {
    return { column, row, cube, value };
  };

  render() {
    return (
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
        <Selector selected={this.state.selected} onClick={this.handleSelectionChangeClick}/>
      </div>
    )
  };
}

export default App;

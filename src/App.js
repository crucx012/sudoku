import React from 'react';
import Cube from './Cube.jsx';
import Selector from './Selector.jsx';
import './styles/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      board: this.getEmptyBoard(),
      errors: []
    };
    this.handleSelectionChangeClick = this.handleSelectionChangeClick.bind(this);
    this.handleSetSquareClick = this.handleSetSquareClick.bind(this);
  }

  handleSelectionChangeClick(val) {
    this.setState({
      selected: val
    });
  }

  handleSetSquareClick(col, row) {
    let newBoard = this.state.board;
    newBoard[row-1][col-1] = this.state.selected;
    this.setState({
      board: newBoard
    });
    this.checkErrors();
  }

  checkErrors() {
    let errorSquares = [];
    let compareRows = [];
    let compareColumns = [];
    for (let i = 0; i < this.state.board.length; i++) {
      compareRows.push(this.state.board[i]);
      let column = [];
      for (let j = 0; j < compareRows[0].length; j++) {
        column.push(this.state.board[j][i]);
      }
      compareColumns.push(column);
    }
    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board[0].length; j++) {
        let square = this.state.board[i][j];
        if ((this.validateCellByComparator(square, compareRows[i]) || this.validateCellByComparator(square, compareColumns[j]))) {
          errorSquares.push([i,j]);
        }
      }
    }
    this.setState({
      errors: errorSquares
    });
  }

  validateCellByComparator(val, collection) {
    if (val === 0) return false;
    const duplicates = collection.filter((item) => {
      if (item === val) {
        return true;
      }
      return false;
    })
    return duplicates.length > 1;
  }

  getEmptyBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };
    return board;
  }

  render() {
    return (
      <div className="small-margin">
        <div className="container">
          <Cube color="white" index={1} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="gray" index={2} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="white" index={3} state={this.state} onClick={this.handleSetSquareClick} />
        </div>
        <div className="container">
          <Cube color="gray" index={4} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="white" index={5} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="gray" index={6} state={this.state} onClick={this.handleSetSquareClick} />
        </div>
        <div className="container">
          <Cube color="white" index={7} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="gray" index={8} state={this.state} onClick={this.handleSetSquareClick} />
          <Cube color="white" index={9} state={this.state} onClick={this.handleSetSquareClick} />
        </div>
        <Selector selected={this.state.selected} onClick={this.handleSelectionChangeClick}/>
      </div>
    )
  };
}

export default App;

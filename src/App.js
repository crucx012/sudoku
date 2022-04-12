import React from 'react';
import logo from './logo.svg';
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
    this.handleSetSquareClick = this.handleSetSquareClick.bind(this);
  }

  handleSelectionChangeClick(val) {
    this.setState({
      selected: val
    })
  }

  handleSetSquareClick(col, row) {
    let newBoard = this.state.board;
    newBoard[row-1][col-1] = this.state.selected;
    this.setState({
      board: newBoard
    })
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

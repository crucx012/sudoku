import React from 'react';

class Selector extends React.Component {
  render() {
    const {state} = this.props;
    let values = [];
    for (let i = 0; i < state.size; i++) {
      const len = values.length;
      if (len === 0) {
        values.push(1);
      } else {
        const nextVal = values[len - 1] + state.size;
        values.push(nextVal);
      }
    }
    const items = values.map((val) => {
      return (this.getRow(val, state))
    });
    const selectedClass = 0 === state.numberSelected ? "selected" : "";
    return (
      <div key='number-selector' id='number-selector' className='small-margin'>
        {items}
        <div className="container">
          <div key={0} id={`selection0`} className='rectangle border' onClick={() => this.props.onClick(0)}>
            <div className={`noselect full center white ${selectedClass}`}>ERASE</div>
          </div>
        </div>
      </div>
    );
  }


  getRow(val, state) {
    let row = [];
    for (let i = 0; i < state.size; i++) {
      const value = val + i;
      const selected = value === state.numberSelected ? "selected" : "";
      row.push(this.getItem(value, selected));
    }
    return (
      <div key={`selector-row${val}`} className="container">
        {row}
      </div>
    )
  }

  getItem(val, selected) {
    return (
      <div key={`${val}`} id={`selection${val}`} className='square border' onClick={() => this.props.onClick(val)}>
        <div className={`noselect full center white ${selected}`}>{val}</div>
      </div>
    )
  }
}

 export default Selector;

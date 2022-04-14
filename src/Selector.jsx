import React from 'react';

class Selector extends React.Component {
  render() {
    const {selected} = this.props;
    const values = [1,4,7];
    const items = values.map((val) => {
      return (this.getRow(val, selected))
    });
    const selectedClass = 0 === selected ? "selected" : "";
    return (
      <div key='number-selector' id='number-selector' className='small-margin'>
        {items}
        <div className="container">
          <div key={0} id={`selection0`} className={`rectangle ${selectedClass}`} onClick={() => this.props.onClick(0)}>
            <div className="noselect">ERASE</div>
          </div>
        </div>
      </div>
    );
  }


  getRow(val, selected) {
    const val1 = val;
    const val2 = val+1;
    const val3 = val+2;
    const selected1 = val1 === selected ? "selected" : "";
    const selected2 = val2 === selected ? "selected" : "";
    const selected3 = val3 === selected ? "selected" : "";
    return (
      <div key={`selector-row${val}`} className="container">
        <div key={`${val1}`} id={`selection${val1}`} className={`square ${selected1}`} onClick={() => this.props.onClick(val1)}>
          <div className="noselect">{val1}</div>
        </div>
        <div key={val2} id={`selection${val2}`} className={`square ${selected2}`} onClick={() => this.props.onClick(val2)}>
          <div className="noselect">{val2}</div>
        </div>
        <div key={val3} id={`selection${val3}`} className={`square ${selected3}`} onClick={() => this.props.onClick(val3)}>
          <div className="noselect">{val3}</div>
        </div>
      </div>
    )
  }
}

 export default Selector;

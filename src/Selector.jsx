import React from 'react';

class Selector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const values = [0,1,2,3,4,5,6,7,8,9];
    const items = values.map((val) => {
      var selectedClass = '';
      if (val === this.props.selected)
        selectedClass = 'selected';
      const text = val === 0 ? "X" : val;
      return (
        <div key={val} id={`selection${val}`} className={`square ${selectedClass}`} onClick={() => this.props.onClick(val)}>
          <div className="noselect">{text}</div>
        </div>
      )
    });
    return (
      <div id='number-selector' className='container small-margin'>
        {items}
      </div>
    );
  }
}

 export default Selector;

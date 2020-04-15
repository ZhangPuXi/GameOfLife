import React from 'react';

import '../Style/cell.css';

class Cell extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const { data } = this.props;

    return (
      <div className={ data ? 'liveCell' : 'diedCell' }>
      </div>
    );
  }
}

export default Cell;

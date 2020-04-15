import React from 'react';
import Cell  from './Cell.jsx';

import '../Style/row.css';

class Row extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const { chessRow } = this.props;

    return (
      <div className="row">
        {
          chessRow.map( ( item, index ) => {
            return (
              <Cell key={ 'Cell' + index } data={ item } />
            );
          } )
        }
      </div>
    );
  }
}

export default Row;

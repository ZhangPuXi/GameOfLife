import React from 'react';
import Row   from './Row.jsx';

import '../Style/chessboard.css';

class Chessboard extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const { chessData } = this.props;

    return (
      <div className="chessboard">
        {
          chessData.map( ( item, index ) => {
            return (
              <Row chessRow={ item } key={ 'Row' + index } />
            );
          } )
        }
      </div>
    );
  }
}

export default Chessboard;

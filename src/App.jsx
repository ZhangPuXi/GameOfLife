import React        from 'react';
import Chessboard   from './Component/Chessboard.jsx';
import chessDataSet from './Config/chess-data-set.js';

import './App.css';

const getRandomChessData = () => {
  let result, row;

  result = [];
  row    = [];

  const rowCount    = 36;
  const columnCount = 64;

  if ( Math.floor( Math.random() * 2 ) > 1 ) {
    result = chessDataSet[ Math.floor( Math.random() * chessDataSet.length ) ];
  } else {
    while ( result.length < rowCount ) {
      while ( row.length < columnCount ) {
        row.push( Math.floor( Math.random() * 2 ) < 1 ? 0 : 1 );
      }

      result.push( [ ...row ] );

      row = [];
    }
  }

  return result;
};

const getNextCellState = ( chessData, x, y ) => {
  let result;

  const rowCount    = chessData.length;
  const columnCount = chessData[ 0 ].length;

  const topIndex    = ( x - 1 < 0 ) ? rowCount - 1 : x - 1;
  const rightIndex  = ( y + 1 > columnCount - 1 ) ? 0 : y + 1;
  const bottomIndex = ( x + 1 > rowCount - 1 ) ? 0 : x + 1;
  const leftIndex   = ( y - 1 < 0 ) ? columnCount - 1 : y - 1;

  const topCell         = chessData[ topIndex ][ y ];
  const rightCell       = chessData[ x ][ rightIndex ];
  const bottomCell      = chessData[ bottomIndex ][ y ];
  const leftCell        = chessData[ x ][ leftIndex ];
  const topLeftCell     = chessData[ topIndex ][ leftIndex ];
  const topRightCell    = chessData[ topIndex ][ rightIndex ];
  const bottomLeftCell  = chessData[ bottomIndex ][ leftIndex ];
  const bottomRightCell = chessData[ bottomIndex ][ rightIndex ];

  const cellEnergy
    = topCell
    + rightCell
    + bottomCell
    + leftCell
    + topLeftCell
    + topRightCell
    + bottomLeftCell
    + bottomRightCell;

  if ( chessData[ x ][ y ] ) {
    result = [ 2, 3 ].indexOf( cellEnergy ) !== -1 ? 1 : 0;
  } else {
    result = cellEnergy === 3 ? 1 : 0;
  }

  return result;
};

const getNextChessState = ( chessData ) => {
  let row;

  row = [];

  const result      = [];
  const rowCount    = chessData.length;
  const columnCount = chessData[ 0 ].length;

  for ( let i = 0; i < rowCount; i++ ) {
    for ( let j = 0; j < columnCount; j++ ) {
      row.push( getNextCellState( chessData, i, j ) );
    }

    result.push( [ ...row ] );

    row = [];
  }

  return result;
};

class App extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      chessData : getRandomChessData()
    };
  }

  render() {
    const { chessData } = this.state;

    return (
      <div className="app">
        <Chessboard chessData={ chessData } />
      </div>
    );
  }

  getNextFrameTimer = null

  getNextFrame = () => {
    const { chessData } = this.state;

    const nextChessData = getNextChessState( chessData );

    this.setState( {
      chessData : nextChessData
    }, () => {
      this.setGetNextFrameTimer();
    } );
  }

  setGetNextFrameTimer() {
    if ( this.getNextFrameTimer ) {
      clearTimeout( this.getNextFrameTimer );
    }

    this.getNextFrameTimer = setTimeout( () => {
      this.getNextFrame();
    }, 1000 );
  }

  componentDidMount() {
    this.setGetNextFrameTimer();
  }

  componentWillUnmount() {
    if ( this.getNextFrameTimer ) {
      clearTimeout( this.getNextFrameTimer );
    }
  }
}

export default App;

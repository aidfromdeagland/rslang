import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableRow } from './tablerow';

export class ResultsTable extends Component {
  render() {
    const rows = [];    
    this.props.results.forEach((result, idx) => {
      rows.push(
        <TableRow
          key={idx}
          index={idx}
          date={result.Date} 
          score={result.Score}
          />
      );
    });

    return (
      <div>
        <h3>The best results</h3>
        <table className="bestresults">
          <thead>
            <tr>
              <th>Nr</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

ResultsTable.propTypes = {
    index: PropTypes.number,
    date: PropTypes.number,
    score: PropTypes.number,
    
};

ResultsTable.defaultProps = {
    index: 0,
    date: 0,
    score: 0,
};

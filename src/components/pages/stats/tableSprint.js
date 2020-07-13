import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatisticService } from '../../../services/statisticServices';
import { statisticsDefault } from '../../../constants/globalConstants';

const Row = ({
    date, win, lose, score,
}) => (
    <div className="row">
        <div>{date}</div>
        <div>{win}</div>
        <div>{lose}</div>
        <div>{score}</div>

    </div>
);
export class TableSprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.loadGameData();
    }

     loadGameData = async () => {
         const { loadStatistics } = this.props;
         this.res = await StatisticService.get();
         const dataGame = this.res.optional.sprint
             ? JSON.parse(this.res.optional.sprint)
             : JSON.parse(statisticsDefault.optional.gamePuzzle);
         const data = loadStatistics(dataGame);
         this.setState({
             data,
         });
     }

     render() {
         const data = this.state.data.slice(1);
         const rows = data.map((rowData, index) => (
             <Row
                 key={index}
                 {...rowData}
             />
         ));

         return (

             <div className="table">

                 <div className="table__header">
                     <div>Last Game</div>
                     <div>Correct Answers</div>
                     <div>Wrong Answers</div>
                     <div>Score</div>

                 </div>
                 <div className="body">
                     {rows}
                 </div>
             </div>
         );
     }
}

TableSprint.propTypes = {
    loadStatistics: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import './hangmancustom.scss';

export class HangmanCustom extends Component {
    //constructor(props) {
    //    super(props);
        
        //console.log(this.props);
        //this.state = {
        //  level: 1,
        //    valuePage: this.props.page,
        //};
        //this.handleLevel = this.handleLevel.bind(this);
        //this.handlePage = this.handlePage.bind(this);
    //} 

    //handleLevel(event) {
    //    this.setState({valueLevel: event.target.value});
   // }

    //handlePage(event) {
    //    this.setState({valuePage: event.target.value});
    //}


    render(){
        //console.log('render=',this.props.level);
        //console.log('this.state=',this.state.level);
        const {level, page} = this.props; 
        //const {level} = this.state.level; 
        return (
            <div  className="custom">
                <div className="custom-group">Level:
                    <select className="custom-group-option"
                        value={level}
                        onChange={(event) => {this.props.handleLevel(event.target.value)}}
                        //onChange={(event) => this.setState({valueLevel: event.target.value})}
                    >
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>
                        <option value="5">6</option>
                    </select>
                </div>
                <div className="custom-group">Page:
                    <select className="custom-group-option"
                    value={page}
                    onChange={(event) => {this.props.handlePage(event.target.value)}}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div> 
            </div>    
        );
    }
}

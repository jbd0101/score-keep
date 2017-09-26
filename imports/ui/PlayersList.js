import React from "react";
import ReactDOM from "react-dom";
import {Tracker} from "meteor/tracker";
import {Players} from "./../api/players";
import {Meteor} from "meteor/meteor";

export default class PlayersList extends React.Component{
  constructor(props){
    super(props);
    this.startComputation = this.startComputation.bind(this);
    this.state = {
      players: []
    };
  }
  componentWillMount() {
    setTimeout(this.startComputation, 0);
  }
  startComputation() {
    var that = this;
    Tracker.autorun(()=>{
  		let players = Players.find({}, {sort: {score: -1}}).fetch();
      that.setState({
        players: players
      });
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.players.map((player)=>{
          return <PlayerItem key={player._id} player={player} />
        })}
      </div>
    );
  }

}
class PlayerItem extends React.Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
  }

  render() {
    let player = this.props.player;
    return (
      <div className="item">
        <p><b>{player.name} </b> has {player.score} point(s)</p>
  		   <button className="btn" onClick={this.handleInc}>+</button>
  			<button className="btn" onClick={this.handleDec}>-</button>
  			 <button className="btn" onClick={this.handleDelete}>X</button>
      </div>
    )
  }
  handleDelete()  {
    Players.remove({_id: this.props.player._id});
  }
  handleInc ()  {

    Players.update({_id: this.props.player._id}, {$inc:{score:  1}});
  }
  handleDec ()  {
    Players.update({_id:this.props. player._id}, {$inc:{score: -1 }});
  }
}

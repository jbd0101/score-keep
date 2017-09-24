import React from "react";
import ReactDOM from "react-dom";
import Title from "./../imports/ui/Title";
import Input from "./../imports/ui/Input";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import {Players} from "./../imports/api/players";

const renderPlayers = function(playerList){
	return playerList.map(function(player){
		return <div key={player._id}>
			<p><b>{player.name} </b> score: {player.score}
			<button onClick={()=>handleInc(player,true)}>+</button>
			<button onClick={()=>handleInc(player,false)}>-</button>
			<button onClick={()=>handleDelete(player)}>X</button>
		</p>
	</div>;
	});
}
const handleSubmit = (e) => {
	e.preventDefault();
	let name = e.target.playerName.value;
	if(name != ""){
		Players.insert({
			name: name,
			score:0
		});
		e.target.playerName.value = "";
	}
}
const handleDelete = (player) => {
	Players.remove({_id: player._id});
}
const handleInc = (player,positif) => {
	Players.update({_id: player._id}, {$inc:{score: positif == true ? 1 : -1 }});
}
Meteor.startup(function(){
	Tracker.autorun(function(){
		players = Players.find().fetch();
		players.sort(function (a, b) {
			return b.score - a.score;
		});
		jsx = <div>
			<Title> SCORES </Title>
			{ renderPlayers(players)}
			<Input button="add player" action={(e)=> handleSubmit(e)}>
				<p><input type="text" name="playerName" /></p>
			</Input>
		</div>
		ReactDOM.render(jsx,document.getElementById("app"));

	});


});

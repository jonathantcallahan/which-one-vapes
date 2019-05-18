import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Vote from './Vote'
import Leaderboard from './Leaderboard'
import Score from './Score'

class App extends Component {
  constructor(){
    super()
    this.state = {
      celeb1: '',
      celeb2: '',
      leaderboard: [],
      stats: {}
    }
    this.voting.get = this.voting.get.bind(this)
    this.voting.cast = this.voting.cast.bind(this)
    this.voting.updateLeaderboard = this.voting.updateLeaderboard.bind(this)
    this.tracker.update = this.tracker.update.bind(this)
    this.tracker.get = this.tracker.get.bind(this)
    this.tracker.guess = this.tracker.guess.bind(this)
  }
  componentDidMount(){
    this.voting.get()
    this.voting.updateLeaderboard()
  }
  componentDidUpdate(){
    // this.voting.updateLeaderboard()
  }
  voting = {
    cast: e => {
      console.log(e)
      const vote = [
        [this.state.celeb1, e == 1 ? 'win' : 'loss'],
        [this.state.celeb2, e == 2 ? 'win' : 'loss']
      ]
      console.log(vote)
      Axios.post('http://localhost:3002/api/vote',vote)
        .then(d => this.tracker.guess(d.data))
        .catch(err => console.log(err))
      this.voting.get()
      this.tracker.update() 
      this.voting.updateLeaderboard()
    },
    get: e => {
      Axios.get('http://localhost:3002/api/vote')
        .then(d => {
          this.setState({celeb1:d.data[0].name,celeb2:d.data[1].name},() => {
            console.log(this.state)
          })
        })
    },
    updateLeaderboard: () => {
      Axios.get('http://localhost:3002/api/leaderboard')
        .then(data => this.setState({leaderboard:data.data}, () => console.log(this.state)))
        .catch(err => console.log(err))
    }
   }
   tracker = {
     update: () => {
       const s = this.tracker.get()
       s.count ++
       this.setState({stats:s})
       localStorage.setItem('score',JSON.stringify(s))
     },
     guess: g => {
       const s = this.tracker.get()
       if(g == 'correct'){
         s.correct ++
       } else if(g == 'wrong'){
         s.wrong ++
       }
       this.setState({stats:s})
       localStorage.setItem('score',JSON.stringify(s))
     },
     get: () => localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : {count:0,correct:0,wrong:0}
   }
  render() {
    return (
      <div className="App">
        <Leaderboard leaderboard={this.state.leaderboard}/>
        <Vote voting={this.voting} state={{...this.state}}/>
        <Score tracker={this.tracker} stats={{...this.state.stats}}/>
      </div>
    );
  }
}

export default App;

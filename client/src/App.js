import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Vote from './Vote'

class App extends Component {
  constructor(){
    super()
    this.state = {
      celeb1: '',
      celeb2: ''
    }
    this.voting.get = this.voting.get.bind(this)
  }
  componentDidMount(){
    this.voting.get()
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
        .then(d => console.log(d))
        .catch(err => console.log(err))
      this.voting.get()
    },
    get: e => {
      Axios.get('http://localhost:3002/api/vote')
        .then(d => {
          this.setState({celeb1:d.data[0].name,celeb2:d.data[1].name},() => {
            console.log(this.state)
          })
        })
    }
  }
  render() {
    return (
      <div className="App">
        <Vote voting={this.voting} state={{...this.state}}/>
      </div>
    );
  }
}

export default App;

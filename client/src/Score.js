import React, {Component} from 'react'

class Score extends Component {
    constructor(props){
        super(props)
        this.state = {
            rank: ''
        }
    }
    componentDidUpdate(){
        console.log(this.props.stats)
        const r = this.props.stats.count
        let newRank = ''
        if(r < 20) return 'herald'
        if(r >= 20 && r < 50) { newRank = 'guardian'}
        if(r >=50 && r < 100) { newRank = 'crusader' }
        if(r > 100 && r < 300) { newRank = 'archon' }
        if(r >= 300 && r < 750) { newRank = 'legend' }
        if(r >= 750 && r < 1500) { newRank = 'ancient' }
        if(r >= 1500) { newRank = 'divine' }
        newRank !== this.state.rank && this.setState({rank:newRank})
    }
    render(){
        return (
            <div className='column'>
                <div>my stats</div>
                <div>
                    {this.props.stats && (
                        <div>
                            <div>rank: {this.state.rank}</div>
                            <div>{this.props.stats.count}</div>
                            <div>correct guesses: {this.props.stats.correct}</div>
                            <div>wrong guesses: {this.props.stats.wrong}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Score
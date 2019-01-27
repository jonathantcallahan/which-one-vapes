import React, {Component} from 'react'

class Leaderboard extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return (
            <div>
                <div>leaderboard</div>
                {this.props.leaderboard[0] && this.props.leaderboard[0].map(e => {
                    return <div>{e.name}: {e.yes}</div>
                })}
                {this.props.leaderboard[1] && this.props.leaderboard[1].map(e => {
                    return <div>{e.name}: {e.no}</div>
                })}
            </div>
        )
    }
}

export default Leaderboard
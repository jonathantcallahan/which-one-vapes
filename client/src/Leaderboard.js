import React, {Component} from 'react'

class Leaderboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            leaderboard: true
        }
        this.hideLeaderboard = this.hideLeaderboard.bind(this)
    }
    hideLeaderboard() {
        console.log(this.state.leaderboard)
        this.setState({leaderboard:!this.state.leaderboard})
    }
    render(){
        return (
            <div className='column'>
                <div className='column-header'>LEADERBOARD</div>
                <div onClick={this.hideLeaderboard}
                    >{this.state.leaderboard ? 'hide' : 'show'}</div>
                <div className={this.state.leaderboard ? 'show' : 'hide'}>
                    <div className='leaderboard-group'>
                        <div className='leaderboard-group-header'>most likely</div>
                    {this.props.leaderboard[0] && this.props.leaderboard[0].map(e => {
                        return <div className='leaderboard-image-container'>
                                <div className='leaderboard-image' style={{backgroundImage:`url(http://localhost:3002/api/image/${e.name.replace(/\s/g,'_')})`}}></div>
                                <div className='leaderboard-stat'>{Math.round(e.ratio * 100)}</div>
                            </div>
                    })}
                    </div>
                    <div className='leaderboard-group'>
                        <div className='leaderboard-group-header'>least likely</div>
                    {this.props.leaderboard[1] && this.props.leaderboard[1].map(e => {
                        return <div className='leaderboard-image-container'>
                                <div className='leaderboard-image' style={{backgroundImage:`url(http://localhost:3002/api/image/${e.name.replace(/\s/g,'_')})`}}></div>
                                <div className='leaderboard-stat'>{Math.round(e.ratio * 100)}</div>
                            </div>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard
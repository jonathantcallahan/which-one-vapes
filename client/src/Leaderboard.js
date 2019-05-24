import React, {Component} from 'react'

class Leaderboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            leaderboard: false
        }
        this.hideLeaderboard = this.hideLeaderboard.bind(this)
    }
    hideLeaderboard() {
        console.log(this.state.leaderboard)
        this.setState({leaderboard:!this.state.leaderboard})
    }
    render(){
        return (
            <div className='column leaderboard-column'>
                <div className='column-header'><span>LEADERBOARD</span>
                <span 
                    className='leaderboard-toggle'
                    onClick={this.hideLeaderboard}
                    >{this.state.leaderboard ? 'hide' : 'show'}</span></div>
                <div className={this.state.leaderboard ? 'show' : 'hide'}>
                    <div className={this.state.leaderboard ? 'show leaderboard-group' : 'hide leaderboard-group'}>
                        <div className='leaderboard-group-header'>most likely</div>
                    {this.props.leaderboard[0] && this.props.leaderboard[0].map(e => {
                        return <div className='leaderboard-image-container'>
                                <div className='leaderboard-image' style={{backgroundImage:`url(http://localhost:3002/api/image/${e.name.replace(/\s/g,'_')})`}}></div>
                                <div className='leaderboard-stat'>{Math.round(e.ratio * 100)}</div>
                            </div>
                    })}
                    </div>
                    <div className={this.state.leaderboard ? 'show leaderboard-group' : 'hide leaderboard-group'}>
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
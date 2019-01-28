import React, {Component} from 'react'

class Vote extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className='column'>
                {this.props.state && (
                    <div>
                        <div onClick={() => this.props.voting.cast(1)}>
                            <div className='voting-image' style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb1.replace(/\s/g,'_')})`}}></div>
                            <div>vote for {this.props.state.celeb1}</div>
                        </div>
                        <div onClick={() => this.props.voting.cast(2)}>
                            <div className='voting-image' style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb2.replace(/\s/g,'_')})`}}></div>
                            <div>vote for {this.props.state.celeb2}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Vote
import React, {Component} from 'react'

class Vote extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div>
                <div onClick={this.props.voting.get}>get celebs</div>
                {this.props.state && (
                    <div>
                        <div onClick={() => this.props.voting.cast(1)}>
                            <img src={`http://localhost:3002/api/image/${this.props.state.celeb1.replace(/\s/g,'_')}`}/>
                            <div>vote for {this.props.state.celeb1}</div>
                        </div>
                        <div onClick={() => this.props.voting.cast(2)}>
                            <img src={`http://localhost:3002/api/image/${this.props.state.celeb2.replace(/\s/g,'_')}`} />
                            <div>vote for {this.props.state.celeb2}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Vote
import React, {Component} from 'react'

class Score extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return (
            <div>
                <div>my stats</div>
                <div>
                    {this.props.stats && (
                        <div>{this.props.stats.count}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default Score
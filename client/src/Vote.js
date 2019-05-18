import React, {Component} from 'react'

class Vote extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageOne: 'middle',
            imageTwo: 'middle'
        }
        this.hoverEffect = this.hoverEffect.bind(this)
    }
    hoverEffect = function (image, hover) {
        console.log(image, hover)
        console.log(this)
    }
    render(){
        return(
            <div className='column'>
                <div className='column-header'>VOTE</div>
                {this.props.state && (
                    <div className='voting-container'>
                        <div className='voting-image-container' onClick={() => this.props.voting.cast(1)}>
                            <div 
                                className={'voting-image ' + this.state.imageOne} 
                                onMouseEnter={() => this.hoverEffect(1,'in')}
                                onMouseLeave={() => this.hoverEffect(1,'out')} 
                                style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb1.replace(/\s/g,'_')})`}}></div>
                            <div className='voting-image-name' >{this.props.state.celeb1}</div>
                        </div>
                        <div className='voting-image-container' voting-image='2' onClick={() => this.props.voting.cast(2)}>
                            <div 
                                className={'voting-image ' + this.state.imageTwo}
                                onMouseEnter={() => this.hoverEffect(2,'in')}
                                onMouseLeave={() => this.hoverEffect(2,'out')} 
                                style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb2.replace(/\s/g,'_')})`}}></div>
                            <div className='voting-image-name'>{this.props.state.celeb2}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Vote
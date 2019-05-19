import React, {Component} from 'react'

class Vote extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageOne: 'middle',
            imageTwo: 'middle',
            vote: false
        }
        this.hoverEffect = this.hoverEffect.bind(this)
    }
    hoverEffect = function (image, hover, name = false) {
        console.log(image, hover)
        console.log(this)
        var img = image == 1 ? 'imageOne' : 'imageTwo'
        var otherImg = image != 1 ? 'imageOne' : 'imageTwo'
        if(hover == 'in'){
            this.setState({[img]:'expand',[otherImg]:'shrink',vote:name})

        }
        if(hover == 'out'){
            this.setState({[img]:'middle',[otherImg]:'middle',vote:false})
        }
    }
    render(){ 
        return(
            <div className='column'>
                <div className='column-header'>VOTE</div>
                {this.props.state && (
                    <div className='voting-container'>
                        <div className={'voting-image-container ' + this.state.imageOne} 
                            onClick={() => this.props.voting.cast(1)}
                            onMouseEnter={() => this.hoverEffect(1,'in',this.props.state.celeb1)}
                            onMouseLeave={() => this.hoverEffect(1,'out')}>
                            <div 
                                className='voting-image image-one'  
                                style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb1.replace(/\s/g,'_')})`}}></div>
                            <div className='voting-image-name' >{}</div>
                        </div>
                        <div 
                            className={'voting-image-container ' + this.state.imageTwo} 
                            voting-image='2' 
                            onClick={() => this.props.voting.cast(2)}
                            onMouseEnter={() => this.hoverEffect(2,'in',this.props.state.celeb2)}
                            onMouseLeave={() => this.hoverEffect(2,'out')}>
                            <div 
                                className='voting-image image-two' 
                                style={{backgroundImage:`url(http://localhost:3002/api/image/${this.props.state.celeb2.replace(/\s/g,'_')})`}}></div>
                            <div className='voting-image-name'>{}</div>
                        </div>
                        <div>{this.state.vote && <div className='voting-name-container'>vote for {this.state.vote}</div>}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default Vote
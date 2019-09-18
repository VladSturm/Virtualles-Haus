import React, {Component} from 'react'
import styled from 'styled-components'


const ItemDid = styled.div`
    position: absolute;
    top: ${props => props.top+'px'};
    left: ${props => props.left+'px'};
    z-index: 100;
    width: 20px;
    height: 20px;
    background-color: #229f53;
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;

    &:hover::after {
        content: attr(title);
        width:auto;
        height: auto;
        
        position: absolute;
        background-color: rgba(178,181,186, 0.9);
        left: 20px;
        top: 20px;
    }
`

export default class Item extends Component {
    constructor(props) {
        super(props)
        
    }

    

    render() {
        return (
            <div>
                <ItemDid                     
                    top={this.props.obj.coordinateY} 
                    left={this.props.obj.coordinateX}
                    title={this.props.obj.title+' '+this.props.obj.description+' '+this.props.obj.link} 
                    description={this.props.obj.description}
                    link={this.props.obj.link}
                >
                    </ItemDid>
            </div>
        )
    }
}
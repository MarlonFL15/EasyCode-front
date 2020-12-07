import React from 'react'

export default function Avatar(props){
    const { skin, hairColor, hair, circleColor } = props

    return(
        <div
        style={{
            position: 'relative',
            height: 110,
            width: 100,
            backgroundColor: 'red',
            opacity: 0
        }}>
            <div
                style={{
                    position:'absolute',
                    backgroundColor: 'black',
                    height: 100,
                    width: 100,
                    borderRadius: '100%',
                    bottom:0
                }}>circulo</div>
            <div
            style={{
                position:'absolute',
                backgroundColor: 'blue',
                left: 0,
                right: 0,
                marginLeft: 'auto',
                marginRight: 'auto', 
                height: 110,
                width: 50,
                borderRadius: '100%',
                
            }}>
                corpo
               
            </div>
            <div
            style={{
                position:'absolute',
                backgroundColor: 'yellow',
                left: 0,
                right: 0,
                marginLeft: 'auto',
                marginRight: 'auto', 
                height: 50,
                width: 100,
                borderRadius: '100%',
                
            }}>cabelo</div>
        </div>
    )
}

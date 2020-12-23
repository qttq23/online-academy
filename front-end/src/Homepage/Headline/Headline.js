import React from 'react';
import './style.css'

const Headline = (props) => {
    return (
        <div className="headline">
            {props.headlineName}
        </div>
    )
}

export default Headline;
import React from 'react';
import classes from './TitleCard.module.css';

const TitleCard = ({ dismiss }) => {
    return (<>
        <div className={classes.Container}>
            <h1 className={classes.Main}>Easy Interval</h1>
            <h2 className={classes.Subhead}>Visual aid for interval training exercises</h2>
            <button className={classes.GetStarted} onClick={dismiss}>Get Started</button>
        </div>
    </>)
}

export default TitleCard;
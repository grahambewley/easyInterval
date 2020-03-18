import React from 'react';
import classes from './Timeline.module.css';

const Timeline = ({ showSetup, intervals, totalDuration, time }) => {

    const [totalTimeLeft, setTotalTimeLeft] = React.useState();

    React.useEffect(() => {
        console.log("total duration: ", totalDuration);
        console.log("time: ", time);

        setTotalTimeLeft(totalDuration - time);
    }, [totalDuration, time]);

    function getMinutesAndSeconds(seconds) {
        let minutes = Math.floor(seconds / 60);
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        let remainderSeconds = (seconds % 60);
        if(remainderSeconds < 10) {
            remainderSeconds = '0' + remainderSeconds;
        }
        return minutes + ':' + remainderSeconds;
    }

    return(
        <div className={classes.Container}>
            { intervals ? 
            <div className={classes.TimelineDetails}>
                { showSetup ? <span className={classes.TimelineDetailsLabel}>Total: </span>
                : <span className={classes.TimelineDetailsLabel}>Time Left: </span> }
                <span className={classes.TimelineDetailsTimer}>{getMinutesAndSeconds(totalTimeLeft)}</span>
            </div>
            : null }
            <div className={classes.TimelineStrip}>
            { intervals ? 
            intervals.map(interval => {
                return (
                <div 
                    className={classes.IntervalSection}
                    style={{
                        width: `${(interval.duration / totalDuration) * 100 }%`,
                        backgroundColor: interval.intensity.color
                    }}    
                ></div>
                )
            }):null}
            </div>
        </div>
    )
}

export default Timeline;
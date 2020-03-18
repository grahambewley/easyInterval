import React from 'react';
import classes from './Timeline.module.css';

const Timeline = ({ intervals }) => {

    const [duration, setDuration] = React.useState(0);

    React.useEffect(() => {
        if(intervals) {
            let total = 0;
            intervals.forEach(interval => {
                total += interval.duration; 
            });
            setDuration(total);
        }
    }, [intervals]);

    function displayTotal() {
        if(duration < 60) {
            return duration + ' Seconds';
        } else if(duration === 60) {
            return (duration/60) + ' Minute';
        } else {
            return (duration/60) + ' Minutes';
        }
    }

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
            <div className={classes.TimelineDetails}>
                <span>Timeline</span>
                <span>Total: {displayTotal()}</span>
            </div>
            <div className={classes.TimelineStrip}>
            { intervals ? 
            intervals.map(interval => {
                return (
                <div 
                    className={classes.IntervalSection}
                    style={{
                        width: `${(interval.duration / duration) * 100 }%`,
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
import React from 'react';
import classes from './Timer.module.css';
import { useTimer } from 'use-timer';
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();

const Timer = ({ intervals, goBack, setBgColor }) => {
    
    const [totalDuration, setTotalDuration] = React.useState();
    const [currentIntervalIndex, setCurrentIntervalIndex] = React.useState(0);
    const [intervalSwitchTimes, setIntervalSwitchTimes] = React.useState([]);
    const [started, setStarted] = React.useState(false);
    const [finished, setFinished] = React.useState(false);

    React.useEffect(() => {
        if(intervals) {
            let total = 0;
            let triggerTimes = [];
            intervals.forEach(interval => {
                total += interval.duration;
                triggerTimes.push(total); 
            });
            setTotalDuration(total);
            console.log("Array of trigger times", triggerTimes);
            setIntervalSwitchTimes(triggerTimes);
        }
    }, [intervals]);

    const { time, start, pause, reset } = useTimer({endTime: totalDuration});

    React.useEffect(() => {
        if(time === totalDuration) {
            setFinished(true);
        } else if((intervalSwitchTimes[currentIntervalIndex] - time) == 0) {
            let newIndex = currentIntervalIndex;
            newIndex += 1;
            setCurrentIntervalIndex(newIndex);
        }
    }, [time]);

    React.useEffect(() => {
        if(started) {
            console.log("Enabling wake lock");
            // Enable wake lock.
            // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
            document.addEventListener('click', function enableNoSleep() {
                document.removeEventListener('click', enableNoSleep, false);
                noSleep.enable();
            }, false);
        } else {
            console.log("Disabling wake lock");
            noSleep.disable();
        }
    }, [started])

    React.useEffect(() => {
        if(intervals) {
            setBgColor(intervals[currentIntervalIndex].intensity.color);
        }
    }, [currentIntervalIndex]);

    function handleBackButtonClick() {
        setStarted(false);
        console.log("Disabling wake lock");
        noSleep.disable();
        reset();
        goBack();
    }

    function handleStartButtonClick() {
        setStarted(true);
        start();
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

    function getVerboseTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainderSeconds = (seconds % 60);
        if(remainderSeconds < 10) {
            remainderSeconds = '0' + remainderSeconds;
        }
        let verbose = '';
        if(minutes > 0) {
            verbose += minutes + ' minutes ';
        }
        if(remainderSeconds > 0) {
            verbose += remainderSeconds + ' seconds';
        }
        return verbose;
    }

    return(
        <div className={classes.Container}>
            <div className={classes.TopActionBar}>
                <div className={classes.ActionBarLeft}>
                    <button 
                        className={classes.ActionButton}
                        onClick={handleBackButtonClick}>&larr; Back to Setup</button>
                </div>
                <div className={classes.ActionBarRight}>

                </div>
            </div>

            { intervals && !started ?
                <div className={classes.PreStartContainer}>
                    <h2 className={classes.PreStartHeader}>Get Ready!</h2>
                    <div className={classes.PreStartDetail}>
                        <div>
                            <span className={classes.FirstIntervalLabel}>First Interval:</span>
                            <span className={classes.FirstIntervalName}>{ intervals[0].intensity.name }</span>
                            <span className={classes.FirstIntervalDuration}>{ getVerboseTime(intervals[0].duration)}</span>
                        </div>
                        <button 
                            className={classes.BigStartButton}
                            onClick={handleStartButtonClick}>Start</button>
                    </div>
                </div>

            : null }

            { intervals && started && !finished ? 
            <div className={classes.MainTimerSection}>
                <div className={classes.CurrentInterval}>
                    <span className={classes.CurrentIntervalLabel}>Current:</span>
                    <span className={classes.CurrentIntervalName}>{ intervals[currentIntervalIndex].intensity.name }</span>
                </div>
                <div className={classes.IntervalTimeLeft}>
                    <span className={classes.IntervalTimeLeftTime}>{ getMinutesAndSeconds(intervalSwitchTimes[currentIntervalIndex] - time)}</span>
                </div>
                <div className={classes.BottomRow}>
                    <div className={classes.NextInterval}>
                        { currentIntervalIndex + 1 < intervals.length ? 
                        <>
                        <span className={classes.NextIntervalLabel}>Next:</span>
                        <span className={classes.NextIntervalName}>{ intervals[currentIntervalIndex + 1].intensity.name }</span>
                        <span className={classes.NextIntervalDuration}>{getVerboseTime(intervals[currentIntervalIndex + 1].duration)}</span>
                        </> : null}
                    </div>
                </div>
            </div>
            : null }
            
            { finished ? 
            <div className={classes.Finished}>
                You Finished!
            </div>
            : null }
        </div>
    )
}

export default Timer;
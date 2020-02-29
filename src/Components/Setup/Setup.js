import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import classes from './Setup.module.css';

const Setup = ({ intensityOptions, timeOptions, addInterval, undo, repeat, ready, setBgColor }) => {
    
    const [selectedIntensity, setSelectedIntensity] = React.useState();
    const [selectedTime, setSelectedTime] = React.useState();

    React.useEffect(() => {
        setBgColor('#eff4f9');
    })

    function handleAddInterval() {
        if(selectedIntensity && selectedTime) {

            // Blank the selected intensity and time
            setSelectedIntensity();
            setSelectedTime();

            const newInterval = {
                intensity: selectedIntensity,
                duration: selectedTime
            }
            addInterval(newInterval);
        } else {
            alert("Select an intensity and a time interval first");
        }
    }

    return(
        <div className={classes.Container}>
            <div className={classes.IntensitySelector}>
                { intensityOptions.map(opt => {
                    let styleClasses = `${classes.IntensityOption}`;
                    if(selectedIntensity && opt.name === selectedIntensity.name) {
                        styleClasses += ` ${classes.Selected}`;
                    }

                    return(
                        <div key={opt.name} className={styleClasses} onClick={() => setSelectedIntensity(opt)}>
                            <div 
                                style={{ backgroundColor: opt.color }} 
                                className={`${classes.IntensityColorblock}`}></div>
                            <span className={classes.IntensityName}>{ opt.name }</span>
                        </div>
                    )
                })}
            </div>

            <div className={classes.TimeSelector}>
                { timeOptions.map(opt => {
                    let styleClasses = `${classes.TimeOption}`;
                    if(selectedTime && selectedTime === opt) {
                        styleClasses += ` ${classes.Selected}`;
                    }

                    function getDisplayTime(time) {
                        if(time < 60) {
                            return time + ' seconds';
                        } else if(time === 60) {
                            return (time/60) + ' minute';
                        } else {
                            return (time / 60) + ' minutes';
                        }
                    }

                    return(
                        <div key={opt} className={styleClasses} onClick={() => setSelectedTime(opt)}>
                            <span className={classes.TimeName}>{ getDisplayTime(opt) }</span>
                        </div>
                    )
                })}
            </div>

            <div className={classes.ActionContainer}>
                <div className={classes.ActionTopRow}>
                    <button 
                        className={classes.MiniActionButton}
                        onClick={undo}>
                        <FontAwesomeIcon icon={faUndo}/>
                        </button>
                </div>
                <button 
                    className={`${classes.ActionButton} ${classes.Add}`}
                    onClick={handleAddInterval}>
                    Add</button>
                {/*
                <button 
                    className={`${classes.ActionButton} ${classes.Undo}`}
                    onClick={undo}>
                    Undo</button>
                <button 
                    className={`${classes.ActionButton} ${classes.Repeat}`}
                    onClick={repeat}>
                    Repeat</button>
                */}
                <button 
                    className={`${classes.ActionButton} ${classes.Start}`}
                    onClick={ready}>
                    I'm Ready</button>
            </div>
        </div>
    )
}

export default Setup;
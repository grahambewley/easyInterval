import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import classes from './Setup.module.css';

const Setup = ({ intensityOptions, timeOptions, addInterval, undo, repeat, ready, setBgColor }) => {
    
    const [selectedIntensity, setSelectedIntensity] = React.useState();
    const [selectedDuration, setSelectedDuration] = React.useState(60);

    React.useEffect(() => {
        setBgColor('#eff4f9');
    })

    function getDisplayTime(time) {
        if(time < 60) {
            return time + ' seconds';
        } else if(time === 60) {
            return (time/60) + ' minute';
        } else {
            return (time / 60) + ' minutes';
        }
    }

    function handleDurationIncrementClick() {
        if(selectedDuration >= 0) {
            setSelectedDuration(selectedDuration + 60);
        }
    }

    function handleDurationDecrementClick() {
        if(selectedDuration < 3600) {
            setSelectedDuration(selectedDuration - 60);
        }
    }

    function handleAddInterval() {
        if(selectedIntensity && selectedDuration) {

            // Blank the selected intensity
            setSelectedIntensity();

            const newInterval = {
                intensity: selectedIntensity,
                duration: selectedDuration
            }
            addInterval(newInterval);
        } else {
            alert("Select an intensity and a time interval first");
        }
    }

    return(
        <div className={classes.Container}>
            <h2 className={classes.SectionHeader}>Intensity</h2>
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
            <h2 className={classes.SectionHeader}>Duration</h2>
            <div className={classes.TimeSelector}>
                <div className={classes.TimeSelectorIncrementContainer}>
                    <button 
                        className={classes.TimeSelectorIncrementButton}
                        onClick={handleDurationDecrementClick}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div className={classes.TimeSelectorIncrementDisplay}>
                        { getDisplayTime(selectedDuration) }
                    </div>
                    <button 
                        className={classes.TimeSelectorIncrementButton}
                        onClick={handleDurationIncrementClick}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                <div className={classes.TimeSelectorQuickOptionContainer}>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(60)}
                        >1 min</button>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(120)}
                        >2 min</button>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(180)}
                        >3 min</button>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(300)}
                        >5 min</button>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(600)}
                        >10 min</button>
                    <button 
                        className={classes.TimeSelectorQuickOptionButton}
                        onClick={() => setSelectedDuration(900)}
                        >15 min</button>
                </div>
                {/* { timeOptions.map(opt => {
                    let styleClasses = `${classes.TimeOption}`;
                    if(selectedDuration && selectedDuration === opt) {
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
                        <div key={opt} className={styleClasses} onClick={() => setSelectedDuration(opt)}>
                            <span className={classes.TimeName}>{ getDisplayTime(opt) }</span>
                        </div>
                    )
                })} */}
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
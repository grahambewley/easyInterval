import React from 'react';
import { useTimer } from 'use-timer';
import TitleCard from './Components/TitleCard/TitleCard';
import Setup from './Components/Setup/Setup';
import Timer from './Components/Timer/Timer';
import Timeline from './Components/Timeline/Timeline';
import classes from './App.module.css';

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const INIT_INTENSITY_OPTIONS = [
  {
    name: 'High intensity',
    color: '#FE5F55' // red
  },
  // Good orange color: #FFCF56
  {
    name: 'Medium intensity',
    color: '#FFCF56' // yellow
  },
  {
    name: 'Low intensity',
    color: '#6CC551' // green
  },
  {
    name: 'Rest',
    color: '#dddde3'
  },
   // Alternative green: #55D6BE
];

function App() {
  const [showTitleCard, setShowTitleCard] = React.useState(true);
  const [showSetup, setShowSetup] = React.useState(false);
  const [bgColor, setBgColor] = React.useState('#eff4f9');
  const [intensityOptions] = React.useState(INIT_INTENSITY_OPTIONS);

  const [amountLastAdded, setAmountLastAdded] = React.useState();
  const [intervals, setIntervals] = React.useState();
  const [repeatingIntervalArray, setRepeatingIntervalArray] = React.useState();

  const [totalDuration, setTotalDuration] = React.useState();
  const [intervalSwitchTimes, setIntervalSwitchTimes] = React.useState([]);
  const [currentIntervalIndex, setCurrentIntervalIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const { time, start, pause, reset } = useTimer({endTime: totalDuration});

  React.useEffect(() => {
    if(!showTitleCard) {
      setShowSetup(true);
    }
  }, [showTitleCard]);

  // This effect handles keeping track of the total exercise duration and the interval split times
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

  // This effect handles the switching of currentIntervalIndex, or setting the exercise to finished
  React.useEffect(() => {
    if(time === totalDuration) {
      setFinished(true);
    } else if((intervalSwitchTimes[currentIntervalIndex] - time) === 0) {
      let newIndex = currentIntervalIndex;
      newIndex += 1;
      setCurrentIntervalIndex(newIndex);
    }
  }, [time, totalDuration, intervalSwitchTimes, currentIntervalIndex]);


  function handleAddInterval(newInterval) {
    // Clear out the repeatingIntervalArray in case the previous action was adding in some repeating intervals
    setRepeatingIntervalArray(undefined);
    // Required in case we need to undo
    setAmountLastAdded(1);

    // Start with an empty array
    let updatedInt = [];
    // If intervals already exist, destructure those into this updated interval array
    if(intervals){
      updatedInt = [...intervals];
    }
    // Push the new interval to the updated intervals array
    updatedInt.push(newInterval);
    // Set the appropriate piece of state
    setIntervals(updatedInt);
  }

  function handleUndo() {
    if(intervals === undefined) {
      return;
    } else {
      const temp = [...intervals];
      const updatedInt = temp.slice(0, temp.length - amountLastAdded);

      console.log('updating to ', updatedInt);
      setIntervals(updatedInt);
    }
  }

  function handleRepeat() {
    // If nothing is in the repeating interval array, then grab all intervals and store them, then repeat
    if(!repeatingIntervalArray) {
      const intervalsToRepeat = intervals;
      setRepeatingIntervalArray(intervalsToRepeat);
      setAmountLastAdded(intervalsToRepeat.length);

      const updatedIntervals = [...intervals].concat(intervalsToRepeat);

      setIntervals(updatedIntervals);
    } 
    // Otherwise, just add the intervalsToRepeat to intervals
    else {
      const updatedIntervals = [...intervals].concat(repeatingIntervalArray);
      setIntervals(updatedIntervals);
    }
  }

  function handleReadyButtonClick() {
    if(intervals && intervals.length >= 1) {
      setShowSetup(false);
    } else {
      alert("Add some intervals before you can start!");
    }
  }

  return (<>
    <div 
      className={classes.WrapperOuter}
      style={{backgroundColor: `${bgColor}`}}>
      
      <div className={classes.WrapperInner}>

        { showTitleCard ? 
        <TitleCard 
          dismiss={() => setShowTitleCard(false)}/>
        : 
        <>
        {/* If setting up exercise, show setup component -- otherwise, show timer */}
          { showSetup ? 
            
            <Setup 
              intensityOptions={intensityOptions}
              addInterval={handleAddInterval}
              undo={handleUndo}
              repeat={handleRepeat}
              intervals={intervals}
              ready={handleReadyButtonClick}
              setBgColor={setBgColor}
              />
            : 
            <Timer 
              intervals={intervals}
              goBack={() => setShowSetup(true)}
              setBgColor={setBgColor}
              
              time={time}
              start={start}
              reset={reset}

              totalDuration={totalDuration}
              intervalSwitchTimes={intervalSwitchTimes}
              currentIntervalIndex={currentIntervalIndex}
              finished={finished}
            />
          }
          <Timeline 
            intervals={intervals}/>
        </> }
      </div>
    </div>

    
  </>);
}

export default App;

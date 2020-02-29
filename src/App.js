import React from 'react';
import TitleCard from './Components/TitleCard/TitleCard';
import Setup from './Components/Setup/Setup';
import Timer from './Components/Timer/Timer';
import Timeline from './Components/Timeline/Timeline';

import classes from './App.module.css';

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

const INIT_TIME_OPTIONS = [30, 60, 120, 180, 300, 600, 900];

// const tempSetIntervals = [
//   {
//     intensity: {
//       name: 'Low intensity',
//       color: '#6CC551' // green
//     },
//     duration: 120
//   },
//   {
//     intensity: {
//       name: 'Medium intensity',
//       color: '#FFCF56' // green
//     },
//     duration: 300
//   }
// ];

function App() {
  const [showTitleCard, setShowTitleCard] = React.useState(true);
  const [showSetup, setShowSetup] = React.useState(false);
  const [bgColor, setBgColor] = React.useState('#eff4f9')
  const [intensityOptions, setIntensityOptions] = React.useState(INIT_INTENSITY_OPTIONS)
  const [timeOptions, setTimeOptions] = React.useState(INIT_TIME_OPTIONS);
  
  const [amountLastAdded, setAmountLastAdded] = React.useState();
  const [intervals, setIntervals] = React.useState();
  const [repeatingIntervalArray, setRepeatingIntervalArray] = React.useState();


  React.useEffect(() => {
    if(!showTitleCard) {
      setShowSetup(true);
    }
  }, [showTitleCard]);

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
              timeOptions={timeOptions}
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

import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useRef } from 'react';
import logo from './image/boxIcon.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import AboutModal from './component/AboutModal';
import useLoader from './component/useLoader';
import LoadingBar from 'react-top-loading-bar'


// Title rotation
const words = ["Bored?      ", "Shuffle, Rabbithole, and Repeat."];
// const words = ["Bored?", "Shuffle", "Rabbithole", "Repeat."]

export default function App() {

  // Loading progress bar
  const ref = useRef(null);
  
  const [articleData, setArticleData] = useState();

  // React Hooks

  // Type writer Effects
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Subtitle
  const [subTitle, setSubTitles] = useState('');
  const [titleLink, setTitleLink] = useState('');
  const [titleId, setId] = useState('');

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // State showing whether reshuffle button exist or not
  const [reShuffle, setReshuffle] = useState(false);

  // Spinning screen for loading
  // const [loader, showLoader, hideLoader] = useLoader();

  //history states
  const [history, setHistory] = useState([]);
  

  // About Modal
  const setAboutModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setAboutModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
  }

  // onHover Events
  const [isShown, setIsShown] = useState(false);

  var typerDone = false;


  // Link Handler
  useEffect(() => {
    clickHandler();
  }, []);
  
  // Type Writer Effect (hz)
  useEffect(() => {
    
    // Check done typing all words
    if (index === words.length){
      return;
    }
    
    typerDone = true;
    // Checks if need to reverse, otherwise no
    if ( subIndex === words[index].length + 1 && 
        index !== words.length - 1 && !reverse ) {
      setReverse(true);
      return;
    }

    // keeps going to if sub index is 0
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    // time delay between reverse and typing itself
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 400 :
                150, parseInt(Math.random() * 150)));
  
    return () => clearTimeout(timeout);
}, [subIndex, index, reverse]);

  // blinker and time delay
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      if(typerDone){
        setBlink((prev) => !prev);
      }
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

    const clickHandler = (e) => {
      ref.current.continuousStart();
    // Using cors-anywhere proxy to scrape the data on wikipedia
    fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, typeof data);
        setArticleData(data.articles);
        setSubTitles('');
        ref.current.complete();
        setReshuffle(false);
      });

    
  };

  const titleClick =(link) =>{
    window.open(link);
    window.focus();
  }

  const reDigHandler = (id, title) =>{
    ref.current.continuousStart();
      fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space?id=" + id)
        .then((resp) => resp.json())
        .then((data) => {
          setArticleData(data.articles);
          ref.current.complete();
          setSubTitles("Article: " + title);
          setId(id);
    });
  }
  
  const digHandler = (title, id, link) => {
    return (event) => {
      ref.current.continuousStart();

      if(history.length < 5){
        let temp = history;
        temp.unshift({id: id, title: title});
      }
      else{
        let temp = history;
        temp.pop();
        temp.unshift({id: id, title: title});
      }
      fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space?id=" + id)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data, typeof data);
          setArticleData(data.articles);
          setSubTitles("Article: " + title);
          setId(id);
          setTitleLink(link);
          setReshuffle(true);
          ref.current.complete();
      });
    }
  }

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index} dig={digHandler}></InfoBox>
    )
  }

  const renderHistory = (history, index) => {
    return(
      <Grid item xs={12} key={index} onClick={()=> reDigHandler(history.id, history.title)} style={historyEntry} className='historyTags'>{history.title}</Grid>
    )
  }
  return (
    <div className="App">
    <LoadingBar color='#2565AE' ref={ref} />

      <Grid container item spacing={3} xs={12} justify="flex-end" >
        <Grid item xs={12} sm={2}>
          <img style={pageIcon} src={logo} alt="Logo" />
        </Grid>
        <Grid item container xs={12} sm={10} >
          <h1 style={pageTitle}>
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
          </h1>
          <Grid item xs={12} style={subTitleStyle} onClick={() => titleClick(titleLink)} className='subTitle'>{subTitle}</Grid>
        </Grid>
        <Grid item container xs={12} sm={2} style={{position: 'relative'}}>
          <Grid item xs={12} style={pageIntro}> 
            
            <Button variant="primary" size="lg" onClick={clickHandler} style={restartButton} className='restartButton'>
             <strong>Start Over</strong>
            </Button>
            <h3 style={subText}>Tired of your rabbithole? Start over</h3>
            {reShuffle ? <Button onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} variant="primary" size="lg" onClick={() => reDigHandler(titleId, subTitle)} style={restartButton} className='restartButton'>
                            <strong>Find more boxes</strong>
                          </Button>: null}

                        {isShown && (
                    <div style={{textAlign: 'center'}}>
                      <p style={subText}><em>Shuffles within this article.</em></p>
                    </div>
                  )}
            <br/>
            <Button variant="primary" size="lg" onClick={setAboutModalIsOpenToTrue} style={restartButton} className='restartButton'>
              <strong>About</strong>
            </Button>

            <Modal isOpen={modalIsOpen}>
                <button onClick={setAboutModalIsOpenToFalse}>x</button>
                <AboutModal/>
            </Modal>
            <br/>
            <Grid item xs={12} style={historyGrid}>
              <h4 style={{font:'14px', marginBottom: '7px', fontFamily: 'Georgia',}}>Rabbithole History:</h4>
              {history && history.map(renderHistory)}
            </Grid>
          </Grid>
          <br/>
          
          
        </Grid>
        <Grid container item xs={12} sm={10} spacing={4} justify="flex-end" style={boxGrid}>
            {articleData && articleData.map(renderBox)}
        </Grid>
        <Grid style={footer} item xs={12}>
            <h3>Created by <a target="_blank" href="https://github.com/kristofgazso/pickabox.space">The HAKeRs</a></h3>
        </Grid>
      </Grid>
    </div>
  );
}


const footer = {
  fontWeight:'bold',
  fontSize: '12px',
  height:'50px',
  bottom: '10px',
  position: 'relative',
}

const subTitleStyle={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '35px',
  lineHeight: 'normal',
  marginBottom: '10px',
  cursor: 'pointer',
  /* or 71% */

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  color: '#000000',
  justifyContent: 'center',
}
const pageTitle={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: 'normal',
  margin: 'auto',
  justifyContent: 'center',
  marginTop: '5px',
  marginBottom: '10px',
  /* or 71% */

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',

  color: '#000000'
}

const pageIcon={
  margin: '10px',
  height: '100px',
  width:'auto',
  left: '10px',
  float: 'left'
}
const pageIntro={
  textAlign: 'left',
}

const restartButton={
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 16px',

  // position: 'absolute',
  width: '133px',
  height: '34px',
  cursor:'pointer',

  background: '#2565AE',
  borderRadius: '5px',
  borderColor: 'transparent',
  color: '#fff',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  margin: 'auto',
}

const historyEntry={
  marginTop: '7px',
  marginBottom: '7px',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  cursor:'pointer',
  // textColor:'',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
}

const historyGrid={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  marginLeft: '15px',
}

const subText={
  fontFamily: 'Open Sans',
  fontStyle: 'italic',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '14px',
  /* identical to box height, or 117% */

  textAlign: 'center',

  color: '#222222',
}

const boxGrid={
  border: '5px',
  margin: '0px'
}

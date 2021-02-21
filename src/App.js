import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import logo from './image/boxIcon.png';
import Button from 'react-bootstrap/Button';

// import Modal from './component/Modal';

import useLoader from './component/useLoader';


// Title rotation
const words = ["Curious about something?", "Click on a box!", "Save something you like!"]

export default function App() {
  
  const [articleData, setArticleData] = useState();

  // States telling words when to index, blink and reverse
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [subTitle, setSubTitles] = useState('');
  const [titleLink, setTitleLink] = useState('');
  // Spinning screen for loading
  const [loader, showLoader, hideLoader] = useLoader();
  

  // Link Handler
  useEffect(() => {
    clickHandler();
  }, []);
  
  // Type Writer Effect (hz)
  useEffect(() => {
    
    // Check done typing all words
    if (index === words.length) return;

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
      setBlink((prev) => !prev);
    }, 650);
    return () => clearTimeout(timeout2);
  }, [blink]);

    const clickHandler = (e) => {
      showLoader();
    // Using cors-anywhere proxy to scrape the data on wikipedia
    fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, typeof data);
        setArticleData(data.articles);
        hideLoader();
      });

    
  };

  const titleClick =(link) =>{
    window.open(link);
    window.focus();
  }
  
  const digHandler = (title, id, link) => {

    return (event) => {
      console.log('I am fetching this link', title);
      showLoader();
      fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space?id=" + id)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data, typeof data);
          setArticleData(data.articles);
          setSubTitles('Current Title: ' +title);
          setTitleLink(link);
          hideLoader();
        });
      }
  }


  // const aboutHandler = () => {
  //   return (event) => {
  //     this.showModal();

  //   }
  // }

  // state = {
  //   show: false
  // };
  // showModal = e => {
  //   this.setState({
  //     show: true
  //   });
  // };

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index} dig={digHandler}></InfoBox>
    )
  }
  return (
    <div className="App">

      <Grid container spacing={3} xs={12} justify="flex-end" >
        <Grid item xs={12} sm={3}>
          <img style={pageIcon} src={logo} alt="Logo" />
        </Grid>
        <Grid item container xs={12} sm={9} >
          <Grid item xs={12} style={pageTitle}>
          Hi! {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
          </Grid>
          <Grid item xs={12} style={subTitleStyle} onClick={() => titleClick(titleLink)} >{subTitle}</Grid>
        </Grid>
        <Grid item container xs={12} sm={2} style={{position: 'relative'}}>
          <Grid item xs={12} style={pageIntro}> 
            
            <Button variant="primary" size="lg" onClick={clickHandler} style={restartButton} className='restartButton'>
            <h2 role="img" aria-label="shuffle"></h2><strong>Shuffle</strong>
            </Button>
            <br></br>
            {/* <Button variant="primary" size="lg" onClick={aboutHandler} style={restartButton}>
            <h2 role="img" aria-label="about">🔀</h2><strong>About</strong>
            </Button> */}
          </Grid>
          
          <Grid style={footer} item xs={12}>
            <h3>Created by <a target="_blank" href="https://github.com/kristofgazso/pickabox.space">Team Placeholder</a></h3>
          </Grid>
          
        </Grid>
        <Grid container item xs={12} sm={10} spacing={4} justify="flex-end" style={boxGrid}>
            {articleData && articleData.map(renderBox)}
        </Grid>
      </Grid>
      {loader}
    </div>
  );
}


const footer = {
  fontWeight:'bold',
  fontSize: '12px',
  height:'auto',
  bottom: '0',
  position: 'absolute',
}

const subTitleStyle={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '35px',
  lineHeight: 'normal',
  marginBottom: '20px',
  cursor: 'pointer',
  /* or 71% */

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',

  color: '#000000',
  justifyContent: 'center',
}
const pageTitle={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: 'normal',
  marginTop: '20px',
  margin:'auto',
  justifyContent: 'center',
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
  left: '30px',
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

  background: '#074EE8',
  borderRadius: '48px',
  borderColor: 'transparent',
  color: '#fff',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  margin: 'auto',
}

const boxGrid={
  border: '5px'
}

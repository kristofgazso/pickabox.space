import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import logo from './image/boxIcon.png';
import Button from 'react-bootstrap/Button';

// Title rotation
const words = ["Welcome to Pickabox.space", "Just pick a box!"]

export default function App() {
  
  const [articleData, setArticleData] = useState();

  // States telling words when to index, blink and reverse
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

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
    // Using cors-anywhere proxy to scrape the data on wikipedia
    fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, typeof data);
        setArticleData(data.articles);
      });

    
  };
  document.title = 'Welcome to pickabox.space';
  var currentTitle = 'Welcome to pickabox.space';
  
  const digHandler = (title, id) => {
    return (event) => {
      console.log('I am fetching this link', title);
      document.title = title;
      console.log(document.title)

      fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space?id=" + id)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data, typeof data);
          setArticleData(data.articles);
        });
      }
  }

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index} dig={digHandler}></InfoBox>
    )
  }
  return (
    <div className="App">
      <Grid container spacing={3} xs={12} justify="flex-end" >
        <Grid item xs={12} sm={5}>
          <img style={pageIcon} src={logo} alt="Logo" />
        </Grid>
        <Grid item xs={12} sm={7} style={pageTitle}>
          Hi! {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </Grid>
        <Grid item xs={12} sm={2} style={pageIntro}>
        <h2 role="img" aria-label="sparkles">✨</h2>
          Just pick any box. <h2 role="img" aria-label="box">📦</h2>
          You are provided with 8 random (maybe exciting) wikipedia articles. <br/><br/>
          When you click on one, you are given 8 random articles from the links the article contains.<br/><br/>
          Click on the Open in Wikipedia button at any time to save it in a new tab. Let’s see how far the rabbithole goes.<br/><br/>
          <Button variant="primary" size="lg" onClick={clickHandler} style={restartButton}>
          <h2 role="img" aria-label="shuffle">🔀</h2><strong>Shuffle</strong>
          </Button>

        </Grid>
        <Grid container item xs={12} sm={10} spacing={4} justify="flex-end" style={boxGrid}>
            {articleData && articleData.map(renderBox)}
        </Grid>
      </Grid>
    </div>
  );
}

const pageTitle={
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: '34px',
  marginTop: '20px',
  marginBottom: '20px',
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
}

const boxGrid={
  border: '5px'
}

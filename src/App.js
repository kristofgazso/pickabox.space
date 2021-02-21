import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import logo from './image/boxIcon.png';
import Button from 'react-bootstrap/Button';

function App() {
  
  const [articleData, setArticleData] = useState();
  useEffect(() => {
    // do whatever
    clickHandler();
  }, []);

  const clickHandler = (e) => {

    // Using cors-anywhere proxy to scrape the data on wikipedia
    fetch("https://blooming-river-52363.herokuapp.com/https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, typeof data);
        setArticleData(data.articles);
      });
  };
  var currentTitle = 'Welcome to pickabox.space';
  const digHandler  = (title) => {
      return (event) => {
        console.log('I am fetching this link', title);
        currentTitle = title;
      }
  }

  console.log(articleData);



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
        <Grid item xs={12} sm={7} style={pageTitle}>{currentTitle}</Grid>
        <Grid item xs={12} sm={2} style={pageIntro}>
          Just pick a box. <br/><br/>
          You are provided with 8 random wikipedia articles. <br/><br/>
          When you click on one, you are given 8 random articles from the links the article contains.<br/><br/>
          Click on the Open in Wikipedia button at any time to save it in a new tab Let’s see how far the rabbithole goes.<br/><br/>
          <Button variant="primary" size="lg" onClick={clickHandler} style={restartButton}>
            Start Over
          </Button>

        </Grid>
        <Grid container item xs={12} sm={10} spacing={5} justify="flex-end" style={boxGrid}>
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
export default App;

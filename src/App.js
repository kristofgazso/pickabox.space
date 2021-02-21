import logo from './logo.svg';
import './App.css';
import InfoBox from './component/InfoBox';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';

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

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index}></InfoBox>
    )
  }
  return (
    <div className="App">
      <Grid container spacing={3} justify="flex-end">
        <Grid item xs={12} sm={7} style={pageTitle}>Welcome! Ready to get pumped?</Grid>
        <Grid container item xs={12} sm={10} spacing={5} justify="flex-end">
            {articleData && articleData.map(renderBox)}
        </Grid>
      </Grid>
      <button default onClick={clickHandler}>
        Start Over
      </button>
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

export default App;

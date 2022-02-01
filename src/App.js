import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import LoadingBar from 'react-top-loading-bar';
import Grid from '@material-ui/core/Grid';

import Instructions from './component/InstructionsComponent';
import InfoBox from './component/InfoBox';
import Scroll from './component/scroll';
import TypeEffect from './component/TypeEffect';

import logo from './image/boxIcon.svg';
import './App.css';

let CorsHeader = new Headers
CorsHeader.append('Content-Type', 'application/json');
CorsHeader.append('Accept', 'application/json');

CorsHeader.append('Access-Control-Allow-Origin', 'http://localhost:3000');
CorsHeader.append('Access-Control-Allow-Credentials', 'true');

CorsHeader.append('GET', 'POST', 'OPTIONS');

export default function App() {
  
  // Loading progress bar
  const ref = useRef(null);

  // Subtitle hooks
  const [subTitle, setSubTitles] = useState('');
  const [titleId, setId] = useState('');
  const [titleLink, setTitleLink] = useState('');

  //Article View History states
  const [history, setHistory] = useState([]);

  // Wikipedia API Data scape
  const [articleData, setArticleData] = useState();

  // State showing whether reshuffle button exist or not
  const [reShuffle, setReshuffle] = useState(false);

  //isShown hooks
  const [isShown, setIsShown] = useState(false);

  // Link Handler
  useEffect(() => {
    clickHandler();
  }, []);

  // Fetches the API call and generates 8 articles from Wikipedia
  const clickHandler = (e) => {

    ref.current.continuousStart();

    // Using cors-anywhere proxy to scrape the data on wikipedia
    fetch("https://morning-oasis-13370.herokuapp.com/https://asia-northeast2-pickabox-endpoint.cloudfunctions.net/jp-region")
        .then((resp) => resp.json())
        .then((data) => {
            setReshuffle(false);
            setSubTitles('');
            setArticleData(data.articles);
            ref.current.complete();
        });
};

  // Opens URL in new tab
  const titleClick =(link) => {
    window.open(link);
    window.focus();
  }
  
  // Reshuffles but within the same article
  const reDigHandler = (id, title) =>{
    ref.current.continuousStart();
    fetch("https://morning-oasis-13370.herokuapp.com/https://asia-northeast2-pickabox-endpoint.cloudfunctions.net/jp-region?id="+id)
        .then((resp) => resp.json())
        .then((data) => {
            ref.current.complete();
            setSubTitles(title);
            setId(id);
            setArticleData(data.articles);
    });
  }

  // Fetches API call and intialize article view history
  const digHandler = (title, id, link) => {
    return (event) => {
      ref.current.continuousStart();

      if (history.length < 10) {
          let temp = history;
          temp.unshift({id: id, title: title});
      }
      else {
          let temp = history;
          temp.pop();
          temp.unshift({id: id, title: title});
      }

      fetch("https://morning-oasis-13370.herokuapp.com/https://asia-northeast2-pickabox-endpoint.cloudfunctions.net/jp-region?id=" + id)
        .then((resp) => resp.json())
        .then((data) => {
          ref.current.complete();
          setSubTitles(title);
          setId(id);
          setTitleLink(link);
          setArticleData(data.articles);
          setReshuffle(true);
      });
    }
  }

  const renderHistory = (history, index) => {
    return(
      <Grid item xs={12} key={index} onClick={()=> reDigHandler(history.id, history.title)} style={historyEntry} className='historyTags'><li>{history.title}</li></Grid>
    )
  }

  const renderBox = (box, index) => {
    return(
      <InfoBox data={box} key={index} dig={digHandler}></InfoBox>
    )
  }

  return (

    <div className="App">
    <LoadingBar color='#2565AE' ref={ref} />

      <Grid container item spacing={3} xs={12} justify="flex-end" style={{position: 'absolute'}}>
        <Grid item xs={12} sm={2}>
          <Grid item xs={12}>
            <img style={pageIcon} src={logo} alt="Logo" />
          </Grid>

          <br/>

          <Grid item xs={12} style={pageIntro}> 
            
            {/* Start Over Button */}
            {/* Start over with new cards with description*/}
            <Button variant="primary" size="lg" onClick={clickHandler} style={restartButton} className='restartButton'>
            <strong>Start Over</strong>
            </Button>
            <h3 style={subText}>Tired of your rabbithole? Start over</h3>

            {/* Reshuffling mechanic/button */}
            {reShuffle ? <Button onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} variant="primary" size="lg" onClick={() => reDigHandler(titleId, subTitle)} style={restartButton} className='restartButton'>
                            <strong>Find more boxes</strong>
                          </Button>: null}
            {!reShuffle ? <Button onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} variant="primary" size="lg" style={restartButtonInactive} className='restartButton'>
                            <strong>Find more boxes</strong>
                          </Button>: null}

            <h3 style={subText}>Shuffle within this article</h3>

            <Instructions/>

            <br/>

            {/* History */}
            <Grid item xs={12} style={historyGrid}>
              <h4 style={{font:'14px', marginBottom: '7px', fontFamily: 'Georgia', color: '#222222'}}>Rabbithole History:</h4>
              <ul>{history && history.map(renderHistory)}</ul>
            </Grid>

          </Grid>

          <br/>

        </Grid>

        <Grid item container xs={12} sm={10} spacing={4} style={{margin: '0px', paddingBottom: '0px'}}>
          
          <TypeEffect/>

          <Grid item xs={12} style={subTitleStyle} onClick={() => titleClick(titleLink)} className='subTitle'>{subTitle}</Grid>
          
          <Grid container item xs={12} spacing={4} justify="flex-end" style={boxGrid}>
              {articleData && articleData.map(renderBox)}
          </Grid>

        </Grid>

        <Scroll showBelow={50} />
        
        <Grid style={footer} item xs={12} >
          <h3 style={{fontFamily: 'Changa', }}>Created by <a target="_blank" href="https://github.com/kristofgazso/pickabox.space" style={{color: '#2565AE'}}>The HAKers</a></h3>
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
  fontFamily: 'Changa',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '35px',
  lineHeight: 'normal',
  cursor: 'pointer',
  padding: '0px',
  /* or 71% */

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  color: '#222222',
  justifyContent: 'center',
}
const pageTitle={
  fontFamily: 'Changa',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: 'normal',
  margin: 'auto',
  justifyContent: 'center',
  padding: '0px',
  marginTop: '5px',
  /* or 71% */

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',

  color: '#222222'
}

const pageIcon={
  margin: 'auto',
  padding: 'auto',
  height: 'auto',
  width:'auto',
  position: 'relative',
  width: '-webkit-fill-available'
}
const pageIntro={
  textAlign: 'left',
  paddingTop: '50px',
}

const restartButton={
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 16px',
  width: '133px',
  height: '34px',
  cursor:'pointer',
  borderRadius: '5px',
  borderColor: 'transparent',
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  margin: 'auto',
}

const restartButtonInactive={
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 16px',
  width: '133px',
  height: '34px',
  cursor:'pointer',
  background: '#97979c',
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
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
}

const historyGrid={
  fontFamily: 'Open Sans',
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

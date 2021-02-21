import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Grid from '@material-ui/core/Grid';
import './infoBox.css';

const InfoBox = (props) => {

  function handleClick(link) {
    window.open(link);
    window.focus();
  }

  return (
    <Grid container item xs={12} md={6} lg={3} spacing={2}>
      <Card style={box}>
        <Card.Title style={boxTitle}>{props.data.title}</Card.Title>
        <Card.Body style={boxBody} onClick={props.dig('https://en.wikipedia.org/wiki/' + props.data.title)}>
          <Card.Text>
            {props.data.extract}
          </Card.Text>
        </Card.Body>
        <Button style={wikiButton} onClick={() => handleClick('https://en.wikipedia.org/wiki/' + props.data.title)}>Open Wiki</Button>
      </Card>
    </Grid>
  )
}
const boxBody={
  // overflowY: 'scroll',
  minHeight: '60%',
  maxWidth: '400px',
  cursor:'pointer',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '10px',
  textAlign: 'left',
  flex: '1 1 auto',
  overflow: 'auto'
}
const box={
  overflow: 'hidden',
  color: 'black',
  position: 'relative',
  border: '.2rem solid #ececec',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  background: '#F8F8F8',
  overflow: 'hidden',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween'
}
const boxTitle={
  height: 'auto',
  width: 'auto',
  fontFamily: 'Georgia',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '26px',
  margin:'5px'
}

const wikiButton={
  bottom: '5px',
  right: '5px',
  width: '100px',
  marginLeft: 'auto',
}

export default InfoBox

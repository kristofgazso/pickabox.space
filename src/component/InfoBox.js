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
    <Grid container item xs={12} sm={6} md={4} lg={3} spacing={2}>
      <Card style={box} className='wikiBox shadow-box-example hoverable'>
        <Card.Title style={boxTitle} onClick={props.dig(props.data.title, props.data.id, props.data.url)}>{props.data.title}</Card.Title>
        <Card.Body style={boxBody} onClick={props.dig(props.data.title, props.data.id, props.data.url)} >
          <Card.Text>
            {props.data.extract}
          </Card.Text>
        </Card.Body>
        <Button style={wikiButton} onClick={() => handleClick(props.data.url)}>
          <span>Read More</span></Button>
      </Card>
    </Grid>
  )
}
const boxBody={
  // overflowY: 'scroll',
  // minHeight: '60%',
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
  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
  // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  background: '#F8F8F8',
  overflow: 'hidden',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
  paddingDown:'25px',
  paddingRight:'10px',
  paddingLeft:'10px',
  padding:'5px'
}
const boxTitle={
  height: 'auto',
  width: 'auto',
  fontFamily: 'Georgia',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '26px',
  margin:'5px',
  paddingTop:'5px',
  
}

const wikiButton={
  bottom: '5px',
  right: '5px',
  width: '120px',
  marginLeft: 'auto',
}

export default InfoBox

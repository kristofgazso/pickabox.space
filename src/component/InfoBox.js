import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Grid from '@material-ui/core/Grid';

const InfoBox = (props) => {

  function handleClick(link) {
    window.open(link);
  }

  return (
    <Grid container item xs={12} md={6} lg={3} spacing={2}>
      <Card style={box}>
        <Card.Title style={boxTitle}>{props.data.title}</Card.Title>
        <Card.Body style={boxBody}>
          <Card.Text>
            {props.data.extract}
          </Card.Text>
        </Card.Body>
        <Button variant="primary" onClick={() => handleClick('https://en.wikipedia.org/wiki/' + props.data.title)}>Go to Wiki</Button>
      </Card>
    </Grid>
  )
}
const boxBody={
  overflowY: 'scroll',
  height: '250px',
  maxWidth: '400px',
  cursor:'pointer',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '10px',
}
const box={
  color: 'black',
  position: 'relative',
  border: '.2rem solid #ececec',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '5px',
  background: '#F8F8F8',
  overflow: 'hidden'
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
export default InfoBox

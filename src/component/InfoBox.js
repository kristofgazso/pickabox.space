import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Grid from '@material-ui/core/Grid';

const InfoBox = (props) => {

  function handleClick(link) {
    // let link = '';
    window.open(link);
  }

  return (
    <Grid container item xs={12} sm={4}spacing={2}>
      <Card style={{ width: '18rem' }} >
        <Card.Img style={cardTitle} variant="top" src={props.data.image}/>
        <Card.Body style={cardBody}>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>
            {props.data.extract}
          </Card.Text>
        </Card.Body>
        <Button variant="primary" onClick={() => handleClick(props.data.link)}>Go to Wiki</Button>
      </Card>
    </Grid>
  )
}
const cardBody={
  color: 'black',
  position: 'relative',
  border: '.2rem solid #ececec',
  minWidth: '250px',
  overflowY: 'scroll',
  maxHeight: '250px',
}
const cardTitle={
  height: 'auto',
  width: 'auto'
}
export default InfoBox

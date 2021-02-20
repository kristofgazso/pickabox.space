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
    <Grid container item xs={12} sm={6} md={4} spacing={2}>
      <Card style={cardBody}>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Body style={cardText}>
          <Card.Text>
            {props.data.extract}
          </Card.Text>
        </Card.Body>
        <Button variant="primary" onClick={() => handleClick(props.data.link)}>Go to Wiki</Button>
      </Card>
    </Grid>
  )
}
const cardText={
  overflowY: 'scroll',
  height: '250px',
  maxWidth: '400px',
  cursor:'pointer'
}
const cardBody={
  color: 'black',
  position: 'relative',
  border: '.2rem solid #ececec'
}
const cardTitle={
  height: 'auto',
  width: 'auto'
}
export default InfoBox

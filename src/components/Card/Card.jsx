import React, { Component } from 'react'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

import '../../assets/css/Card.css'

class SimpleCard extends Component {
  render() {
    const { video } = this.props

    return (
      <Card className="content-card">
        <CardMedia>
          <img className="card-image" src={video.snippet.thumbnails.high.url} alt={`thumbnail of ${video.snippet.title}`} />
        </CardMedia>
        <CardTitle className="card-text" title={video.snippet.title} subtitle={video.snippet.channelTitle} />
        <CardText className="card-text">{video.snippet.description}</CardText>
        <CardActions>
          <FlatButton label="Detalhes" containerElement={<Link to={`/Details/${video.id.videoId}`}></Link>}/>
        </CardActions>
      </Card>
    );
  }
}

export default SimpleCard;

import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import IconThumbUp from 'material-ui/svg-icons/action/thumb-up'
import IconThumbDown from 'material-ui/svg-icons/action/thumb-down'
import IconVisibility from 'material-ui/svg-icons/action/visibility'

class DetailedCard extends Component {
  render() {
    const { video } = this.props

    return (
      <Card className="content-card">
        <CardMedia>
          <div
            dangerouslySetInnerHTML={{__html: video.player.embedHtml }}>
          </div>
        </CardMedia>

        <CardTitle
          className="card-text"
          title={video.snippet.title}
          subtitle={video.snippet.channelTitle} />

        <CardText className="card-description">
          {video.snippet.description}
        </CardText>

        <CardText className="card-statistics">
          <div className="card-statistics-item">
            <IconVisibility /> {video.statistics.viewCount}
          </div>

          <div className="card-statistics-item">
            <IconThumbUp /> {video.statistics.likeCount}
          </div>

          <div className="card-statistics-item">
            <IconThumbDown /> {video.statistics.dislikeCount}
          </div>
        </CardText>
      </Card>
    );
  }
}

export default DetailedCard;


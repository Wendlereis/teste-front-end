import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchVideoDetails } from '../../actions/videosActions'

import FlatButton from 'material-ui/FlatButton'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

import IconThumbUp from 'material-ui/svg-icons/action/thumb-up'
import IconThumbDown from 'material-ui/svg-icons/action/thumb-down'
import IconVisibility from 'material-ui/svg-icons/action/visibility'
import IconNavigate from 'material-ui/svg-icons/image/navigate-before';

import YoutubeAPI from '../../service/YoutubeAPI'
import '../../assets/css/Details.css'

class Details extends Component {

  componentDidMount() {
    const { fetchVideoDetails, match } = this.props

    fetchVideoDetails(match.params.id)
  }

  render() {
    const { videoDetails } = this.props
    const videoItem = videoDetails[0]

    if(videoItem === undefined) {
      return (
        <div>Dados não encontrados</div>
      )
    }
    else {
      return (
        <div id="details">
          <div className="title">
            <FlatButton
              label="Voltar"
              primary={true}
              icon={<IconNavigate />}
              style={styles.whiteButton}
              labelStyle={styles.whiteButton}
              onClick={() => window.history.back()}/>
          </div>

          <div className="details">
            <Card className="content-card">
              <CardMedia>
                <div
                  dangerouslySetInnerHTML={{__html: videoItem.player.embedHtml }}>
                </div>
              </CardMedia>

              <CardTitle
                className="card-text"
                title={videoItem.snippet.title}
                subtitle={videoItem.snippet.channelTitle} />

              <CardText className="card-description">
                {videoItem.snippet.description}
              </CardText>

              <CardText className="card-statistics">
                <div className="card-statistics-item">
                  <IconVisibility /> {videoItem.statistics.viewCount}
                </div>

                <div className="card-statistics-item">
                  <IconThumbUp /> {videoItem.statistics.likeCount}
                </div>

                <div className="card-statistics-item">
                  <IconThumbDown /> {videoItem.statistics.dislikeCount}
                </div>
              </CardText>
            </Card>
          </div>
        </div>
      )
    }
  }
}

const styles = {
  whiteButton: {
    color: '#ffffff',
  }
}

function mapStateToProps({ videoDetails }) {
  return {
    videoDetails
  }
}

export default connect(mapStateToProps, {
  fetchVideoDetails
})(Details);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchVideoDetails } from '../../actions/videosActions'
import FlatButton from 'material-ui/FlatButton'
import IconNavigate from 'material-ui/svg-icons/image/navigate-before'

import '../../assets/css/Details.css'

import DetailedCard from '../Card/DetailedCard'

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
          <FlatButton
            label="Voltar"
            primary={true}
            icon={<IconNavigate />}
            style={styles.whiteButton}
            labelStyle={styles.whiteButton}
            onClick={() => window.history.back()}/>

          <div className="details">
            <DetailedCard video={videoItem} />
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

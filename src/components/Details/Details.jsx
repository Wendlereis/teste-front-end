import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import IconThumbUp from 'material-ui/svg-icons/action/thumb-up'
import IconThumbDown from 'material-ui/svg-icons/action/thumb-down'
import IconVisibility from 'material-ui/svg-icons/action/visibility'
import IconNavigate from 'material-ui/svg-icons/image/navigate-before';
import YoutubeAPI from '../../service/YoutubeAPI'
import '../../assets/css/Details.css'

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null
    }
  }

  componentDidMount() {
    new YoutubeAPI().searchById(this.props.match.params.id).then(res => {
      this.setState({ item: res })
    })
  }

  render() {
    return (
      this.state.item !== null ? (
        <div id="details">
          <div className="title">
            <FlatButton
              label="Voltar"
              primary={true}
              icon={<IconNavigate/>}
              onClick={() => window.history.back()}/>
          </div>

          <div className="details">
            <Card className="content-card">
              <CardMedia>
                <div
                  dangerouslySetInnerHTML={{__html: this.state.item.player.embedHtml }}>
                </div>
              </CardMedia>

              <CardTitle
                className="card-text"
                title={this.state.item.snippet.title}
                subtitle={this.state.item.snippet.channelTitle} />

              <CardText className="card-description">
                {this.state.item.snippet.description}
              </CardText>

              <CardText className="card-statistics">
                <div className="card-statistics-item">
                  <IconVisibility /> {this.state.item.statistics.viewCount}
                </div>

                <div className="card-statistics-item">
                  <IconThumbUp /> {this.state.item.statistics.likeCount}
                </div>

                <div className="card-statistics-item">
                  <IconThumbDown /> {this.state.item.statistics.dislikeCount}
                  </div>
              </CardText>
            </Card>
          </div>
        </div>
      ) : (
        <div>Dados nao encontrado</div>
      )
    );
  }
}

export default Details;

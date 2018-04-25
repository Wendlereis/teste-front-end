import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVideos, fetchNextPage, fetchPrevPage } from '../../actions/videosActions'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search'
import { red500, redA700 } from 'material-ui/styles/colors'

import '../../assets/css/Search.css'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      errorMessage: '',
      currentPage: 1,
      totalPages: 0
    }
  }

  componentWillReceiveProps({ videosInfo }) {
    const { pagination } = videosInfo
    const { totalResults, resultsPerPage } = pagination

    const totalPages = Math.floor(totalResults / resultsPerPage)

    this.setState({ totalPages })
  }

  setSearchQuery = (event) => {
    let searchQuery = event.target.value

    if(searchQuery !== '') {
      this.setState({ searchQuery, errorMessage: '' })
    }
    else {
      this.setState({ searchQuery: '' })
    }
  }

  searchVideo = () => {
    const { fetchVideos } = this.props
    const { searchQuery } = this.state

    if(searchQuery === '') {
      this.setState({
        errorMessage: 'Insira uma palavra-chave para buscar videos incríveis'
      })

      return
    }

    fetchVideos(searchQuery)
  }

  prevPage = () => {
    const { searchQuery } = this.state
    const { videosInfo, fetchPrevPage } = this.props

    fetchPrevPage(videosInfo.prevPageToken, searchQuery)

    this.setState(prevState => {
      return { currentPage: prevState.currentPage - 1 }
    })
  }

  nextPage = () => {
    const { searchQuery } = this.state
    const { videosInfo, fetchNextPage } = this.props

    fetchNextPage(videosInfo.nextPageToken, searchQuery)

    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 }
    })
  }

  render() {
    const { videosInfo } = this.props
    const { errorMessage, searchQuery, currentPage, totalPages } = this.state
    const isContentVisible = videosInfo.items.length > 0

    return (
      <div id="search">
        <div className="search">
          <div className={`searchbar ${isContentVisible ? 'active' : '' }`}>
            <TextField
              className="searchbar-textfield"
              hintText="Pesquisar"
              hintStyle={styles.hintStyle}
              inputStyle={styles.searchbar}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
              errorText={errorMessage}
              onChange={this.setSearchQuery}
              value={searchQuery}/>

            <IconButton
              iconStyle={styles.iconStyle}
              onClick={this.searchVideo}>
              <ActionSearch  />
            </IconButton>
          </div>

          { isContentVisible && <div>
            <div className="content">
              <h2>Resultados para: {searchQuery}</h2>

              <div className="content-items">
                {videosInfo.items.map(item => {
                  return(
                    <Card className="content-card" key={item.id.videoId}>
                      <CardMedia>
                        <img className="card-image" src={item.snippet.thumbnails.high.url} alt={`thumbnail of ${item.snippet.title}`} />
                      </CardMedia>
                      <CardTitle className="card-text" title={item.snippet.title} subtitle={item.snippet.channelTitle} />
                      <CardText className="card-text">{item.snippet.description}</CardText>
                      <CardActions>
                        <FlatButton label="Detalhes" containerElement={<Link to={`/Details/${item.id.videoId}`}></Link>}/>
                      </CardActions>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="pagination">
              <FlatButton label="Prev" labelStyle={styles.button} primary={true} onClick={this.prevPage} />
              <div className="pagination-indicator">{currentPage} de {totalPages}</div>
              <FlatButton label="Next" labelStyle={styles.button} primary={true} onClick={this.nextPage} />
            </div>
          </div> }
        </div>
      </div>
    );
  }
}

const styles = {
  underlineStyle: {
    borderColor: redA700,
  },
  underlineFocusStyle: {
    borderColor: red500,
  },
  searchbar: {
    color: '#fff',
    fontSize: '26px'
  },
  iconStyle: {
    color: '#fff',
    margin:  '10px 10px'
  },
  hintStyle: {
    color: '#fff',
    fontSize: '18px'
  },
  button: {
    color: '#fff'
  }
};

function mapStateToProps({ videosInfo }){
  return {
    videosInfo
  }
}

export default connect(mapStateToProps,{
  fetchVideos,
  fetchNextPage,
  fetchPrevPage
})(Search);

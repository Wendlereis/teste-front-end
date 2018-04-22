import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search'
import { red500, redA700 } from 'material-ui/styles/colors'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

import YoutubeAPI from '../../service/YoutubeAPI'
import '../../assets/css/Search.css'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      resultTitle: localStorage.getItem('resultTitle'),
      items: JSON.parse(localStorage.getItem('searchResult')),
      pagination: {},
      errorMessage: ''
    }
  }

  setSearchQuery(event) {
    let searchQuery = event.target.value

    if(searchQuery !== '') {
      this.setState({ searchQuery, errorMessage: '' })
    }
    else {
      this.setState({ searchQuery: '', resultTitle: '', items: null})
    }
  }

  searchVideo() {
    let searchQuery = this.state.searchQuery

    if(searchQuery === '') {
      this.setState({ errorMessage: 'Insira uma palavra-chave para buscar videos incríveis' })
      return
    }

    new YoutubeAPI().search(searchQuery).then(res => {
      let strItems = JSON.stringify(res.items)
      localStorage.setItem('searchResult', strItems)
      localStorage.setItem('resultTitle', searchQuery)

      this.setState({ items: res.items, pagination: res.pagination, resultTitle: searchQuery })
    })
  }

  render() {
    const isContentVisible = this.state.items ? true : false

    return (
      <div id="search">
        <div className="search">
          <div className={`searchbar ${isContentVisible ? 'active' : '' }`}>
            <TextField
              className="searchbar-textfield"
              hintText="Pesquisar"
              errorText={this.state.errorMessage}
              hintStyle={styles.hintStyle}
              inputStyle={styles.searchbar}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
              onChange={this.setSearchQuery.bind(this)}
              value={this.state.searchQuery}/>

            <IconButton
              iconStyle={styles.iconStyle}
              onClick={this.searchVideo.bind(this)}>
              <ActionSearch  />
            </IconButton>
          </div>

          { isContentVisible && <div className="content">
            <h2>Resultados para: {this.state.resultTitle}</h2>

            <div className="content-items">
              {this.state.items.map(item => {
                return(
                  <Card className="content-card">
                    <CardMedia>
                      <img className="card-image" src={item.snippet.thumbnails.high.url} alt="" />
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
  }
};

export default Search;

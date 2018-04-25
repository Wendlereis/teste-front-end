import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVideos } from '../../actions/videosActions'
import SimpleCard from '../Card/Card'
import Pagination from '../Pagination/Pagination'
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
      errorMessage: ''
    }
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

  render() {
    const { videosInfo } = this.props
    const { errorMessage, searchQuery } = this.state
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
                    <SimpleCard key={item.id.videoId} video={item}/>
                  )
                })}
              </div>
            </div>

            <Pagination query={searchQuery} />
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
  fetchVideos
})(Search);

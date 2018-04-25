import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNextPage, fetchPrevPage } from '../../actions/videosActions'
import FlatButton from 'material-ui/FlatButton'

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPages: 0
    }
  }

  componentDidMount() {
    const { videosInfo } = this.props

    const { pagination } = videosInfo
    const { totalResults, resultsPerPage } = pagination

    const totalPages = Math.floor(totalResults / resultsPerPage)

    this.setState({ totalPages })
  }

  prevPage = () => {
    const { videosInfo, fetchPrevPage, query } = this.props

    fetchPrevPage(videosInfo.prevPageToken, query)

    this.setState(prevState => {
      const currentPage = prevState.currentPage - 1

      if(currentPage < 0){
        return { currentPage: 0 }
      }
      else {
        return { currentPage }
      }
    })
  }

  nextPage = () => {
    const { videosInfo, fetchNextPage, query } = this.props

    fetchNextPage(videosInfo.nextPageToken, query)

    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 }
    })
  }

  render() {
    const { currentPage, totalPages } = this.state

    return (
      <div className="pagination">
        <FlatButton label="Prev" labelStyle={styles.button} primary={true} onClick={this.prevPage} />
        <div className="pagination-indicator">{currentPage} de {totalPages}</div>
        <FlatButton label="Next" labelStyle={styles.button} primary={true} onClick={this.nextPage} />
      </div>
    );
  }
}

const styles = {
  button: {
    color: '#fff'
  }
}

function mapStateToProps({ videosInfo }){
  return {
    videosInfo
  }
}

export default connect(mapStateToProps,{
  fetchNextPage,
  fetchPrevPage
})(Pagination)

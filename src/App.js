import React, { Component } from 'react';
import './App.css';
import AlbumCard from './components/AlbumCard';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Modal from './components/Modal';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
      query: 'soad',
      sortMethod: '',
      modal: null,
      limit: 25,
      loadingMoreData: false,
      error: false
    }
  }

  componentDidMount(){
    this.getData(this.state.query)
  }

  wsSearchCB(data){
    console.log(data)
  }

  sortData(method){
    this.setState({ sortMethod: method })
    if(method === 'price-lth'){
      this.setState({ data: this.state.data.sort((a, b) => a.collectionPrice - b.collectionPrice) })
    }
    if(method === 'price-htl'){
      this.setState({ data: this.state.data.sort((a, b) => b.collectionPrice - a.collectionPrice) })
    }
    if(method === 'date-nto'){
      this.setState({ data: this.state.data.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)) })
    }
    if(method === 'date-otn'){
      this.setState({ data: this.state.data.sort((a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate)) })
    }
  }

  loadMore(){
    this.setState({ limit: this.state.limit + 25, loadingMoreData: true }, () => {
      this.getData(this.state.query, true)
    })
  }

  getData(query, loadingMore){

    this.setState({
        query, 
        data: loadingMore ? this.state.data : null ,
        sortMethod: '',
        limit: loadingMore ? this.state.limit : 25,
        loadingMoreData: !loadingMore ? false : true
        }, 
        () => {
      // Execute fetch on setState callback // Added proxy to avoid CORS issues
      let url = `https://itunes.apple.com/search?term=${query}&callback=wsSearchCB&media=music&entity=album&limit=${this.state.limit}`
      let proxyurl = `https://cors-anywhere.herokuapp.com/`
      fetch(proxyurl + url)
      .then(d => d.text())
      .then(res => {

        let data = res.substring(13, res.length-4)    
        let parsedData = JSON.parse(data)
        this.setState({ data: parsedData.results, loadingMoreData: false, limit: this.state.limit === 200 ? null : this.state.limit })

      })
      .catch(err => {
        console.log('Error: ',err)
        this.setState({ error: true })
      })

      })

  }

  toggleModal(album){
    this.setState({modal: album})
  }

  render() {
    const { data } = this.state
    return (
      <div className="main-container" >

        <Navbar newSearch={query => this.getData(query)} query={this.state.query} />

        {data && data.length > 0 ? 
          <h3 className="results-text" >
            Showing {data.length} results for&nbsp;<strong>{this.state.query}</strong>
            <div className="sortby" >
              Sort by <select value={this.state.sortMethod} onChange={e => this.sortData(e.target.value)} >
                        <option value="" disabled defaultValue >Choose option</option>
                        <option value="price-htl" >Price (High to low)</option>
                        <option value="price-lth" >Price (Low to high)</option>
                        <option value="date-nto" >Date (New to old)</option>
                        <option value="date-otn" >Date (Old to new)</option>
                      </select>
            </div>
          </h3>
         : data && data.length === 0 ? 
          <div className="no-results" >
            No results for '{this.state.query}'
          </div>
          : null}

        <div className="main-grid" >

          {data ? data.map(a => {
            return ( <AlbumCard openModal={() => this.toggleModal(a)} key={a.collectionId} album={a} /> )
          }) : <Loader />}

        </div>

        {data && data.length > 20 && !this.state.loadingMoreData && this.state.limit ? 
          <div className="load-more" >
            <i className="fas fa-plus" onClick={() => this.loadMore()} ></i>
          </div> : null}

        {this.state.loadingMoreData ? 
          <div className="loading-more" >
            <span></span>
          </div> : null }

        {this.state.modal ? <Modal closeModal={() => this.toggleModal(null)} data={this.state.modal} /> : null}

        <div className="footer" >
          <span>Developed by Sebastian Sarmiento</span>
        </div>

      </div>
    )
  }
}


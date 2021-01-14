import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
      nominations: []
    }

    let storedNominations = JSON.parse(sessionStorage.getItem('storedNominations'))
    if (storedNominations != null && storedNominations.length > 0) {
      this.state.nominations = storedNominations
    }
  }

  handleRemoveButtonPress = (event) => {
    event.preventDefault()  
    
    let updatedNominations = []
    updatedNominations.push.apply(updatedNominations, this.state.nominations)
    updatedNominations.splice(updatedNominations.indexOf(event.target.value), 1)

    this.setState({
      query: this.state.query,
      results: this.state.results,
      nominations: updatedNominations
    })

    sessionStorage.setItem('storedNominations', JSON.stringify(updatedNominations))
  }

  handleNominateButtonPress = (event) => {
    event.preventDefault()  

    let updatedNominations = []
    updatedNominations.push.apply(updatedNominations, this.state.nominations)
    updatedNominations.push(event.target.value)

    this.setState({
      query: this.state.query,
      results: this.state.results,
      nominations: updatedNominations
    })

    sessionStorage.setItem('storedNominations', JSON.stringify(updatedNominations))
  }

  handleInputChange = (event) => {
    event.preventDefault()

    const api = 'http://www.omdbapi.com/?apikey=b2798bd0&s=' + event.target.value

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        let movies = []
        if (data.Response === "True") {
          let i;
          for (i = 0; i < data.Search.length; i++) {
            movies.push(data.Search[i].Title + " (" + data.Search[i].Year + ")")
          }
        }
        return movies
      })
      .then((movies) => {
        this.setState({
          query: event.target.value,
          results: movies,
          nominations: this.state.nominations
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div class="Alert" style={{display: this.state.nominations.length == 5 ? 'block' : 'none' }}>
          <strong>Success!</strong> You have selected 5 nominations.
        </div>

        <div className="Header">
          <h3>
            <img class='Logo' src='the-shoppies-logo.png'></img>
            The Shoppies
          </h3>
        </div>

        <div className="Row">
          <div className="Card">
            <label>Movie title</label>
            <input className="Search" type="text" placeholder="Search OMDB..." onChange={this.handleInputChange}></input>
          </div>
        </div>

        <div className="Row">
          <div className="Card">
            <label><b>Results for "{this.state.query}"</b></label>
            <ul>
              {
                this.state.results.map((item) => {
                  return(
                    <li key={item}>
                      <span>
                        {item}
                      </span>
                      <span>
                        <button className="Button" type="button" value={item} onClick={this.handleNominateButtonPress} disabled={this.state.nominations.includes(item) ? true : false}>
                          Nominate
                        </button>
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="Card">
            <label><b>Nominations</b></label>
            <ul>
              {
                this.state.nominations.map((item) => {
                  return(
                    <li key={item}>
                      <span>{item}</span>
                      <span><button className="Button" type="button" value={item} onClick={this.handleRemoveButtonPress}>Remove</button></span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default App
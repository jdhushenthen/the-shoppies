import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // Constructor to initialize state variables
  constructor(props) {
    super(props)
    
    this.state = {
      query: '',        // Search value entered by user
      results: [],      // Movie results returned by API
      nominations: []   // Movie nominations selected by user
    }

    // Check user's session storage for any nominations
    let storedNominations = JSON.parse(sessionStorage.getItem('storedNominations'))
    if (storedNominations != null && storedNominations.length > 0) {
      this.state.nominations = storedNominations
    }
  }

  // Handles button press for nomination removal
  handleRemoveButtonPress = (event) => {
    event.preventDefault()  
    
    // Remove the movie from the nomination list
    let updatedNominations = []
    updatedNominations.push.apply(updatedNominations, this.state.nominations)
    updatedNominations.splice(updatedNominations.indexOf(event.target.value), 1)

    // Update the nominations state variable
    this.setState({
      query: this.state.query,
      results: this.state.results,
      nominations: updatedNominations
    })

    // Update the nominations list in the session storage
    sessionStorage.setItem('storedNominations', JSON.stringify(updatedNominations))
  }

  // Handles button press for new nomination
  handleNominateButtonPress = (event) => {
    event.preventDefault()  

    // Add the movie to the nomination list
    let updatedNominations = []
    updatedNominations.push.apply(updatedNominations, this.state.nominations)
    updatedNominations.push(event.target.value)

    // Update the nominations state variable
    this.setState({
      query: this.state.query,
      results: this.state.results,
      nominations: updatedNominations
    })

    // Update the nominations list in the session storage
    sessionStorage.setItem('storedNominations', JSON.stringify(updatedNominations))
  }

  // Handles changes in the search field
  handleInputChange = (event) => {
    event.preventDefault()

    // API URL for searching movies on OMDB
    const api = 'https://www.omdbapi.com/?apikey=b2798bd0&s=' + event.target.value

    // Make API call (fetch request)
    fetch(api)
      .then((response) => response.json())
      .then((data) => {

        // Get a list of the movie results
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

        // Update the query and results state variables
        this.setState({
          query: event.target.value,
          results: movies,
          nominations: this.state.nominations
        })
      })
  }

  // Returns JSX to render
  render() {
    return (
      <div className="App">

        {/* Banner notification that appears when 5 nominations have been selected */}
        <div class="Alert" style={{display: this.state.nominations.length === 5 ? 'block' : 'none' }}>
          <strong>Success!</strong> You have selected 5 nominations.
        </div>

        {/* Header that contains logo and title */}
        <div className="Header">
          <h3>
            <img class='Logo' src='the-shoppies-logo.png'></img>
            The Shoppies
          </h3>
        </div>

        <div className="Row">

          {/* Search bar to look up movies on OMDB */}
          <div className="Card">
            <label>Movie title</label>
            <input className="Search" type="text" placeholder="Search OMDB..." onChange={this.handleInputChange}></input>
          </div>
        </div>

        <div className="Row">

          {/* Displays list of search results */}
          <div className="Card">
            <label><b>Results for "{this.state.query}"</b></label>
            <ul>
              {
                this.state.results.map((item) => {
                  return(
                    <li key={item}>
                      <span>{item}</span>
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

          {/* Displays list of nominations */}
          <div className="Card">
            <label><b>Nominations</b></label>
            <ul>
              {
                this.state.nominations.map((item) => {
                  return(
                    <li key={item}>
                      <span>{item}</span>
                      <span>
                        <button className="Button" type="button" value={item} onClick={this.handleRemoveButtonPress}>
                          Remove
                        </button>
                      </span>
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
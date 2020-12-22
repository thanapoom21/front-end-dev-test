import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

// import Card from "./Card";
// import NoImage from "./NoImage";

const Card = props => {
  return (
    <li className="card-wrap">
      <a href={props.url}>
        <img src={props.src} alt={props.title} />
        <div className="title-container">
          <p>
            {props.title}
          </p>
        </div>
      </a>
    </li>
  );
};

const NoImage = props => {
  return (
    <li className="no-imgs">
      <h3>Sorry, no images match your search.</h3>
    </li>
  );
};

const SportsList = ({ results }) => {
  let cards;
  if (results.length) {
    cards = results.map((result, idx) =>
      <Card title={result.webTitle} url={result.webUrl} src={result.elements[0].assets[0].file} key={idx} />
    );
  } else {
    cards = <NoImage />;
  }

  return <ul className="sports-list">{cards}</ul>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
    };
  }

  componentDidMount = (query = "sport") => {
    axios
      .get(
        `https://content.guardianapis.com/search?section=${query}&show-elements=image&api-key=test`
      )
      .then(response => {
        this.setState({
          results: response.data.response.results,
          loading: false,
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="row">
              <a href="/">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
            </div>
            <div className="row">
              <nav className="navigation">
                <ul>
                  <li>
                    <a href="/">News Today</a>
                  </li>
                  <li>
                    <a href="/">Sports</a>
                  </li>
                  <li>
                    <a href="/">Culture</a>
                  </li>
                  <li>
                    <a href="/">Lifestyle</a>
                  </li>
                </ul>

                <div className="searchbar">
                  <input />
                </div>
              </nav>
            </div>
          </div>
        </header>

        <section className="App-content">
          <section className="container">
            <section className="top-story-section">
              <div className="heading-bookmark">
                <h1>Top stories</h1>
                <div className="right-section">
                  <div className="half">
                    <button>View Bookmark</button>
                  </div>
                  <div className="half drowdown-list">
                    {/* <label for="news-select">Newest First</label> */}
                    <select name="news" id="news-select">
                      <option value="">--Newest First--</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="news-cards">
              </div>
            </section>
            <section className="sports">
              <h1>Sports</h1>
              {this.state.loading ? (
                <p>Loading...</p>
              ) : (
                  <SportsList results={this.state.results} />
                )}
            </section>
          </section>
        </section>

        <footer className="App-footer"></footer>
      </div>
    );
  }
}

export default App;

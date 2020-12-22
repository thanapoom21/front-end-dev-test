import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import Route from "./components/Route";
import Link from "./components/Link";
import Culture from "./components/Culture";
// import Header from "./components/Header";
import Lifestyle from "./components/Lifestyle";
import NewsToday from "./components/NewsToday";
import Sports from "./components/Sports";

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
    const { results, loading } = this.state;
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
                    <Link href="/" className="nav-item">
                      News Today
                    </Link>
                  </li>
                  <li>
                    <Link href="/sports" className="nav-item">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link href="/culture" className="nav-item">
                      Culture
                    </Link>
                  </li>
                  <li>
                    <Link href="/lifestyle" className="nav-item">
                      Lifestyle
                    </Link>
                  </li>
                </ul>

                <form className="search-form">
                  <label className="is-hidden" htmlFor="search">
                    Search
                  </label>
                  <input
                    className="is-hidden"
                    type="search"
                    onChange={null}
                    name="search"
                    ref={input => (this.query = input)}
                    placeholder="Search..."
                  />
                  <button type="submit" id="submit" className="search-button">
                    <i className="material-icons icn-search">search</i>
                  </button>
                </form>
              </nav>
            </div>
          </div>
        </header>

        <section className="App-content">
          <Route path="/">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <NewsToday theGuardianResults={results} loading={loading} />
            )}
          </Route>
          <Route path="/sports">
            <Sports theGuardianResults={results} loading={loading} />
          </Route>
          <Route path="/culture">
            <Culture theGuardianResults={results} loading={loading} />
          </Route>
          <Route path="/lifestyle">
            <Lifestyle theGuardianResults={results} loading={loading} />
          </Route>
        </section>

        <footer className="App-footer"></footer>
      </div>
    );
  }
}

export default App;

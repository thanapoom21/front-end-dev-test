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
      newsResult: [],
      sportResult: [],
      cultureResult: [],
      lifeStyleResult: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    axios
      .all([
        axios.get(
          `https://content.guardianapis.com/search?section=news&show-elements=image&api-key=test`
        ),
        axios.get(
          `https://content.guardianapis.com/search?section=sport&show-elements=image&api-key=test`
        ),
        axios.get(
          `https://content.guardianapis.com/search?section=culture&show-elements=image&api-key=test`
        ),
        axios.get(
          `https://content.guardianapis.com/search?section=lifeandstyle&show-elements=image&api-key=test`
        ),
      ])
      .then(([news, sport, culture, lifeandstyle]) => {
        this.setState({
          newsResult: news.data.response.results,
          sportResult: sport.data.response.results,
          cultureResult: culture.data.response.results,
          lifeStyleResult: lifeandstyle.data.response.results,
          loading: false,
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    const {
      newsResult,
      sportResult,
      cultureResult,
      lifeStyleResult,
      loading,
    } = this.state;
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
              <NewsToday
                newsResult={newsResult}
                sportResult={sportResult}
                loading={loading}
              />
            )}
          </Route>
          <Route path="/sports">
            <Sports theGuardianResults={sportResult} loading={loading} />
          </Route>
          <Route path="/culture">
            <Culture theGuardianResults={cultureResult} loading={loading} />
          </Route>
          <Route path="/lifestyle">
            <Lifestyle theGuardianResults={lifeStyleResult} loading={loading} />
          </Route>
        </section>

        <footer className="App-footer"></footer>
      </div>
    );
  }
}

export default App;

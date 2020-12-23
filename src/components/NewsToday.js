import Card from "./Card";
import NoImage from "./NoImage";
import PeaksImg from "../peaks.png";

const SportsList = ({ results }) => {
  let cards;
  if (results.length) {
    cards = results.map((result, idx) => (
      <Card
        title={result.webTitle}
        url={result.webUrl}
        src={result.elements[0].assets[0].file}
        key={idx}
      />
    ));
  } else {
    cards = <NoImage />;
  }

  return <ul className="sports-list">{cards}</ul>;
};

const NewsTodayCard = ({ url, src, title }) => {
  return (
    <div className="card-wrap">
      <a href={url}>
        <img src={src} alt={title} />
        <div className="title-container">
          <p>{title}</p>
        </div>
      </a>
    </div>
  );
};

const NewsTodayList = ({ results }) => {
  let mainCards;
  let cards;
  if (results.length) {
    mainCards = results.slice(0, 1).map((result, idx) => {
      return result.elements ? (
        <NewsTodayCard
          title={result.webTitle}
          src={result.elements[0].assets[0].file}
          url={result.webUrl}
          key={result.id}
        />
      ) : (
        <NewsTodayCard
          title={result.webTitle}
          src={PeaksImg}
          url={result.webUrl}
          key={idx}
        />
      );
    });

    cards = results.slice(1, 5).map((result, idx) => {
      return result.elements ? (
        <NewsTodayCard
          title={result.webTitle}
          src={result.elements[0].assets[0].file}
          url={result.webUrl}
          key={result.id}
        />
      ) : (
        <NewsTodayCard
          title={result.webTitle}
          src={PeaksImg}
          url={result.webUrl}
          key={idx}
        />
      );
    });
  } else {
    cards = <NoImage />;
  }

  return (
    <>
      <div className="news-list">{mainCards}</div>
      <div className="news-list">{cards}</div>
    </>
  );
};

const NewsToday = ({ newsResult, sportResult, loading }) => {
  return (
    <section className="container">
      <section className="top-story-section">
        <div className="heading-bookmark">
          <h1>Top stories</h1>
          <div className="right-section">
            <div className="half">
              <button className="bookmark-btn">
                <span className="material-icons">bookmark</span>View Bookmark
              </button>
            </div>
            <div className="half drowdown-list">
              <label htmlFor="news-select" className="is-hidden">
                Newest First
              </label>
              <select name="news" id="news-select">
                <option value="">--Newest First--</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        <div className="news-cards">
          {loading ? <p>Loading...</p> : <NewsTodayList results={newsResult} />}
        </div>
      </section>
      <section className="sports">
        <h1>Sports</h1>
        {loading ? <p>Loading...</p> : <SportsList results={sportResult} />}
      </section>
    </section>
  );
};

export default NewsToday;

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

const NewsToday = ({ theGuardianResults, loading }) => {
  return (
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
        <div className="news-cards"></div>
      </section>
      <section className="sports">
        <h1>Sports</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SportsList results={theGuardianResults} />
        )}
      </section>
    </section>
  );
};

export default NewsToday;
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

const Sports = ({ theGuardianResults, loading }) => {
  return (
    <section className="container">
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

export default Sports;
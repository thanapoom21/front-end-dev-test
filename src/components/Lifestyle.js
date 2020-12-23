import Card from "./Card";
import NoImage from "./NoImage";

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

const Lifestyle = ({ theGuardianResults, loading }) => {
  return (
    <section className="container">
      <section className="lifestyle">
        <h1>Lifestyle</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <SportsList results={theGuardianResults} />
        )}
      </section>
    </section>
  );
};

export default Lifestyle;
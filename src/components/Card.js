import React from 'react';

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

export default Card;
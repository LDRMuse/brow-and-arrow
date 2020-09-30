import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <section className="hero has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <Link to="/">Brow and Arrow</Link>
          </h1>
          <h2 className="subtitle">Client Management Application</h2>
        </div>
      </div>
    </section>
  );
};

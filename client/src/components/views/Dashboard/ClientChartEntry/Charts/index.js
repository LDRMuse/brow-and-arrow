import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ModalBox as Modal } from "./ModalBox";

export const Charts = ({ charts }) => {
  return (
    <Fragment>
      <div className="container box">
        <h1 className="title is-4 has-text-centered mt-4 mb-5">
          Previous Charts
        </h1>
        <table className="table container has-text-centered">
          <thead>
            <tr>
              <th>Date of Service</th>
              <th>Type of Service</th>
              <th>Pigment Brand</th>
              <th>Color Formula</th>
              <th>Needle/Blade Brand</th>
              <th>Needle/Blade Size</th>
              <th>Numbing Agent</th>
              <th>Price of Service</th>
              <th>Additional Notes</th>
              <th>Photos</th>
            </tr>
          </thead>
          <tbody>
            {charts?.map(
              (
                {
                  chartValues: {
                    dateOfService,
                    typeOfService,
                    pigmentBrand,
                    colorFormula,
                    needleBladeBrand,
                    needleBladeSize,
                    numbingAgent,
                    priceOfService,
                    additionalNotes,
                    fotoURL,
                  },
                },
                i
              ) => (
                <tr key={i}>
                  <td>{dateOfService}</td>
                  <td>{typeOfService}</td>
                  <td>{pigmentBrand}</td>
                  <td>{colorFormula}</td>
                  <td>{needleBladeBrand}</td>
                  <td>{needleBladeSize}</td>
                  <td>{numbingAgent}</td>
                  <td>{priceOfService}</td>
                  <td>{additionalNotes}</td>
                  <td>
                    <Modal image={fotoURL} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Charts.propTypes = {
  charts: PropTypes.array,
};

// Charts.defaultProps = { charts: [] }

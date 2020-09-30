import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export const ClientTable = ({ clients }) => {
  return (
    <Fragment>
      <div className="container box">
        <h1 className="title is-4 has-text-centered">Current Clients</h1>
        <table className="table container has-text-centered">
          <tbody>
            {clients?.map(
              ({ _id, firstName, lastName, email, phone, charts }) => (
                <tr key={_id}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <Link
                      className="button is-success is-small my-2"
                      to={{
                        pathname: `/client/${_id}`,
                        state: {
                          currentClient: {
                            firstName,
                            lastName,
                            email,
                            phone,
                            charts,
                          },
                        },
                      }}
                    >
                      View/Add Chart Notes
                    </Link>
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

ClientTable.propTypes = {
  clients: PropTypes.array,
};

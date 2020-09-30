import PropTypes from "prop-types";
import React from "react";

export const Options = ({ status, handler }) => (
  <div className="has-text-centered">
    <button
      className="button mt-4 ml-2 px-3 is-primary "
      onClick={handler}
      // 'toggle opposite' via 'handler'
      data-status={status === "Login" ? "Create Account" : "Login"}
    >
      {status === "Login" ? "Create an Account?" : "Need to Login?"}
    </button>

    {/* if status is "Login", show button for status "Forgot Password" */}
    {status === "Login" ? (
      <button
        className="button mt-4 ml-2 is-primary"
        onClick={handler}
        // Spell this out explicitly so we can just use it as is
        data-status="Reset Password"
      >
        Forgot Password?
      </button>
    ) : null}
  </div>
);

Options.propTypes = {
  handler: PropTypes.func,
  status: PropTypes.string,
};

Options.defaultProps = { status: "Login" };

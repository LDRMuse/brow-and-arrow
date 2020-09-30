import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useLocation, useHistory } from "react-router-dom";

import { Options } from "./Options";

import routes from "api/routes";
import auth from "auth";

const adminAPI = routes("admin");

export const Login = () => {
  const history = useHistory();

  // This will only show something from: 'state: { status: "Create Account" }'
  const { state } = useLocation();

  // If we came from '/login,' there is no 'state'...
  const [status, setStatus] = useState(state?.status || "Loading...");

  //takes the targeted click and sets the status
  const handleStatus = ({
    target: {
      dataset: { status },
    },
  }) => {
    setStatus(status);
  };

  useEffect(() => {
    if (status === "Loading...") {
      (async () => {
        // Destructure 'currentUser' from 'auth' (https://firebase.google.com/docs/auth/web/manage-users)

        const { currentUser } = auth;
        if (currentUser) {
          try {
            const { email, uid } = currentUser;

            // 'uid' is from 'auth(firebase)' - we need the { name } from our mongo...
            const { name } = await adminAPI.show(uid); // this is a function pulling from mongo
            history.push(`/clients/${uid}`, { email, name });
          } catch (error) {
            console.error(error);
          }
        }
        // We didn't find any exiting user - so show login form (go back to login form)
        setStatus("Login");
      })();
    } else {
      // If we are in 'create account' status, make sure to logout any current user first,
      auth.signOut();
    }
  });

  return status === "Loading..." ? (
    <section className="mt-5 ml-5 mr-5 box has-text-centered">
      <span className="title">{status}</span>
    </section>
  ) : (
    <section className="box center mt-4 section">
      <h2 className="has-text-centered title">{status}</h2>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address!")
            .required("Email is required!"),
          name:
            status === "Create Account" &&
            Yup.string().required("Name is required!"),
          password:
            status !== "Reset Password" &&
            Yup.string().min(6).required("Password is required!"),
        })}
        // These status's are for the the buttons
        onSubmit={({ name, email, password }, { setSubmitting }) => {
          switch (status) {
            case "Reset Password":
              auth
                .sendPasswordResetEmail(email)
                .then(() => {})
                .catch((err) => {
                  console.error(err);
                });
              break;
            case "Login":
              auth
                .signInWithEmailAndPassword(email, password)
                // goes to the object and pulls 'uid' from the user to show()
                .then(({ user: { uid } }) => adminAPI.show(uid))
                .then(({ uid, name }) => {
                  setSubmitting(false);
                  // sends admin(user) to the Dashboard
                  history.push(`/clients/${uid}`, { name, email });
                })
                .catch((err) => {
                  setSubmitting(false);
                  console.error(err);
                });
              break;
            default:
              auth
                .createUserWithEmailAndPassword(email, password)
                // destructure the object 'uid' from the user; then create key value paris for 'uid' and 'name'
                .then(({ user: { uid } }) => adminAPI.create({ uid, name }))
                .then(({ message, status, uid }) => {
                  if (status > 400) {
                    throw new Error(
                      message || "Unable to create user at this time"
                    );
                  }
                  // Formik state to prevent double submissions - turn it off now (disables button)
                  setSubmitting(false);
                  history.push(`/clients/${uid}`, { email, name });
                })
                .catch((err) => {
                  setSubmitting(false);
                  setStatus(`
                  ${err.message}
                  Unable to create a user ATM! 😞🙇🏽‍♂️
                  Please check your internet connection and/or try again later! 🤞🏽
                `);
                  auth.currentUser.delete().then(() => {
                    console.info(
                      "Removing any newly created auth user to preserve data integrity!"
                    );
                  });
                });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* if you are not logging in and not resetting password status is "Create Account" */}
            {status !== "Login" && status !== "Reset Password" ? (
              <div className="field has-text-centered">
                <label htmlFor="name" className="ml-2">
                  Name
                </label>
                <div className="control mx-2 my-2">
                  <Field name="name" type="text" className="mt-2 w-100" />
                  <p className="help is-danger">
                    <ErrorMessage name="name" />
                  </p>
                </div>
              </div>
            ) : null}
            {/* If status is not "Create Account", status is "Loading...",then status is  "Login"*/}
            <div className="field has-text-centered">
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <div className="control">
                <Field name="email" type="email" className="mt-2 w-100" />
                <ErrorMessage name="email" />
              </div>
            </div>

            {status !== "Reset Password" ? (
              <div className="field has-text-centered">
                <label htmlFor="password" className="ml-2">
                  Password
                </label>
                <div className="control mx-2 my-1">
                  <Field
                    name="password"
                    type="password"
                    className="mt-2 w-100"
                  />
                  <ErrorMessage name="password" />
                </div>
              </div>
            ) : null}
            <div className="has-text-centered">
              <button
                type="submit"
                className="button is-success ml-2 mt-2"
                disabled={isSubmitting}
              >
                {status}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Options status={status} handler={handleStatus} />
    </section>
  );
};

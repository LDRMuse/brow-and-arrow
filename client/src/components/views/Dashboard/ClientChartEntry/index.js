import React, { Fragment, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// https://github.com/Hacker0x01/react-datepicker

import * as Yup from "yup";

import { Formik, Field, Form, ErrorMessage } from "formik";

import routes from "api/routes";

import { Charts } from "./Charts";

const clientChartAPI = routes("clients");

export const ClientChartEntry = () => {
  const history = useHistory();

  const { state } = useLocation();

  const [fotoURL, setFotoUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handlePhoto = async () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dutahaeyc",
          uploadPreset: "brow-and-arrow",
        },
        (error, result) => {
          if (result.event === "success") {
            setFotoUrl(result.info.secure_url);
          } else if (error) {
            console.error(error);
          }
        }
      )
      .open();
  };

  return (
    <Fragment>
      <section className="px-4 py-4 mt-4">
        <div className="container">
          <h2 className="title is-5">
            Chart Entry for{" "}
            {state.state?.firstName || state.currentClient?.firstName}{" "}
            {state.state?.lastName || state.currentClient?.lastName}
          </h2>
        </div>
      </section>
      <Formik
        initialValues={{
          dateOfService: startDate,
          typeOfService: "",
          pigmentBrand: "",
          colorFormula: "",
          needleBladeBrand: "",
          needleBladeSize: "",
          numbingAgent: "",
          priceOfService: "",
          additionalNotes: "",
        }}
        validationSchema={Yup.object({
          dateOfService: Yup.string().required("required"),
          typeOfService: Yup.string().required("required"),
          pigmentBrand: Yup.string().required("required"),
          colorFormula: Yup.string().required("required"),
          needleBladeBrand: Yup.string().required("required"),
          needleBladeSize: Yup.string().required("required"),
          numbingAgent: Yup.string().required("required"),
          priceOfService: Yup.string().required("required"),
          additionalNotes: Yup.string().required("required"),
        })}
        // chartValues is declared below because the form is submitting these values onSubmit
        onSubmit={async (chartValues, { setSubmitting }) => {
          try {
            const chartValuesWithFoto = { ...chartValues, fotoURL };
            const { status, message } = await clientChartAPI.update(
              { chartValues: chartValuesWithFoto },
              state?.currentClient.email
            );
            if (status > 400) {
              throw new Error(message || "Unable to add image to chart");
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form className="container box">
          <h1 className="title is-4 has-text-centered mt-4 mb-5">
            New Chart Entry
          </h1>

          <div className="columns center">
            <label className="is-sr-only" htmlFor="dateOfService">
              Date of Service
            </label>
            <div className="column">
              <DatePicker
                name="dateOfService"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <p className="help is-danger">
                <ErrorMessage name="dateOfService" />
              </p>
              <label className="is-sr-only" htmlFor="typeOfService">
                Type of Service
              </label>
              <Field
                className="mt-3"
                name="typeOfService"
                type="text"
                placeholder="Type of Service"
              />
              <p className="help is-danger">
                <ErrorMessage name="typeOfService" />
              </p>
              <label className="is-sr-only" htmlFor="pigmentBrand">
                Pigment Brand
              </label>
              <Field
                className="mt-3"
                name="pigmentBrand"
                type="text"
                placeholder="Pigment Brand"
              />
              <p className="help is-danger">
                <ErrorMessage name="pigmentBrand" />
              </p>
              <label className="is-sr-only" htmlFor="colorFormula">
                Color Formula
              </label>
              <Field
                className="mt-3"
                name="colorFormula"
                type="text"
                placeholder="Color Formula"
              />
              <p className="help is-danger">
                <ErrorMessage name="colorFormula" />
              </p>{" "}
              <label className="is-sr-only" htmlFor="needleBladeBrand">
                Needle/Blade Brand
              </label>
            </div>
            <div className="column">
              <Field
                className="ml-5"
                name="needleBladeBrand"
                type="text"
                placeholder="Needle/Blade Brand"
              />
              <p className="help is-danger">
                <ErrorMessage name="needleBladeBrand" />
              </p>
              <label className="is-sr-only" htmlFor="needleBladeSize">
                Needle/Blade Size
              </label>
              <Field
                className="mt-3 ml-5"
                name="needleBladeSize"
                type="text"
                placeholder="Needle/Blade Size"
              />
              <p className="help is-danger">
                <ErrorMessage name="needleBladeSize" />
              </p>
              <label className="is-sr-only" htmlFor="numbingAgent">
                Numbing Agent
              </label>
              <Field
                className="mt-3 ml-5"
                name="numbingAgent"
                type="text"
                placeholder="Numbing Agent"
              />
              <p className="help is-danger">
                <ErrorMessage name="numbingAgent" />
              </p>
              <label className="is-sr-only" htmlFor="priceOfService">
                Price of Service
              </label>
              <Field
                className="mt-3 ml-5"
                name="priceOfService"
                type="text"
                placeholder="Price of Service"
              />
              <p className="help is-danger">
                <ErrorMessage name="priceOfService" />
              </p>
            </div>
          </div>
          <div className="columns center">
            <div className="column is-full">
              <label htmlFor="additionalNotes"> </label>
              <div className="control">
                <Field
                  component="textarea"
                  className="textarea has-background-danger-light"
                  name="additionalNotes"
                  type="text"
                  placeholder="Additional Notes"
                />
                <p className="help is-danger">
                  <ErrorMessage name="additionalNotes" />
                </p>
              </div>
            </div>
          </div>

          <div className="has-text-centered">
            <button className="button" type="button" onClick={handlePhoto}>
              Add Photo
            </button>
          </div>

          <div className="has-text-centered mt-5">
            <button className="button is-primary" type="submit">
              Add Chart Entry
            </button>
            <button
              className="button is-success ml-4"
              type="button"
              onClick={() => history.goBack()}
            >
              Go Back
            </button>
          </div>
        </Form>
      </Formik>
      <Charts charts={state.currentClient.charts} />
    </Fragment>
  );
};

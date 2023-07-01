import Image from "next/image";
import React, { useEffect, useState } from "react";

import arrow from "../../public/images/icon-arrow.svg";
export const Form = ({ setData }) => {
  const [dataForm, setDataForm] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const isValid = /^[0-9]*$/.test(value);
    if (isValid) {
      setDataForm((prev) => {
        return {
          ...prev,
          [e.target.name]: value,
        };
      });
      setErrors({
        day: "",
        month: "",
        year: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit')
    const thirtyDaysMonths = ["04", "06", "09", "11", "4", "6", "9"];
    const thirtyOneDaysMonths = [
      "01",
      "03",
      "05",
      "07",
      "08",
      "10",
      "12",
      "1",
      "3",
      "5",
      "7",
      "8",
    ];
    const february = ["02", "2"];

    const isValid = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;

    const today = new Date();
    const date = new Date(dataForm.year, dataForm.month - 1, dataForm.day);

    if (
      isValid.test(`${dataForm.month}/${dataForm.day}/${dataForm.year}`) &&
      today > date
    ) {
      setData(dataForm);
    } else {
      setData(() => {return {
        day: "",
        month: "",
        year: "",
      }});
      if (
        dataForm.day === "" ||
        dataForm.month === "" ||
        dataForm.year === ""
      ) {
        if (dataForm.day === "") {
          setErrors((prev) => {
            return {
              ...prev,
              day: "This field is required",
            };
          });
        }
        if (dataForm.month === "") {
          setErrors((prev) => {
            return {
              ...prev,
              month: "This field is required",
            };
          });
        }
        if (dataForm.year === "") {
          setErrors((prev) => {
            return {
              ...prev,
              year: "This field is required",
            };
          });
        }
      } else if (
        !isValid.test(`${dataForm.month}/${dataForm.day}/${dataForm.year}`)
      ) {
        if (dataForm.month > 12) {
          setErrors((prev) => {
            return {
              ...prev,
              month: "Must be a valid month",
            };
          });
        }
        if (
          (thirtyDaysMonths.includes(dataForm.month) &&
            !/^(0?[1-9]|1\d|2\d|30)$/.test(dataForm.day)) ||
          (thirtyOneDaysMonths.includes(dataForm.month) &&
            !/^(0?[1-9]|1\d|2\d|3[01])$/.test(dataForm.day)) ||
          (february.includes(dataForm.month) &&
            !/^(0?[1-9]|1\d|2[0-8])$/.test(day)) ||
          dataForm.day > "31"
        ) {
          setErrors((prev) => {
            return {
              ...prev,
              day: "Must be a valid day",
            };
          });
        }
        if (dataForm.year > "2023") {
          setErrors((prev) => {
            return {
              ...prev,
              year: "Must be in the past",
            };
          });
        }
      } else if (today < date) {
        setErrors((prev) => {
          return {
            ...prev,
            year: "Must be in the past",
          };
        });
      }
    }
  };
  
  useEffect(() => { 
  }, [setData])
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div
          className={
            errors.day === ""
              ? "input-container"
              : "input-error input-container"
          }
        >
          <p>DAY</p>
          <input
            type="text"
            placeholder="DD"
            value={dataForm.day}
            name="day"
            onChange={handleChange}
          />
          {errors.day !== "" && <span>{errors.day}</span>}
        </div>
        <div
          className={
            errors.month === ""
              ? "input-container input-middle-container"
              : "input-error input-container input-middle-container"
          }
        >
          <p>MONTH</p>
          <input
            type="text"
            placeholder="MM"
            value={dataForm.month}
            name="month"
            onChange={handleChange}
          />
          {errors.month !== "" && <span>{errors.month}</span>}
        </div>
        <div
          className={
            errors.year === ""
              ? "input-container"
              : "input-error input-container"
          }
        >
          <p>YEAR</p>
          <input
            type="text"
            placeholder="YYYY"
            name="year"
            value={dataForm.year}
            onChange={handleChange}
          />
          {errors.year !== "" && <span>{errors.year}</span>}
        </div>
      </div>
      <div className="btn-submit-container">
        <hr />
        <button type="submit">
          <Image src={arrow} />
        </button>
      </div>
    </form>
  );
};

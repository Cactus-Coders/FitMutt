import React, { useState } from "react";
import styled from "styled-components";
import { ImInfo } from "react-icons/im";
import { health_calc } from "../healthCalc"
function Form() {
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isInfo, setIsInfo] = useState(false);
  const [heightUnits, setHeightUnits] = useState("in");
  const [weightUnits, setWeightUnits] = useState("lb");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(breed, weight, height, heightUnits, weightUnits);
    await health_calc(height, heightUnits, weight, weightUnits, breed)
  };

  const toggleWeight = (value) => {
    setWeightUnits(value);
  };

  const toggleHeight = (value) => {
    setHeightUnits(value);
  };
  return (
    <FormDiv onSubmit={handleSubmit}>
      <label>What is your dog's breed?</label>
      <input onChange={(e) => setBreed(e.target.value)}></input>
      <div className="container">
        <label>What is your dog's weight?</label>
        <button
          className={weightUnits === "lb" ? "active" : ""}
          onClick={() => toggleWeight("lb")}
        >
          lb
        </button>
        <button
          className={weightUnits === "kg" ? "active" : ""}
          onClick={() => toggleWeight("kg")}
        >
          kg
        </button>
      </div>
      <input
        className="shorten-input"
        onChange={(e) => setWeight(e.target.value)}
      ></input>
      <div className="container">
        <label>What is your dog's height?</label>
        <StyledInfoButton onClick={() => setIsInfo(!isInfo)} />
        <button
          className={heightUnits === "in" ? "active" : ""}
          onClick={() => toggleHeight("in")}
        >
          in
        </button>
        <button
          className={heightUnits === "cm" ? "active" : ""}
          onClick={() => toggleHeight("cm")}
        >
          cm
        </button>
      </div>
      {isInfo && (
        <div>
          <p>
            Measure from the ground to the highest point of the shoulderblade on
            the back, and not the neck or head
          </p>
        </div>
      )}
      <input
        className="shorten-input"
        onChange={(e) => setHeight(e.target.value)}
      ></input>
      <button type="submit" className="submit">
        Submit
      </button>
    </FormDiv>
  );
}

const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0px 0px 10px lightgray;
  height: 15rem;
  width: 20rem;
  padding: 1.5rem;
  font-family: "Inter", sans-serif;
  label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .container {
    display: flex;
    align-items: center;
    label {
      margin-right: 0.3rem;
    }
    button {
      font-family: "Inter", sans-serif;
      margin-top: 0rem;
      margin-right: 0.3rem;
      color: black;
      border-radius: 0.3rem;
      border: 1px solid grey;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;

      &:hover {
        background-color: #aed2f8;
        transform: scale(1.05);
      }
    }
  }
  .submit {
    width: 60%;
    align-self: center;
    padding: 10px 15px;
    background: linear-gradient(
      90deg,
      rgba(58, 141, 255, 1) 0%,
      rgba(134, 185, 255, 1) 100%
    );
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  input {
    width: 100%;
  }
  button {
    margin-top: 1rem;
  }
  p {
    text-align: center;
    font-size: 1rem;
  }
  .active {
    background: linear-gradient(
      90deg,
      rgba(58, 141, 255, 1) 0%,
      rgba(134, 185, 255, 1) 100%
    );
  }
  .shorten-input {
    width: 25%;
  }
`;

const StyledInfoButton = styled(ImInfo)`
  margin-right: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
export default Form;

import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Application's Features</h1>
      <div className="cards_container">
        <div className="cards_wrapper">
          <ul className="cards_items">
            <CardItem
              src="images/img-10.jpg"
              text="Build a DataSet from scratch"
              label="DataSet Implementation"
              path="/services"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Bounding Box"
              label="Luxury"
              path="/services"
            />
          </ul>
          <ul className="cards_items">
            <CardItem
              src="images/img-3.jpg"
              text="Image Classification"
              label="Mystery"
              path="/services"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Yolo neural network"
              label="Adventure"
              path="/products"
            />
            <CardItem
              src="images/img-8.jpg"
              text="xxxxxxxxxxx xxxxx xxxx xxxxx"
              label="Adrenaline"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

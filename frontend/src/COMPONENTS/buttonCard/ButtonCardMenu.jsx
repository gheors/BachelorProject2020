import React from "react";
import { Link } from "react-router-dom";

function ButtonCardMenu(props) {
  return (
    <>
      <div className="cards_item">
        <Link className="cards_item_link" to={props.path}>
          <figure className="cards_item_pic-wrap" data-category={props.label}>
            <img className="cards_item_img" alt="..." src={props.src} />
          </figure>
          <div className={`labelCard ${props.colorLabel}`}>{props.label}</div>
          <div className="cards_item_info">{props.text}</div>
        </Link>
      </div>
    </>
  );
}

export default ButtonCardMenu;

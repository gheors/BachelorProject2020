import React from "react";
import "./Dataset.css";
import {Button} from '../../components/button/Button'
import {Link} from "react-router-dom";

export default function Dataset() {
    return (
    <div className="dataset">
        <Link to="/dataset/allVideos">
            <Button buttonStyle="button-test" buttonSize='button-large'>
                start from video
            </Button>
        </Link>
        <Link to="/dataset/allFrames">
            <Button buttonStyle="button-test" buttonSize='button-large'>
                start from frames
            </Button>
        </Link>

    </div>
  );
}

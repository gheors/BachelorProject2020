import React, {useEffect} from "react";
import "../../App.css";
import {Button} from "../button/Button";
import "./Welcome.css";
import Popup from "../popUpTrailer/PopUpTrailer";
import {Link} from "react-router-dom";

// import * as Fa from "react-icons/fa";


function Welcome() {

    useEffect(() => {

    }, [])

    return (
        <div className="mainContainer">
            <div className={"TitleMainContainer"}>
                <h1>ARTIFICIAL ADVENTURE</h1>

                <p>Designed for you.</p>

                <div className="hero-buttons">
                    <Link to={"/dataset"}>
                        <Button
                            className="borderRadius"
                            buttonStyle="button-outline"
                            buttonSize="button-large"
                        >
                            GET STARTED
                        </Button>
                    </Link>
                    <Popup children="WATCH TRAILER" buttonStyle="button-secondary" buttonSize="button-large"/>
                </div>
            </div>

        </div>
    );
}

export default Welcome;

import React from "react";
import "./AddNewResources.css";
import ButtonCardMenu from "../../COMPONENTS/buttonCard/ButtonCardMenu";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import {useLocation} from "react-router";

export default function AddNewResources() {
    const {pathname} = useLocation()
    console.log(pathname)
    const titles = [
        <div className={"titleCentralNav"}>Go back </div>,
        <div className={"titleCentralNav"}>add image/images</div>,
        <div className={"titleCentralNav"}>Add video/videos</div>,
    ]

    return (
        <>
            <ParticlesBackground/>
            <div className="dataset">
                <div className={'upperDivDataSet'}>
                    <ButtonCardMenu
                        src="images/arrow2t.png"
                        text={<h5>{titles[0]}</h5>}
                        colorLabel={''}
                        label=""
                        path="/dataset"
                    />
                    <ButtonCardMenu
                        src="images/videos.png"
                        text={<h5>{titles[2]}</h5>}
                        colorLabel={'colorLabelGreen'}
                        label="current videos to fragment:"
                        path="/videosInterface"
                    />
                    <ButtonCardMenu
                        src="images/image.png"
                        text={<h5>{titles[1]}</h5>}
                        colorLabel={'colorLabelGreen'}
                        label="Collection of images"
                        path="/foldersInterface"
                    />
                </div>

            </div>
        </>
    );
}

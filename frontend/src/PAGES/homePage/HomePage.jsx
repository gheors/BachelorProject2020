import React from "react";
import "./HomePage.css";
import ButtonCardMenu from "../../COMPONENTS/buttonCard/ButtonCardMenu";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";

export default function HomePage() {
    const titles = [
        <div className={"titleCentralNav"}>Add new resources</div>,
        <div className={"titleCentralNav"}>DataSet building</div>,
        <div className={"titleCentralNav"}>Train <div>A i T i A</div></div>,
        <div className={"titleCentralNav"}>Start <div>A i T i A</div></div>,
    ]

    return (
        <>
            <ParticlesBackground/>
            <div className="dataset">
                <div className={'upperDivDataSet'}>
                    <ButtonCardMenu
                        src="images/assets.png"
                        text={titles[0]}
                        colorLabel={'colorLabelCrimson'}
                        label="Assets: Images, Videos.."
                        path="/addNewResources"
                    />
                    <ButtonCardMenu
                        src="images/dataset.png"
                        text={titles[1]}
                        colorLabel={'colorLabelCrimson'}
                        label="Create or Update Collections"
                        path="/cropMainPage"
                    />
                </div>

                <div className={'lowerDivDataSet'}>
                    <ButtonCardMenu
                        src="images/train.png"
                        text={titles[2]}
                        colorLabel={'colorLabelCrimson'}
                        label="TRAINING MODE"
                        path="/trainAi"
                    />
                    <ButtonCardMenu
                        src="images/product.png"
                        text={titles[3]}
                        colorLabel={'colorLabelCrimson'}
                        label="TESTING MODE"
                        path="/useAi"
                    />
                </div>


            </div>
        </>
    );
}

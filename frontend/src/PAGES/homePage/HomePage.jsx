import React, {useState} from "react";
import "./HomePage.css";
import ButtonCardMenu from "../../COMPONENTS/buttonCard/ButtonCardMenu";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import TutorialComponent from "../../COMPONENTS/tutorialComponent/TutorialComponent";
import {tutorialSteps} from './tutorialStepsMainPage'

export default function HomePage() {
    const titles = [
        <div className={"titleCentralNav"}>Add new resources</div>,
        <div className={"titleCentralNav"}>DataSet building</div>,
        <div className={"titleCentralNav"}>Train <div>A i T i A</div></div>,
        <div className={"titleCentralNav"}>Start <div>A i T i A</div></div>,
    ]

    const [isTourOpen, setIsTourOpen] = useState(false);


    return (
        <>
            <ParticlesBackground/>
            <TutorialComponent  setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen} tutorialSteps={tutorialSteps}/>
            <div className={'buttonTutorialDiv'} onClick={() => setIsTourOpen(!isTourOpen)}>Tutorial</div>
            <div className="dataset">
                <div className={'upperDivDataSet'}>
                    <div className={'step_1_Main'}>
                        <ButtonCardMenu
                            src="images/assets.png"
                            text={titles[0]}
                            colorLabel={'colorLabelCrimson'}
                            label="Assets: Images, Videos.."
                            path="/addNewResources"
                        />
                    </div>
                    <div className={'step_2_Main'}>
                        <ButtonCardMenu
                            src="images/dataset.png"
                            text={titles[1]}
                            colorLabel={'colorLabelCrimson'}
                            label="Create or Update Collections"
                            path="/cropMainPage"
                        />
                    </div>
                </div>

                <div className={'lowerDivDataSet'}>
                    <div className={'step_3_Main'}>
                        <ButtonCardMenu
                            src="images/train.png"
                            text={titles[2]}
                            colorLabel={'colorLabelCrimson'}
                            label="TRAINING MODE"
                            path="/trainAi"
                        />
                    </div>

                    <div className={'step_4_Main'}>
                        <ButtonCardMenu
                            src="images/product.png"
                            text={titles[3]}
                            colorLabel={'colorLabelCrimson'}
                            label="TESTING MODE"
                            path="/useAi"
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

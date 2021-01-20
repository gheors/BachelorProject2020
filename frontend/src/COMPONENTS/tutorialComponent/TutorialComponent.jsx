import React, {useEffect, useState} from "react";
import Tour from 'reactour'
import './TutorialComponent.css'


function TutorialComponent(props) {

    let params = {}
    if (!props.isTourOpen) {
        params = {
            goToStep: 0
        }
    }

    useEffect(() => {
        if (!props.isTourOpen) {
            params = {
                goToStep: 0
            }
        }
    }, [props.isTourOpen])

    return (
        <>
            <Tour
                className={'tutorialTourDiv'}
                rounded={10}
                lastStepNextButton={'the end'}
                steps={props.tutorialSteps}
                isOpen={props.isTourOpen}
                onRequestClose={() => props.setIsTourOpen(false)}
            />
        </>
    )
}

export default TutorialComponent;
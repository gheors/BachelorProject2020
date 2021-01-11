import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AccordionComponent.css'


const AccordionComponent = withStyles({
    root: {
        width: 'fit-content',
        height:'30px',
        backgroundColor: '#1c1c1c',
        boxShadow: 'inset 0 0 5px rgb(0, 0, 0)',
        borderRadius: '5px',
        overflow: "hidden",
        margin: "auto!important",
        '&:not(:last-child)': {
            // borderBottom: 0,
        },
        '&:before': {

        },
        '&$expanded': {
            // height:'fit-content',
        },
    },
    expanded: {
        height:'fit-content'
    },

})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        height: '30px',
        minHeight:'30px',
        '&$expanded': {
            height: '30px',
            minHeight:'30px',
            marginTop:'10px',
            marginLeft:'5px',

        }
    },
    expanded: {
        height: '30px',
        minHeight:'30px',
    },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        height:'fit-content',
        padding: '0px 16px 10px'

    }
}))(MuiAccordionDetails);

export default function MyAccordion(props) {
    const [expanded, setExpanded] = React.useState('panel');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : true);
    };

    return (
        <AccordionComponent className={'accordionComponent'}
                            square
                            expanded={expanded === 'panel1'}
                            onChange={handleChange('panel1')}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1d-content"
                              id="panel1d-header"
            >
                    {props.Summary}
            </AccordionSummary>
            <AccordionDetails>
                    {props.body}
            </AccordionDetails>
        </AccordionComponent>
    );
}

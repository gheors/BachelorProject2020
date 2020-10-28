import React, {Component} from 'react';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactPlayer from "react-player";
import "./PopUpTrailer.css";

class PopUpTrailer extends Component{
    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div >
                <button className={`button ${this.props.buttonStyle} ${this.props.buttonSize}`}
                        onClick={this.onOpenModal}>
                    {this.props.children} <i className="far fa-play-circle" />
                </button>
                <Modal className='popup_container' open={open} onClose={this.onCloseModal}>
                    <h3>Video Trailer AiTiA</h3>
                    <div className={'video_wrapper'}>
                        <ReactPlayer controls={true}   width="100%" url="https://www.youtube.com/watch?v=oFDORuGOyTE"/>

                    </div>
                </Modal>
            </div>
        );
    }
}


// const PopupComponent = ({children, buttonStyle, buttonSize}) => (
//     <Popup trigger={<button className={`button ${buttonStyle} ${buttonSize}` }> {children} </button>} position="right center">
//     </Popup>
// );

export default PopUpTrailer
import React, {Component} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import './CropperSample.css';
import {Colors} from "../../Colors";

class CroppedSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 1,
            }
        }
    }


    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop).then();
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const {blob, fileUrl, coordinates} = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            console.log(coordinates);
            this.props.setCroppedUrl(fileUrl)
            this.props.setCroppedImage(blob)
            this.props.setCoordinates(coordinates)

        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const width = crop.width * scaleX / image.naturalWidth
        const height = crop.height * scaleY / image.naturalHeight

        const cx = (crop.x * scaleX + width / 2) / image.naturalWidth
        const cy = (crop.y * scaleY + height / 2) / image.naturalHeight
        console.log("image : " + image)

        console.log("image natual width: " + image.naturalWidth, "image natual height: " + image.naturalHeight)
        console.log("image  width: " + image.width, "image  height: " + image.height)
        console.log("width: " + width, "height: " + height)
        console.log("crop width: " + crop.width, "crop height: " + crop.height)
        console.log("scale x: " + scaleX, "scale y: " + scaleY)
        console.log(crop.x, crop.y, crop.width, crop.height)

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );


        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                // window.URL.revokeObjectURL(this.fileUrl);
                const fileUrl = window.URL.createObjectURL(blob);
                const coordinates = [cx, cy, width, height]
                resolve({blob, fileUrl, coordinates});
            }, 'image/jpeg');
        });
    }

    componentDidMount() {
        if (this.props.src !== '') {
            this.setState({
                src: this.props.src
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.src !== this.props.src) {
            this.setState({
                src: this.props.src
            })
        }
        if (prevProps.squareCrop !== this.props.squareCrop) {
            if (!this.props.squareCrop) {
                this.setState({
                    crop: {unit: 'px'},
                    src: this.props.src

                })
            } else {
                this.setState({
                    crop: {
                        unit: '%',
                        width: 30,
                        aspect: 1,
                    },
                    src: this.props.src

                })
            }
        }
        if (this.props.showCards !== prevProps.showCards) {
            if (this.props.showCards) {
                this.setState({
                    crop: {unit: 'px'},
                })
            } else {
                this.setState({
                    crop: {
                        unit: '%',
                        width: 30,
                        aspect: 1,
                    },
                    src: this.props.src

                })
            }

        }
    }

    render() {
        const {crop, src} = this.state;

        return (
            <div className="boxCroppedSample" style={{position: "relative"}}>
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        disabled={this.props.showCards}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
                {this.props.showCards &&
                <span>
                     {this.props.croppedCards.map((card, i) => {
                         return <div key={card + i} style={{
                             position: 'absolute',
                             left: `${card.coordinates[0] * 100}%`,
                             top: `${card.coordinates[1] * 100}%`,
                             width: `${card.coordinates[2] * 100}%`,
                             height: `${card.coordinates[3] * 100}%`,
                             border: `3px solid ${Colors[i]}`,
                             borderRadius: '5px',
                             color: Colors[i],
                             textAlign: 'left'
                         }}>
                             <div className={'tagInsideDiv'}>{card.tags.map((tag, index) => {
                                 return <div key={tag + index}>{tag}</div>
                             })}
                             </div>
                         </div>
                     })}
                </span>
                }

            </div>
        );
    }
}

export default CroppedSample
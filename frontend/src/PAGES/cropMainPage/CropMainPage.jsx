import React, {useEffect, useState} from "react";
import "./CropMainPage.css";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import {Link} from "react-router-dom";
import Axios from "axios";
import CollectionsCropVisualization from "../../COMPONENTS/collectionsCropVisualization/CollectionsCropVisualization";
import LeftBarCropPage from "../../COMPONENTS/leftBarCropPage/LeftBarCropPage";
import CurrentImageToCrop from "../../COMPONENTS/currentImageToCrop/CurrentImageToCrop";
import CurrentCardCrop from "../../COMPONENTS/currentCardCrop/CurrentCardCrop";
import AddSelectCategoryComponent from "../../COMPONENTS/addSelectCategoryComponent/addSelectCategoryComponent";
import RightBarCardsComponent from "../../COMPONENTS/rightBarCardsComponent/RightBarCardsComponent";

export default function CropMainPage(props) {
    const [currentFolder, setCurrentFolder] = useState('')
    const [images, setImages] = useState([])
    const [currentImage, setCurrentImage] = useState(undefined)
    const [categories, setCategories] = useState([])

    const [croppedImage, setCroppedImage] = useState([])
    const [croppedUrl, setCroppedUrl] = useState(undefined)
    const [currentTags, setCurrentTags] = useState([])

    const [croppedCards, setCroppedCards] = useState([])
    const [coordinates, setCoordinates] = useState([])


    useEffect(() => {
        if (props !== undefined) {
            setCurrentFolder(props.currentFolder)
            setImages(props.imagesArray)
            if (currentImage === undefined) {
                setCurrentImage(props.imagesArray[0])
            }
        }
    }, [props]);


    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        if (currentImage !== undefined) {
            getCroppedCardsSingleImage(currentImage._id)
        }

    }, [currentImage]);


    const setCurrentFolderZero = (folder) => {
        Axios.get(`http://localhost:3000/api/images/folder/${folder._id}`)
            .then((res) => {
                props.setCurrentFolder(folder.name)
                props.setImagesArray(res.data)
                setImages(res.data)
                setCurrentFolder(folder.name)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addCategory = (name, tag) => {
        Axios.post(`http://localhost:3000/api/categories/addCategory/${name}/${tag}`)
            .then(res => {
                setCategories([...categories, res.data].reverse())
            })
            .catch(err => console.log(err));
    }

    const addTagToCategory = (name, tag) => {
        Axios.post(`http://localhost:3000/api/categories/addTagToCategory/${name}/${tag}`)
            .then(res => {
                let newCategories = categories.map(category => {
                    if (category.name === name) {
                        return res.data
                    } else {
                        return category
                    }
                })
                setCategories(newCategories)
            })
            .catch(err => console.log(err));
    }

    const uploadCurrentCrop = () => {
        if (currentTags.length > 0) {
            const randomName = 'cropped_' + Math.random().toString(36).substring(7) + '.jpg';

            const data = new FormData();

            data.append('file', croppedImage)
            data.append('name', randomName)
            data.append('fullImageName', currentImage.name)
            data.append('fullImageId', currentImage._id)
            data.append('folderId', currentImage.folderId)
            data.append('tags', JSON.stringify(currentTags))
            data.append('coordinates', JSON.stringify(coordinates))
            Axios.post(`/api/croppedCards/addCroppedImage`, data)
                .then(res => {
                    setCroppedCards([res.data, ...croppedCards])
                    const newCurrent = {
                        name: currentImage.name,
                        folderId: currentImage.folderId,
                        width: currentImage.width,
                        height: currentImage.height,
                        used: true,
                        _id: currentImage._id
                    }
                    setCurrentImage(newCurrent)
                    const newImages = images.map(image => {
                        if (image.name === newCurrent.name) {
                            return newCurrent
                        } else {
                            return image
                        }
                    })
                    props.setImagesArray(newImages)
                    setImages(newImages)
                })
                .catch(err => console.log(err));
        }
        setCurrentTags([])
    }


    const getCategories = () => {
        Axios.get(`http://localhost:3000/api/categories/`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err));
    }

    const getCroppedCards = () => {
        Axios.get(`http://localhost:3000/api/croppedCards/`)
            .then(res => {
                setCroppedCards(res.data.reverse())
            })
            .catch(err => console.log(err));
    }

    const getCroppedCardsSingleImage = (fullImageId) => {
        if (fullImageId !== undefined) {
            Axios.get(`http://localhost:3000/api/croppedCards/${fullImageId}`)
                .then(res => {
                    setCroppedCards(res.data.reverse())
                })
                .catch(err => console.log(err));
        }

    }

    const deleteTagByCategoryName = (name, tag) => {
        const newtag = tag.split('#')[1]
        Axios.delete(`http://localhost:3000/api/categories/${name}/${newtag}`).then(res => {
            let newCategories = categories.map(category => {
                if (category.name === name) {
                    const newTags = []
                    category.tags.forEach(tg => {
                        if (tg !== tag) {
                            newTags.push(tg)
                        }
                    })
                    return {
                        name: name,
                        tags: newTags,
                    }
                } else {
                    return category
                }
            })
            setCategories(newCategories)
        })
            .catch(err => console.log(err));
    }

    const deleteTagFromCard = (name, tag) => {
        const newtag = tag.split('#')[1]
        Axios.delete(`http://localhost:3000/api/croppedCards/${name}/${newtag}`).then(res => {
            let newCroppedCards = croppedCards.map(croppedCard => {
                if (croppedCard.name === name) {
                    const newTags = croppedCard.tags.filter(tg => tg !== tag)
                    if (newTags.length === 0) {
                        removeCroppedCard(name, currentImage.folderId, currentImage.name)
                    }
                    return {
                        name: name,
                        tags: newTags,
                    }
                } else {
                    return croppedCard
                }
            })
            setCroppedCards(newCroppedCards)
        })
            .catch(err => console.log(err));
    }
    const removeCroppedCard = (name, folderId, fullImageName) => {
        Axios.delete(`http://localhost:3000/api/croppedCards/${name}/${folderId}/${fullImageName}`).then(res => {
            console.log(res.data)
            let newCroppedCards = []
            croppedCards.forEach(croppedCard => {
                if (croppedCard.name !== name) {
                    newCroppedCards.push(croppedCard)
                }
            })
            const newImages = props.imagesArray.map(image => {
                if (image.name === fullImageName) {
                    setCurrentImage({
                        _id: image._id,
                        folderId: image.folderId,
                        name: image.name,
                        width: image.width,
                        height: image.height,
                        used: newCroppedCards.length > 0
                    })
                    return {
                        _id: image._id,
                        folderId: image.folderId,
                        name: image.name,
                        width: image.width,
                        height: image.height,
                        used: newCroppedCards.length > 0
                    }
                } else return image
            })
            setCroppedCards(newCroppedCards)
            props.setImagesArray(newImages)

        })
            .catch(err => console.log(err));
    }


    return (
        <>
            <ParticlesBackground/>

            {images.length === 0 && <CollectionsCropVisualization currentFolder={props.currentFolder}
                                                                  imagesArray={props.imagesArray}
                                                                  setCurrentFolder={props.setCurrentFolder}
                                                                  setImagesArray={props.setImagesArray}
                                                                  setCurrentFolderZero={setCurrentFolderZero}
            />}


            {images.length > 0 && <div className={'mainCropContainer'}>
                <div className={'topCrop'}>

                    <LeftBarCropPage
                        currentFolder={props.currentFolder}
                        currentImage={currentImage}
                        imagesArray={props.imagesArray}
                        setCurrentFolder={setCurrentFolder}
                        setCurrentFolderProps={props.setCurrentFolder}
                        setImagesArrayProps={props.setImagesArray}
                        setCurrentImage={setCurrentImage}
                    />

                    <CurrentImageToCrop
                        currentFolder={props.currentFolder}
                        imagesArray={props.imagesArray}
                        currentImage={currentImage}
                        setCroppedUrl={setCroppedUrl}
                        setCroppedImage={setCroppedImage}
                        categories={categories}
                        croppedCards={croppedCards}
                        setCoordinates={setCoordinates}
                    />

                    <div className={'rightContainerCrop'}>
                        <div className={'rightTopCropContainer'}>
                            <CurrentCardCrop
                                croppedUrl={croppedUrl}
                                currentTags={currentTags}
                                setCurrentTags={setCurrentTags}
                                uploadCurrentCrop={uploadCurrentCrop}
                            />
                            <RightBarCardsComponent
                                deleteTagFromCard={deleteTagFromCard}
                                croppedCards={croppedCards}
                                removeCroppedCard={removeCroppedCard}
                                folderId={currentImage.folderId}
                                fullImageName={currentImage.name}

                            />
                        </div>
                        <AddSelectCategoryComponent
                            addCategory={addCategory}
                            addTagToCategory={addTagToCategory}
                            categories={categories}
                            setCurrentTags={setCurrentTags}
                            currentTags={currentTags}
                            deleteTagByCategoryName={deleteTagByCategoryName}
                        />
                    </div>

                </div>
                <div className={'bottomCrop'}>
                    {/*<Link to={"/foldersInterface"}>*/}
                    {/*    <div className={"backArrowDiv"}>*/}
                    {/*        <img*/}
                    {/*            className={"backArrow"}*/}
                    {/*            src={"images/arrow.png"}*/}
                    {/*            alt={"..."}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    {/*<Link to={"/videosInterface"}>*/}
                    {/*    <div className={"goToVideosDiv"}>*/}
                    {/*        <img*/}
                    {/*            className={"goToVideos"}*/}
                    {/*            src={"images/videos2.png"}*/}
                    {/*            alt={"..."}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    {/*<div className={"onVideoDiv"}>*/}
                    {/*    <img*/}
                    {/*        className={"onCollection"}*/}
                    {/*        src={"images/image2t.png"}*/}
                    {/*        alt={"..."}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>
            }
        </>
    );
}

import React, {useEffect, useState} from "react";
import "./addSelectCategoryComponent.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";

import {FaPlus} from "react-icons/fa";
import TagComponent from "../tagComponent/TagComponent";

export default function AddSelectCategoryComponent(props) {

    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");

    const saveNewCategory = () => {
        props.addCategory(category, tag)
    };

    const updateTag = (event) => {
        if (event.target.value !== '')
            setTag(event.target.value);
        console.log(tag)
    };

    const updateCategoryName = (event) => {
        if (event.target.value !== '') {
            setCategory(event.target.value);
        }
    };


    const updateCurrentTags = (tag, tags) => {
        let exist = false
        props.currentTags.forEach(tg => {
            if (tg !== tag) {
                if (tags.includes(tg)) {
                    exist = true
                }
            } else exist = true
        })
        if (!exist) {
            props.setCurrentTags([...props.currentTags, tag])
        }
    };

    const addTagToCurrentCategory = (category) => {
        props.categories.forEach(categ => {
            if (categ.name === category) {
                if (!categ.tags.includes('#' + tag) && tag !== '') {
                    props.addTagToCategory(category, tag)
                } else {
                    console.log('Already Exist')
                }
            }
        })
    };

    const onSearchFunc = (event) => {
        console.log(event.target.value)
    };


    const bodyCategory = (category) => {
        return <>
            <div className={'summaryCategory'}>
                <div className={'displayFlex'}>
                    <div className={'categoryNameCurrentCrop'}>{category.name}</div>
                    {category.tags !== undefined && <div className={'lenCategoryDiv'}>
                        {category.tags.length} {category.tags.length > 1 ? 'tags' : 'tag'}
                    </div>}
                </div>

                <div className={"wrapperInputCategory floatRight"}>
                    <div className={'wrapperLabelCategory'}> tag:</div>

                    <input placeholder={"type new tag..."}
                           className={'addTagInput'}
                           onChange={updateTag}>
                    </input>
                    <button onClick={() => addTagToCurrentCategory(category.name)}
                            className={'addTagButton adjustButtonAdd'}><FaPlus/>
                    </button>
                </div>
            </div>

            <div className={'bodyCategoryCurrentCrop'}>
                <div className={'tagsDivCategory'}>
                    {category.tags.map((tag, index) => {
                        if (tag !== undefined) {
                            return <TagComponent
                                key={tag + category.name + index}
                                tag={tag} WrapperTagAdjust={'WrapperTagAdjustCategories'}
                                onclickTag={() => updateCurrentTags(tag, category.tags)}
                                onClickDelete={() => props.deleteTagByCategoryName(category.name, tag)}/>
                        }
                    })}
                </div>

            </div>
        </>
    };

    const bodyAddCategory = () => {
        return <>
            <div className={'bodyCategoryCurrentCrop'}>
                <div className={'addNewCategoryRoot'}>
                    Add new category
                </div>

                <div className={"wrapperInputCategory"}>
                    <div className={'wrapperLabelCategory'}> Name</div>

                    <input placeholder={"type category..."}
                           className={'addTagInput'}
                           onChange={updateCategoryName}>
                    </input>
                </div>
                <div className={"wrapperInputCategory"}>
                    <div className={'wrapperLabelCategory'}>Tag</div>
                    <input placeholder={"type new tag..."}
                           className={'addTagInput'}
                           onChange={updateTag}>
                    </input>
                </div>
                <button onClick={() => saveNewCategory()} className={'addTagButton'}><FaPlus/></button>
            </div>
        </>
    };

    return (
        <>
            <div className={'accordionNewWrapper'}>
                {bodyAddCategory()}
            </div>

            <div className={"currentTagBuildingContainerBottomFather"}>
                <div className={'searchBarDiv'}>
                    <input placeholder={'Search category...'} type='text' className={'inputSearch'}
                           onChange={onSearchFunc}/>
                </div>
                {<div className={'currentTagBuildingContainerBottom'}>
                    {props.categories.map(category => {
                        return <div key={category._id} className={'existingCategoryDiv'}>
                            {bodyCategory(category)}
                        </div>

                    })}
                </div>
                }
            </div>

        </>
    );
}

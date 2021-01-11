import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import {Link} from 'react-router-dom';
import './SideBar.css';
import AllFolders from "../FoldersFrames/AllFolders";

function SideBar(props) {

    const [isSidebar, setIsSidebar] = useState(false);
    let folders = props.allFolders
    const showSidebar = () => {
        setIsSidebar(!isSidebar);
        props.setSidebar(!isSidebar)
    }

    const deleteCollection = (folder) => {
        props.deleteFolder(folder)
    }
    const folderToBeShown = (folder) => {
        props.getImagesByFolder(folder)
        console.log(folder)

    }

    return (
        <>
            <div className={isSidebar ? "sideBarContainer" : ""}>

                {!isSidebar &&
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaListUl onClick={showSidebar}/>
                </Link>}

                <nav className={isSidebar ? 'nav-menu2 active' : 'nav-menu2'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                            {isSidebar &&
                            < Link to='#' className='menu-bars2'>
                                <BsIcons.BsBoxArrowLeft onClick={showSidebar}/>
                            </Link>}
                        </li>
                        {<AllFolders folders={folders}
                                     folderToBeShown={folderToBeShown}
                                     deleteCollection={deleteCollection}/>}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SideBar;

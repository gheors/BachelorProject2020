import axios from "axios";

const SITES_API_BASE_URL = "/api/videos";


export function getExistingVideos() {
    return axios.get('/api/videos')
        .then(res => {
            return res.data
        })
}

export function postVideos_API(data) {
    return axios.post("/api/videos", data)
        .then(res => {
            return res.data
        })
}

export function deleteVideo_API(video) {
    return axios.delete(`/api/videos/?name=${video.name}`, video)
        .then(res => {
            return res.data
        })
}


export function callFragmentation(videoName, frameRate) {
    return axios.get(`/api/videos/${videoName}?frameRate=${frameRate}`)
}


export function getExistingFolders() {
    return axios.get('/api/folders')
        .then(res => {
            return res.data
        })
}

export function getSelectedFolder(id) {
    return axios.get(`/api/images/folder/${id}`)
}

export function deleteFolderAPI(folder) {
    return axios.delete(
        `/api/folders/?id=${folder._id}&name=${folder.name}&videoName=${folder.videoName}`,
        folder
    )
}

export function deleteSelectedImages_API(folderId, selectedImages) {
    return axios.post(
        `/api/images/folder/${folderId}`,
        selectedImages
    )
}

export function selectImagesUpload_API(apiPath, valueName, data) {
    return axios.post(
        `/api/folders/${apiPath}/${valueName}`,
        data
    )
}

export function setCurrentFolder_API(folderId) {
    return axios.get(`/api/images/folder/${folderId}`)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
}


submitButton.onclick = async (event) => {
    event.preventDefault()

    let videoTitle = videoInput.value.trim()
    const file = uploadInput.files[0]

    if (!(videoTitle && file)) return

    const formData = new FormData()
	formData.append('videoTitle', videoTitle)
	formData.append('file', file)

	let response = await request('/videos', 'POST', formData)

    messageText.textContent = response.message
    messageText.style.color = 'green'
    videoInput.value = ''

    setTimeout(() => {
        messageText.textContent = ''
        renderVideo()
    }, 1000)
}


async function renderVideo() {
    let response = await request('/videos/admin', 'GET')

    videoList.innerHTML = ''
    let list = ''
    for(let video of response.videos) {
        list += `
            <li class="video-item">
                <video src="${backendApi + video.videoUrl}" controls=""></video>
                <p onkeydown="put(${video.videoId}, ${this})" class="content" data-id="${video.videoId}" contenteditable="true">${video.videoTitle}</p>
                <img onclick="deleteVideo(${video.videoId})" src="./img/delete.png" width="25px" alt="upload" class="delete-icon" data-id="2">
            </li>
        `
    }
    videoList.innerHTML = list
}

async function deleteVideo(id) {
    const formData = new FormData()
	formData.append('videoId', id)
    let response = await request('/videos', 'DELETE', formData)

    messageText.textContent = response.message
    messageText.style.color = 'green'
    
    setTimeout(() => {
        messageText.textContent = ''
    }, 1000)
    renderVideo()
}


function put(id, element) {
    console.log(element);
    const title = document.querySelector(`[data-id='${id}']`)
    const formData = new FormData()
	formData.append('videoId', id)
	formData.append('title', title.innerHTML)
    request('/videos', 'PUT', formData)
}


renderVideo()
let availableExtImages = [".jpeg", ".jpg", ".png"]
let availableExtVideos = [".mp4"]

const getTypeByExt = (ext)=>{
  if( availableExtImages.find((e)=>e.localeCompare(ext)) ){
    return "Изображение"
  }

  if( availableExtVideos.find((e)=>e.localeCompare(ext)) ){
    return "Видео"
  }

  return "Неизвестно"
}

export {
  getTypeByExt
}
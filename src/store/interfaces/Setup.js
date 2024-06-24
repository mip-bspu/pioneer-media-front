export default class Setup{
  constructor(setup) {
    this.setup = setup;
  }

  getAvailableImageFormats() {
    return this.setup.value?.content?.image_formats ?? []
  }

  getAvailableVideoFormats() {
    return this.setup.value?.content?.video_formats ?? []
  }

  getTypeByExt(ext) {
    if( this.getAvailableImageFormats().find((e)=>e.localeCompare(ext)) ){
      return "Изображение"
    }
  
    if( this.getAvailableVideoFormats.find((e)=>e.localeCompare(ext)) ){
      return "Видео"
    }
  
    return "Неизвестно"
  }

  setSetup(setup) {
    this.setup.value = setup;
  }
}
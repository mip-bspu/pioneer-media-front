import client from '@/client'
import { getNameFromTag } from '@/utils/format.util.js'
import { ref, isRef } from 'vue'

export function createAction({name, from, to, tags = [], priority = 0, files}){
  let data = createFormForAction({name, from, to, priority, tags, files})

  return client.post('/action', data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function getListActions({tags, page, page_size = 20}){
  return client.get('/action', {
    params: {
      page: page,
      page_size: page_size,
      tags: tags.map(t=>t.name).join(",")
    }
  })
}

export function updateAction(id, {name, from, to, priority, tags}){
  let data = createFormForAction({name, from, to, priority, tags})

  return client.put(`/action/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function updateActionContent(id, files) {
  return client.put(`/action/${id}`, appendFilesToFormData(files), {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function deleteAction(id){
  return client.delete(`/action/${id}`)
}

function appendFilesToFormData(formData, files) {
  for(let file of files){
    file?.time?.value && data.append('times[]', `${file.name};${Date.getSecondsFromTime(file.time.value)}`)

    data.append('files[]', file)
  }

  return formData
}

function createFormForAction({name, from, to, priority, tags = [], files = []}){
  let data = new FormData()

  data.append("name", name)
  data.append('from', from)
  data.append('to', to)
  data.append('priority', priority)

  appendFilesToFormData(data, files)

  for(let tag of tags){
    data.append('tags[]', getNameFromTag(tag))
  }

  return data
}

export function assignTimeForImageFile(file, time = '00:15') {
  if( !(file?.type ?? file?.content_type).includes("image") ) return file;

  time = Number.isInteger(time) ? Date.getTimeFromSeconds(time) : time;

  if( isRef(file.time) ){
    file.time.value = time
  }else{
    file.time = ref(time)
  }
    
  return file;
}
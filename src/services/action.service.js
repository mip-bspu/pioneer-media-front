import client from '@/client'
import { getNameFromTag } from '@/utils/format.util.js'
import { ref, isRef } from 'vue'

export function createAction({name, from, to, tags = [], priority = 0, files}){
  let data = createFormForAction({name, from, to, priority, tags})
  data = appendFilesWithTimes(data, files)

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

export function updateAction(id, {name, from, to, priority, tags, append_files, delete_files}){
  let data = createFormForAction({name, from, to, priority, tags});
  data = appendFilesWithTimes(data, append_files, 'append_files[]');
  console.log(delete_files)
  data = deleteFiles(data, delete_files, 'delete_files[]');

  return client.put(`/action/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function deleteAction(id){
  return client.delete(`/action/${id}`)
}

function appendFilesWithTimes(formData, files = [], key = 'files[]') {
  for(let file of files){
    file?.time?.value && formData.append('times[]', `${file.name};${Date.getSecondsFromTime(file.time.value)}`)

    formData.append(key, file)
  }

  return formData
}

function deleteFiles(formData, fileUUIDs, key = 'files[]') {
  for( let uuid of fileUUIDs ) {
    formData.append(key, uuid)
  }

  return formData;
}

function createFormForAction({name, from, to, priority, tags = []}){
  let data = new FormData()

  name != undefined && data.append('name', name)
  from != undefined && data.append('from', from)
  to != undefined && data.append('to', to)
  priority != undefined && data.append('priority', priority)

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
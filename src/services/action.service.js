import client from '@/client'
import { getNameFromTag } from '@/utils/format.util.js'
import { ref, isRef } from 'vue'
import { pipe } from '@/utils/functional.util.js'

export function getListActions({tags, page, page_size = 20}){
  return client.get('/action', {
    params: {
      page: page,
      page_size: page_size,
      tags: tags.map(t=>t.name).join(",")
    }
  })
}

export function createAction({name, from, to, tags = [], priority = 0, files}){
  let data = createFormForAction({name, from, to, priority, tags})
  data = appendItemsByKey(data, files)
  
  files.forEach(file => {
    appendTime(data, file)
  })

  return client.post('/action', data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function updateAction(id, {
  name, from, to, priority, tags, 
  append_files: append_files = [], 
  delete_files: delete_files = []
}){
  const data = pipe(
    [ {name, from, to, priority, tags} ],
    createFormForAction,
    (d)=>appendItemsByKey(d, append_files, 'append_files[]'),
    (d)=>appendItemsByKey(d, delete_files, 'delete_files[]'),
  )

  return client.put(`/action/${id}`, data, {
    Headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export function deleteAction(id){
  return client.delete(`/action/${id}`)
}

export function updateActionImageTimes(id, files) {
  return client.put(`/action/${id}/files`, {
    times: files.map(f=>({ uuid: f.id, time: Date.getSecondsFromTime(f.time) })) 
  })
}

function appendItemsByKey(formData, items = [], key = 'files[]') {
  for(let item of items){
    formData.append(key, item)
  }

  return formData
}

const appendTime = (formData, file, key = 'times[]')=>{
  formData.append(
    key, `${file?.id || file.name};${file.time.value}`
  )
}

function createFormForAction({name, from, to, priority, tags = []}){
  let data = new FormData()

  name     !== undefined && data.append('name', name)
  from     !== undefined && data.append('from', from)
  to       !== undefined && data.append('to', to)
  priority !== undefined && data.append('priority', priority)

  for(let tag of tags){
    data.append('tags[]', getNameFromTag(tag))
  }

  return data
}

const isImageFile = (file)=>(file?.type ?? file?.content_type).includes("image")

export function assignTimeForImageFile(file, time = '00:15') {
  if( !isImageFile(file) ) return file;

  time = Number.isInteger(time) ? Date.getTimeFromSeconds(time) : time;

  if( isRef(file.time) ){
    file.time.value = time
  }else{
    file.time = ref(time),
    file.defaultTime ??= time
  }
    
  return file;
}

export function resetTimeForImageFiles(files) {
  for( let file of files ) {
    if( !isImageFile(file) ) continue;

    if( isRef(file.time) ){
      file.time.value = file.defaultTime || '00:10'
    }else{
      file.time = file.defaultTime || '00:10'
    }
  }
}
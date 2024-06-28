import { getUrlFile } from '@/services/files.service.js'
import { toSrc } from '@/utils/file.util.js';
import { ref } from 'vue';
import { updateAction } from '@/services/action.service';
import { assignTimeForImageFile } from '@/services/action.service'

function transformFile(file, local = false) {
  return local ? 
    {
      src: toSrc(file),
      file: file,
      local: true,
      type: file.type
    } :
    {
      src: getUrlFile(file.id),
      file: assignTimeForImageFile(file, file.time),
      local: false,
      type: file.content_type,
    }
}

export function useUpdateContent() {
  let appendedFiles = ref([])
  let willDeleteFiles = ref([]) 


  const addInAppending = (file) => 
    appendedFiles.value = [...appendedFiles.value, transformFile(file, true)]
  
  const removeFromAppending = (file) =>
    appendedFiles.value = appendedFiles.value.filter((content) => content.file.name !== file.name)
  
  const addInDeleting = (file) => 
    willDeleteFiles.value = [...willDeleteFiles.value, file.id]

  const removeFromDeleting = (file) => 
    willDeleteFiles.value = willDeleteFiles.value.filter(uuid=>uuid !== file.id)
  

  const clearChanges = () => {
    appendedFiles.value = [];
    willDeleteFiles.value = [];
  }

  const isDeleting = (file) => willDeleteFiles.value.indexOf(file.id) !== -1

  const onUpdateActionContent = (action_id) => {
    return updateAction(action_id, {
      append_files: appendedFiles.value.map((content)=>content.file),
      delete_files: willDeleteFiles.value,
    })
  }

  return {
    appendedFiles,
    willDeleteFiles,

    onUpdateActionContent,
    transformFile,

    addInAppending,
    removeFromAppending,
    addInDeleting,
    removeFromDeleting,

    clearChanges,
    isDeleting
  }
}
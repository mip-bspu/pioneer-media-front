import { reactive } from 'vue'
import { useAsync } from '@/composables/useAsync';
import { getOptions } from '@/services/admin.service.js'

export function useOptions() {
  const {
    exec: execGetOptions
  } = useAsync(getOptions, {globalError: true})

  let options = reactive({
    tags: [],
    groups: []
  })
 
  const onGetOptions = async ()=>{
    const nOptions = await execGetOptions()

    if(nOptions){
      Object.assign(options, nOptions)
      options.groups = options.groups.filter(g => g !== "ADMIN")
    }
  }
  onGetOptions()

  return {
    options
  }
}
import {reactive} from 'vue';
import { getMessageError } from '@/utils/format.util.js'
import { useStore } from '@/store/useStore'

const { store: NotificationStore } = useStore("notification")

const delay = (ms)=>new Promise((res)=>setTimeout(res, ms))

export function useAsync(func, opts = { delay: 0, globalError: false, msgSuccess: "" }){
  let state = reactive({
    error: null,
    isError: false,
    isLoading: false
  })

  async function exec(...args){
    try{
      state.error = null;
      state.isError = false;
      state.isLoading = true;

      if( opts["delay"] > 0 )
        await delay(opts["delay"]);

      return await func(...args)
    }catch(e){
      state.isError = true;
      state.error = getMessageError(e);

      if(opts["globalError"])
        NotificationStore.setMessageError(state.error)

      return null;
    }finally{
      state.isLoading = false;

      if(!state.isError && opts["msgSuccess"] != "")
        NotificationStore.setMessageSuccess(opts["msgSuccess"]);
    }
  }

  return {
    exec,
    state
  }
}
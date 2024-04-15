import {reactive} from 'vue';
import { getMessageError } from '@/utils/format.util.js'

const delay = (ms)=>new Promise((res)=>setTimeout(res, ms))

export function useAsync(func){
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
      // await delay(4000)
      return await func(...args)
    }catch(e){
      state.isError = true;
      state.error = getMessageError(e);
      return null;
    }finally{
      state.isLoading = false;
    }
  }

  return {
    exec,
    state
  }
}
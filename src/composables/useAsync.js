import {reactive} from 'vue';

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

      return await func(args)
    }catch(e){
      state.isError = true;
      state.error = e;

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
import { reactive, watch, computed } from 'vue';

export function usePagination(cb, {
    page: page = 0, 
    page_size: page_size = 10 
  }) {

  let pagination = reactive({
    content: [],
    page: page,
    page_size: page_size,
    total: 0
  })

  let maxPages = computed(()=>Math.ceil(pagination.total/pagination.page_size))

  async function exec(...args) {
    let res = await cb(...args)

    if( res?.status === 200 ){
      Object.assign(pagination, res.data)
    }

    return res;
  }

  return {
    pagination,
    maxPages,
    
    exec
  }
}
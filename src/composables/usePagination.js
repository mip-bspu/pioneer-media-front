import { reactive, watch, computed } from 'vue';

export function usePagination(getPageItems, { 
    args: args = [], 
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

  watch(
    ()=>[pagination.page, pagination.page_size],
    async () => {
      let res = await getPageItems(...args, pagination.page, pagination.page_size)

      if( res?.status === 200 ){
        Object.assign(pagination, res.data)
      }
    },
    { immediate: true }
  )

  return {
    pagination,
    maxPages
  }
}
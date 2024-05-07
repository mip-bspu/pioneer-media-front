import { ref, onMounted, onUnmounted } from 'vue'
import { useAsync } from '@/composables/useAsync';
import { getListDevices } from '@/services/devices.service.js';

export function useDevices({intervalUpdate = 15000}) {
  const {
    exec: execGetDevices,
    state: stateGetDevices
  } = useAsync(getListDevices, {globalError: true});
  
  let devices = ref([]);
  
  async function onGetDevices(){
    const res = await execGetDevices()
  
    if( !stateGetDevices.isError ){
      devices.value = res.data
    }
  }
  onGetDevices();

  const updateDevicesList = () => onGetDevices()

  let intervalId = null;

  onMounted(() => {
    intervalId = setInterval(()=>{
      onGetDevices();
    }, intervalUpdate)
  })

  onUnmounted(()=>{
    clearInterval(intervalId)
  })

  return {
    devices,
    stateGetDevices,
    updateDevicesList
  }
}
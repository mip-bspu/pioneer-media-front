import { Notify } from 'quasar'

const defaultSetup = {
  progress: true,
  position: 'top',
  actions: [{ icon: "mdi-close", color: "white" }],
}

function showError(message){
  Notify.create({
    message,
    type: "negative",
    ...defaultSetup
  })
}

function showSuccess(message){
  Notify.create({
    message,
    type: "positive",
    ...defaultSetup
  })
}

function showInfo(message){
  Notify.create({
    message,
    type: "info",
    ...defaultSetup
  })
}

export {
  showError,
  showSuccess,
  showInfo
}
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
    ...defaultSetup,
    color: 'red-5'
  })
}

function showSuccess(message){
  Notify.create({
    message,
    type: "positive",
    ...defaultSetup,
    color: 'green-6'
  })
}

function showInfo(message){
  Notify.create({
    message,
    type: "info",
    ...defaultSetup,
    actions: [{ icon: "mdi-close", color: "white" }],
    color: 'grey-8',
    textColor: 'white',
    icon: 'mdi-message-alert-outline'
  })
}

export {
  showError,
  showSuccess,
  showInfo
}
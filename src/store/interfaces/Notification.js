export default class Notification{
  constructor(notification){
    this.notification = notification
  }

  getMessageError(){
    return this.notification.value.error
  }
  getMessageSuccess(){
    return this.notification.value.success
  }
  getMessageInfo(){
    return this.notification.value.info
  }

  setMessageError(message){
    return this.notification.value.error = message
  }
  setMessageSuccess(message){
    return this.notification.value.success = message
  }
  setMessageInfo(message){
    return this.notification.value.info = message
  }
}
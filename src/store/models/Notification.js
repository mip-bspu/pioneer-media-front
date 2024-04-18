export default class Notification{
  constructor(notification){
    this.notification = notification
  }

  getMessageError(){
    return this.notification.value.error
  }

  setMessageError(message){
    return this.notification.value.error = message
  }
}
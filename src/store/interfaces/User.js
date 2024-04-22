export default class User{
  constructor(user){
    this.user = user;
  }

  getTags(){ return this.user.value?.tags || null }
  getGroups(){ return this.user.value?.groups || null }
  getLogin(){ return this.user.value?.login || null }
  isUser(){ return !!this.user.value }

  setUser(user){
    this.user.value = user    
  }
}
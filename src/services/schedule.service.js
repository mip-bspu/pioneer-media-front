import client from '@/client'
import { monthName } from '@/utils/map.util.js'

export const createPeriodMonths = (year, month)=>{
  return ({
    begin: new Date(year, month, 1),
    end: new Date(year, month + 1, Date.lastDateOfMonth(year, month + 1))
  })
}

const getRandomColor = ()=>{
  const colors = [
    "#8d7676",
    "#815F9E",
    "#5841C0",
    "#37914F",
    "#A92E4B",
    "#B38B1C",
    "#D16A15"
  ]
  let index = Math.floor(Math.random()*colors.length)

  return colors[index]
}

const createDataActionForRender = (period, action, index)=>{
  // TODO: if action before 'from'
  let from = new Date(action["from"]); from.setHours(0)
  let to =   new Date(action["to"]);   to.setHours(0)

  let diff = to > period.end ? Date.diff(period.end, from) + 1: Date.diff(to, from) + 1;

  return {
    data: {
      name: action["name"],
      tags: action["tags"]
    },
    style: {
      top: 40 * index + 'px',
      width: diff * 40 + 'px',
      backgroundColor: getRandomColor()
    }
  }
}

const createDataDayForRender = (curDate, dataActions = [])=>{
  return ({
    actions: dataActions,
    date: curDate.getDate(), 
    day: curDate.getDay(),
    isToday: Date.formatDateIso(curDate) == Date.today(),
    monthName: curDate.getDate() == 1 ? monthName[curDate.getMonth()] : null
  })
}

export function createTimeline(year, month, actions){
  const period = createPeriodMonths(year, month)

  let mapActions = {}
  let range = []

  actions.forEach((action, index)=>{
    let data = createDataActionForRender(period, action, index)
    let from = Date.formatDateIso(action["from"])

    mapActions[from] =  mapActions[from] ? [...mapActions[from], data]  : [data]
  })

  let iterDate = new Date(period.begin)

  while(iterDate <= period.end){
    let data = createDataDayForRender(iterDate, mapActions[Date.formatDateIso(iterDate)])
    range.push(data)

    iterDate.setDate(iterDate.getDate()+1)
  }

  return range
}

export function getActionsFromPeriod({tags, from, to}){
  return client.get('/action/period', {
    params: {
      from: Date.formatDateIso(from),
      to: Date.formatDateIso(to),
      tags: tags.join(",")
    }
  })
}
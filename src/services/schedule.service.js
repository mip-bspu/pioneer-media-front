import client from '@/client'
import { monthName } from '@/utils/map.util.js'
import { getNameFromTag } from '../utils/format.util';

const GAP_TIMELINES = 4;

const createPeriodMonths = (year, month)=>{
  return ({
    begin: new Date(year, month, 1),
    end: new Date(year, month + 1, Date.lastDateOfMonth(year, month + 1))
  })
}

const getRandomColor = ()=>{
  const colors = [
    "#C1A3A3",
    "#AB84CD",
    "#5841C0",
    "#37914F",
    "#DB5675",
    "#EAAC04",
    "#E4802E"
  ]
  let index = Math.floor(Math.random()*colors.length)

  return colors[index]
}

const createDataActionForRender = (period, action, index)=>{
  let from = new Date(action["from"]); from.setHours(0)
  let to =   new Date(action["to"]);   to.setHours(0)

  from = from < period.begin ? period.begin : from;
  let diff = to > period.end ? Date.diff(period.end, from) + 1: Date.diff(to, from) + 1;
  
  return {
    data: {
      from: from,
      name: action["name"],
      tags: action["tags"]
    },
    style: {
      top: 20 + (36 + GAP_TIMELINES) * index + 'px',
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

function createTimeline(year, month, actions){
  const period = createPeriodMonths(year, month)

  let mapActions = {}
  let range = []

  actions.forEach((action, index)=>{
    let transformAction = createDataActionForRender(period, action, index)
    let from = Date.formatDateIso(transformAction.data["from"])
    
    mapActions[from] =  mapActions[from] ? [...mapActions[from], transformAction]  : [transformAction]
  })

  let iterDate = new Date(period.begin)

  while(iterDate <= period.end){
    let data = createDataDayForRender(iterDate, mapActions[Date.formatDateIso(iterDate)])
    range.push(data)

    iterDate.setDate(iterDate.getDate()+1)
  }

  return range
}

function getActionsFromPeriod({tags, from, to}){
  return client.get('/action/period', {
    params: {
      from: Date.formatDateIso(from),
      to: Date.formatDateIso(to),
      tags: tags.map(t=>getNameFromTag(t)).join(",")
    }
  })
}

function createCalendar(month, year){
  let date = new Date(year, month, 1)

  let daysOfMonth = new Array(date.getDay()).fill(null)

  for(let i = 1; i <= 31; i++){
    date.setDate(i)
    if( date.getMonth() != month ) break;

    daysOfMonth.push(i)
  }

  return daysOfMonth;
}

export {
  getActionsFromPeriod,
  createTimeline,
  createPeriodMonths,
  createCalendar
}
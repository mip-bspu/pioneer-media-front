Date.applyOffset = (date) =>{
  const offset = date.getTimezoneOffset() * 60 * 1000;
  date.setTime(date.getTime() + offset);
}

Date.toLocale = (date) => {
  return new Date(date).toLocaleString();
}

Date.getSecondsFromTime = (time)=>{
  let times = time.split(":").map((i)=>parseInt(i))

  return times[0]*60 + times[1];
}

Date.getTimeFromSeconds = (time)=>{
  return ("0"+Math.floor(time/60)).slice(-2) + ":" + ("0"+(time%60)).slice(-2);
}

Date.formatDateIso = (date, keepOffset = true) => {
  date = new Date(date);

  if (keepOffset) {
    Date.applyOffset(date);
  }

  return date.toISOString().substring(0, 10);
};

Date.today = ()=>{ 
  return Date.formatDateIso(new Date())
}

Date.lastDateOfMonth = (year, month)=>{
  let count = 28
  let date = new Date(year, month, count)

  date.setDate(date.getDate() + 1)
  while( date.getMonth() == month ) {
    count++;
    date.setDate(date.getDate() + 1)
  }
  
  return count;
}

Date.diffWithNow = (date, level = "minutes") => Date.diff(new Date(), date, level)

Date.diff = (toDate, fromDate, level = "days") => {
  let precision = 1;

  switch(level){
    case "days":
      precision *= 24
    case "hours":
      precision *= 60
    case "minutes":
      precision *= 60
    case "seconds":
      precision *= 1000
    case "milliseconds":
      break;
  }

  return Math.abs(toDate - fromDate) / precision
}
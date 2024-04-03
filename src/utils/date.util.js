Date.applyOffset = (date) =>{
  const offset = date.getTimezoneOffset() * 60 * 1000;
  date.setTime(date.getTime() - offset);
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

console.log(Date.today())
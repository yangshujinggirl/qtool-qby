import moment from 'moment';

const disabledDate = current => {
  return current && current < moment().endOf('day').subtract(1,'days');
};
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const formatHours =(date)=> {
  let hour = moment().hour();
  let disabledHours;
  disabledHours = range(0, 24).splice(0,hour);
  return disabledHours;
}
const formatMinutes =(date)=> {
  let minute = moment().minute();
  let disabledMinutes = range(0, 60).splice(0, minute+1);
  console.log(disabledMinutes)
  return disabledMinutes;
}
const disabledDateTime = (date,type) => {
  if (type === 'start') {
    return {
      disabledHours: () => formatHours(date),
      disabledMinutes: () => formatMinutes(date),
      disabledSeconds: () => [],
    };
  }
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  };
};
export {
  disabledDate, disabledDateTime
}

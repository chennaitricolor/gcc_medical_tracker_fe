import moment from 'moment';

export function formatDateToMMDDYYYYWithTimeFormat(date, format) {
  if (date === null || date === undefined) {
    return '';
  }
  return moment(date).format(format);
}

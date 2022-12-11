import { pluralize } from './common';

export function secondToDay(second: number) {
  return second / (24 * 60 * 60);
}

/**
 *
 * @param time
 * @param cFormat '{y}-{m}-{d} {h}:{i}:{s}'
 * @returns {string|null}
 */
export function parseTime(time: any, cFormat: string) {
  if (arguments.length === 0 || !time) {
    return null;
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time) * 1000;
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }

    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }

    return value || 0;
  });
}

export function formatTime(time: any, option: any) {
  time = +time * 1000;
  const d: any = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return 'Just now';
  } else if (diff < 3600) {
    // less 1 hour
    return pluralize(Math.ceil(diff / 60), ' minute') + ' ago';
  } else if (diff < 3600 * 24) {
    return pluralize(Math.ceil(diff / 3600), ' hour') + ' ago';
  } else if (diff < 3600 * 24 * 2) {
    return '1 day ago';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      pluralize(d.getMonth() + 1, ' month') +
      ' ' +
      pluralize(d.getDate(), ' day') +
      ' ' +
      pluralize(d.getHours(), ' day') +
      ' ' +
      pluralize(d.getMinutes(), ' minute')
    );
  }
}

export function getTime(type: any) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * Format date year-month-day
 * @param {Date} date
 */
export function formatDate(date: any) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

export function timeAgo(time: any) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

/**
 *q
 * @param num
 * @param digits
 * @returns {string}
 */
export function numberFormatter(num: any, digits: number) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * format a thousand
 * @param num
 * @returns {string}
 */
export function toThousandFilter(num: any) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * format 1000 to "k"
 * @param num
 * @returns {string}
 */
export function kFormatter(num: any) {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
}

export function parseTimeToTz(date: any, timeZone: string, format = '{y}-{m}-{d}') {
  return parseTime(new Date(new Date(date).toLocaleString('en-US', { timeZone })), format);
}

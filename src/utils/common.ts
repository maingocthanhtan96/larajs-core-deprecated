/**
 * Get query object from URL
 * @param {string} url
 */
export function getQueryObject(url: any) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj: any = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs: any, $1: any, $2: any) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });

  return obj;
}

/**
 * @returns {number} output value
 * @param str
 */
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) {
      s++;
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2;
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      i--;
    }
  }
  return s;
}

/**
 * Remove invalid (not equal true) elements from array
 *
 * @param {Array} actual
 */
export function cleanArray(actual: []) {
  const newArray: any = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }

  return newArray;
}

/**
 * Parse params from URL and return an object
 *
 * @param {string} url
 */
export function param2Obj(url: string) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
    '"}'
  );
}

/**
 * @param {string} val
 */
export function html2Text(val: string) {
  const div = document.createElement('div');
  div.innerHTML = val;

  return div.textContent || div.innerText;
}

/**
 * Merges two  objects, giving the last one precedence
 *
 * @param {Object} target
 * @param {Object} source
 */
export function objectMerge(target: any, source: any) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });

  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element: any, className: any) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }

  element.className = classString;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('Error arguments deepClone');
  }
  const targetObj: any = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });

  return targetObj;
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt(String((1 + Math.random()) * 65536)) + '';
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 *
 * @param ele
 * @param {String} cls
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 *
 * @param ele
 * @param {String} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

/**
 * Remove class from element
 *
 * @param ele
 * @param {String} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 *
 * @param path
 * @returns {boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 *
 * @param string
 * @param expressions
 * @returns {boolean}
 */
export function matchInArray(string: string, expressions: RegExp[]) {
  const len = expressions.length;
  let i = 0;

  for (; i < len; i++) {
    if (string.match(expressions[i])) {
      return true;
    }
  }

  return false;
}

export function checkNested(obj: any /*, level1, level2, ... levelN*/) {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments, 1);

  for (let i = 0; i < args.length; i++) {
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

export function downloadTagA(path: string, filename: string) {
  const element = document.createElement('a');
  element.setAttribute('href', path);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * swap data
 * @param data
 * @param x
 * @param y
 * @returns {*}
 */
export function swap(data: any, x: number, y: number) {
  const origin = data[x];
  data[x] = data[y];
  data[y] = origin;

  return data;
}

/**
 *
 * @param time
 * @param label
 * @returns {string|*}
 */
export function pluralize(time: number, label: string) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

export function pathResolve(start: string, end: string) {
  return [start, end !== start ? end : '']
    .join('/')
    .replace(/\/{2,}/, '/')
    .replace(/\/+$/g, '');
}

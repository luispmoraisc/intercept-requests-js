/**
 * Item of list config
 * @typedef {{listening: string, ignore: Array<string>, executeWhenOpen: (context: XMLHttpRequest, args: (string | boolean)[]) => { objectRequest: XMLHttpRequest, newArguments: (string | boolean)[] }, executeBeforeSend?: (context: XMLHttpRequest, args: (string | null)[]) => { objectRequest: XMLHttpRequest, newArguments: (string | null)[] } }} ItemConfig
 */

/**
 * @param {string} url
 * @param {Array<ItemConfig>} array
 * @returns {boolean}
 */
const checkIgnore = (url, array) => {
  let check = array.find((item) => {
    if (url.includes(item)) return true;
  });

  return check ? false : true;
};

/**
 * @param {string} url
 * @param {Array<ItemConfig>} array
 * @returns {undefined | ItemConfig}
 */
const checkListening = (url, array) => {
  let ignore = array.find(({ listening, ignore }) => {
    if (url.includes(listening)) return checkIgnore(url, ignore);
  });

  return ignore;
};

export { checkListening, checkIgnore };

import { checkListening } from './filters';

/**
 * Item of list config
 * @typedef {{listening: string, ignore: Array<string>, executeWhenOpen: (context: XMLHttpRequest, args: (string | boolean)[]) => { objectRequest: XMLHttpRequest, newArguments: (string | boolean)[] }, executeBeforeSend?: (context: XMLHttpRequest, args: (string | null)[]) => { objectRequest: XMLHttpRequest, newArguments: (string | null)[] } }} ItemConfig
 */

/**
 * @function InterceptRequestsJS
 * @param {Array<ItemConfig>} array
 */
function InterceptRequestsJS(array) {
  const cloneOpen = XMLHttpRequest.prototype.open;
  const cloneSend = XMLHttpRequest.prototype.send;
  let itemConfig; // share the same informations

  XMLHttpRequest.prototype.open = function (...args) {
    try {
      itemConfig = checkListening(args[1], array);

      if (itemConfig) {
        const { objectRequest, newArguments } = itemConfig.executeWhenOpen(this, arguments);
        cloneOpen.apply(objectRequest, newArguments);
        return;
      }
      cloneOpen.apply(this, arguments);
    } catch (err) {
      console.log(err); // eslint-disable-line
      cloneOpen.apply(this, arguments);
    }
  };

  XMLHttpRequest.prototype.send = function (...args) {
    try {
      if (!itemConfig || !itemConfig.executeBeforeSend) return cloneSend.apply(this, args);

      const { objectRequest, newArguments } = itemConfig.executeBeforeSend(this, arguments);

      cloneSend.apply(objectRequest, newArguments);
    } catch (err) {
      console.log(err); // eslint-disable-line
      cloneSend.apply(this, args);
    }
  };
}

export { InterceptRequestsJS };

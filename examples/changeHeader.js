import { InterceptRequestsJS, ItemConfig } from 'intercept-requests-js';

/**
 * @description change url https://viacep.com.br/ws/${parameter}/json to https://brasilapi.com.br/api/cep/${parameter}
 * @param {XMLHttpRequest} context
 * @param {(string | boolean)[]} args
 * @returns { objectRequest: XMLHttpRequest, newArguments: (string|boolean)[]}
 */
const executeWhenOpenHttpToGetCepInfos = (context, args) => {
  const cep = args[1].toString().match(/(?<=ws\/).*?(?=\/json)/);

  // new args: [method http, url, async (optional)]
  const newArgs = ['GET', `https://brasilapi.com.br/api/cep/v2/${cep}`, args[2]];

  // return object
  return {
    objectRequest: context,
    newArguments: newArgs,
  };
};

/**
 * @description add some headers on request
 * @param {XMLHttpRequest} context
 * @param {(string | boolean)[]} args
 * @returns { objectRequest: XMLHttpRequest, newArguments: (string|boolean)[]}
 */
const changeHeadersBeforeSend = (context, args) => {
  // just create object with some properties that I want the header contains
  const newHeaders = {
    Authorization: 'Bearer 1234',
    SomeHeader: 'someheader',
  };

  // iterable for object newHeaders and use context.setRequestHeader method to put informations on header.
  for (const [k, v] of Object.entries(newHeaders)) {
    context.setRequestHeader(k, v);
  }

  return {
    objectRequest: context,
    newArguments: args,
  };
};

/**
 * @description listening request that contains the word 'viacep'
 */
const config = [
  {
    listening: 'viacep',
    ignore: [],
    executeWhenOpen: executeWhenOpenHttpToGetCepInfos,
    executeBeforeSend: changeHeadersBeforeSend,
  },
];

/**
 * @description call InterceptRequestsJS with config array
 * @function InterceptRequestsJS
 * @param {ItemConfig[]}
 */
InterceptRequestsJS(config);

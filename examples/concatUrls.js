import { InterceptRequestsJS, ItemConfig } from 'intercept-requests-js';

/**
 * @description change url https://viacep.com.br/ws/${parameter}/json to https://brasilapi.com.br/api/cep/${parameter}
 * @param {XMLHttpRequest} context
 * @param {(string | boolean)[]} args
 * @returns { objectRequest: XMLHttpRequest, newArguments: (string|boolean)[]}
 */
const executeWhenOpenHttpToGetCepInfos = (context, args) => {
  const cep = args[1].toString().match(/(?<=ws\/).*?(?=\/json)/);
  const newUrl = `https://brasilapi.com.br/api/cep/v2/${cep[0]}`;
  const concatUrl = `?originalUrl=${encodeURIComponent(args[1])}`; // args[1] represents the original url
  const newArgs = ['GET', newUrl + concatUrl, args[2]];

  // return object
  return {
    objectRequest: context,
    newArguments: newArgs,
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
  },
];

/**
 * @description call InterceptRequestsJS with config array
 * @function InterceptRequestsJS
 * @param {ItemConfig[]}
 */
InterceptRequestsJS(config);

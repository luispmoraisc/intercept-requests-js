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
  const newArgs = ['POST', `https://brasilapi.com.br/api/cep/v2/${cep}`, args[2]];

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
const changeBodyBeforeSend = (context, args) => {
  // if the request has a body, you can get it with args[0]
  // I'll suppose that the original request was sending a body with object and I'll concat it with my informations
  try {
    const parseBody = JSON.parse(args[0]);
    const newBody = {
      ...parseBody,
      myProperty1: 'some value',
      myProperty2: 0,
      myProperty3: true,
    };

    return {
      objectRequest: context,
      newArguments: [JSON.stringify(newBody)],
    };
  } catch (err) {
    console.log(err);
    return {
      objectRequest: context,
      newArguments: args,
    };
  }
};

/**
 * @description listening request that contains the word 'viacep'
 */
const config = [
  {
    listening: 'viacep',
    ignore: [],
    executeWhenOpen: executeWhenOpenHttpToGetCepInfos,
    executeBeforeSend: changeBodyBeforeSend,
  },
];

/**
 * @description call InterceptRequestsJS with config array
 * @function InterceptRequestsJS
 * @param {ItemConfig[]}
 */
InterceptRequestsJS(config);

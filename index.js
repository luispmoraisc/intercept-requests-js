function InterceptRequestsJS(array) {
  const cloneOpen = XMLHttpRequest.prototype.open;
  const cloneSend = XMLHttpRequest.prototype.send;
  let url, req, changeReq;

  if (!Array.isArray) {
    Array.isArray = arg => {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }

  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError("Array.prototype.find called on null or undefined");
      }
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  XMLHttpRequest.prototype.open = function(...args) {
    url = args[1];
    changeReq = checkListening(url, array);
    if (changeReq && changeReq.redirect && changeReq.redirect.to) {
      if (changeReq.method) {
        arguments[0] = changeReq.method;
      }
      if (changeReq.redirect.concat) {
        arguments[1] = `${changeReq.redirect.to}${encodeURIComponent(url)}`;
      } else {
        arguments[1] = changeReq.redirect.to;
      }
      cloneOpen.apply(this, arguments);
    } else {
      cloneOpen.apply(this, arguments);
    }
  };

  XMLHttpRequest.prototype.send = function(...args) {
    req = this;
    args[1] = url;
    if (changeReq && changeReq.headers) {
      for (const [k, v] of Object.entries(changeReq.headers)) {
        req.setRequestHeader(k, v);
      }
    }
    if (changeReq && changeReq.body && changeReq.body.data) {
      console.log("BODY", JSON.parse(args[0]));
      args[0] = changeReq.body.concat
        ? JSON.stringify(Object.assign(changeReq.body.data, JSON.parse(args[0])))
        : JSON.stringify(changeReq.body.data);
    }
    cloneSend.apply(req, args);
  };

  function checkListening(url, array) {
    let ignore = array.find(item => {
      if (url.includes(item.listening)) return checkIgnore(url, item.ignore);
    });

    return ignore;
  }

  function checkIgnore(url, array) {
    let check = array.find(item => {
      if (url.includes(item)) return true;
    });

    return check ? false : true;
  }
}

export { InterceptRequestsJS };

<h1 align="center">
    Intercept Requests JS
</h1>

<h4 align="center">
    ☕ Code and coffee
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/luispmoraisc/intercept_requests_js?style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/luispmoraisc/intercept_requests_js?style=for-the-badge">
  
  <a href="https://github.com/luispmoraisc/intercept_requests_js/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/luispmoraisc/intercept_requests_js/master?style=for-the-badge">
  </a>

  <a href="https://github.com/luispmoraisc/intercept_requests_js/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/luispmoraisc/intercept_requests_js?style=for-the-badge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## Project

The project `intercept-requests-js` borned by necessity to redirect specific requests of third party scripts for another
end point.

Sometimes we need to use third party tools inside our applications as to improve user experience or to give help
widgets. But, the most time we need to create an integration with those tools and we can't control what those scripts
are calling of the external world, such as HTTP requests etc.

With intercept-requests-js you can intercept specific requests by domain, by keyword and the in a near future with
regex. When you intercept http request, you can redirect it, change headers, change body, or anything else that you want
before your browser send it.

## How to use

### Install

Install intercept-requests-js with npm:

```sh
$ npm i --save intercept-requests-js
```

Or using yarn:

```sh
$ yarn add intercept-requests-js
```

### Configuration

This module will provide a `InterceptRequestsJs` function and `ListItem` that is the type of configuration item. You
just need to create your `Array<ListItem>` and pass it to the InterceptRequestsJs function like this.

```ts
import { InterceptRequestsJs, ListItem } from 'intercept-requests-js';

const listItems: ListItem[] = [
  {
    listening: 'yahoo',
    ignore: [],
    executeWhenOpen: (context: XMLHttpRequest, args: (string | boolean)[]) => {
      return { objectRequest: context, newArguments: args };
    },
    executeBeforeSend: (context: XMLHttpRequest, args: (string | boolean)[]) => {
      return { objectRequest: context, newArguments: args };
    },
  },
];

InterceptRequestsJs(listItems);
```

Now, when any request matches with any listening property of `Array<ListItem>`, the methods `executeWhenOpen` and
`executeBeforeSend` will be cally before browser dispatch it, so if you need to change something on intercepted request,
do it in your methods. For example, let's supose that one widget/script is using some yahoo service and I want to
redirect this search for google, I can do it like this:

Intercept all requests that contain yahoo in your domain and redirect to google:

```ts
import { InterceptRequestsJS, ListItem } from 'intercept-requests-js';

const executeWhenOpen = (context: XMLHttpRequest, args: (string | boolean)[]) => {
  const newArguments = ['GET', 'http://google.com', args[2]];

  return { objectRequest: context, newArguments };
};

const listItems: ListItem[] = [
  {
    listening: 'yahoo',
    ignore: [],
    executeWhenOpen: (context: XMLHttpRequest, args: (string | boolean)[]) => {
      return { objectRequest: context, newArguments: args };
    },
  },
];
InterceptRequestsJs(listItems);
```

Obviously that isn't the best example, we can't change the return of API because the script will break and we haven't
want this happen. But, let me show you a real example:

## Real usecase

At one of my last jobs, we were using [Elev.io](http://elev.io) widget to share articles with our users, and although
`Elev.io` is awesome product we had some problems with latency, down API etc and it impacted our users and our
attendance team. So, we hadn't time and no made sense in that moment build our own widget. We decide to create a
microservice that we can send `Elev.io` requests and cache responses to guarantee that content are showing for our
users. Basically, we create one layer inside our infrastructure to receive `Elev.io` widget requests, send this request
to `Elev.io` API from our back end and save in cache the response. There is about 3 years that this product is running
without any problems and gets around 28 million of views every month.

## How to contribute

- Make a fork bases in this repository
- Create a new branch `git checkout -b my-feature`
- Commit your changes `yarn commit`
- Push your changes `git push origin my-feature`

After the merge of your pull request is done, you can delete your branch

## 📝 License

This project is based with MIT License. See the file [LICENSE](LICENSE) for more informations.

<h1 align="center">
    🚦 Intercept Requests JS 🕵
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

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 💻 Projeto

O projeto tem como intuíto interceptar todas as requisições dentro de uma aplicação, para que o dev  tenha mais controle sobre o que é chamado, a forma que é chamado e se necessário fazer redirecionamentos, alterando rota, método, body, headers etc.

## 👨‍🏫 Como usar

### Instalação
Para utilizar em seu projeto basta fazer download via npm:
```sh
$ npm i --save intercept-requests-js
```
É importante salientar que o código está em ES6.

### Exemplos

Interceptando todas as requisições que contenham yahoo no domínio e direcionando para o google:
```sh
import { InterceptRequestsJS } from 'intercept-requests-js';

InterceptRequestsJS(
    [
        {
            listening : 'yahoo',
            ignore : [],
            redirect : {
              to : 'www.google.com',
              concat : false,
            }
        }
    ]
)

```

## 🤔 Como contribuir

- Faça um fork desse repositório
- Cria uma branch com a sua feature: `git checkout -b minha-feature`
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
- Faça push para a sua branch: `git push origin minha-feature`

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Este projeto está em constante evolução e refatoração, mande também a sua contribuição.
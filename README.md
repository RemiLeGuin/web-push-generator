# Web Push Generator

## Introduction

This project is part of a technical proof of concept of a [Progressive Web App (PWA)](https://web.dev/what-are-pwas/ "Progressive Web App (PWA)") made with the [Lightning Web Component Open Source (LWC OSS)](https://developer.salesforce.com/blogs/2019/05/introducing-lightning-web-components-open-source.html "Lightning Web Component Open Source (LWC OSS)") framework. Its purpose is to:
- Test the LWC OSS framework as a Progressive Web App, a web application that can be installed on desktop computers and mobile devices like Apple/Google store applications.
- Get and update data from the [Salesforce platform](https://www.salesforce.com/products/what-is-salesforce/ "Salesforce platform") in a secure way ([JWT authentication](https://jwt.io/introduction "JWT authentication")).
- Emit web push notifications from the Salesforce platform when a data has been updated.
- Use the [Lightning base components and the SLDS stylesheet](https://developer.salesforce.com/blogs/2020/12/build-connected-apps-anywhere-using-lightning-base-components.html "Lightning base components and the SLDS stylesheet") on front end.

This repository is just a minimalist Node.js project exposing a @post webservice to receive instructions to send web push notifications using the [web-push npm package](https://www.npmjs.com/package/web-push "web-push npm package").

## The applications

Three applications interacts with each others to run the Record Shop:
- [Record Shop (Heroku)](https://github.com/RemiLeGuin/record-shop-heroku "Record Shop (Heroku)"): front-end application, hosted on [Heroku](https://www.heroku.com/platform "Heroku").
- [Record Shop (Salesforce)](https://github.com/RemiLeGuin/record-shop-salesforce "Record Shop (Salesforce)"): back-end application, hosts the data about records and triggers the notifications emission using the web-push-generator.
- [Web Push Generator](https://github.com/RemiLeGuin/web-push-generator "Web Push Generator"): [Node.js](https://nodejs.org/en/about/ "Node.js") utility application using the [web-push npm package](https://www.npmjs.com/package/web-push "web-push npm package") to send notifications to subscribed users.
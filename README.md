<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 실행환경

* macOS Monterey 12.3
* MacBook Pro (16-inch, 2021)
* Apple M1 Pro
* Memory 16GB
* NodeJS 버전 16.13.1

## 사전준비

[Docker Desktop](https://www.docker.com/products/docker-desktop/)을 설치해주세요.

## 실행방법

```bash
# npm package를 설치해주세요.
$ npm install
# scripts 디렉토리로 이동
$ cd scripts
# mariaDB를 docker-compose로 설치합니다.
# 3306 PORT를 사용합니다.
$ ./rundb.sh
# 정상적으로 실행되었는지 확인합니다.
$ docker ps -a
# 실행이 실패했다면, ./rundb.sh을 다시 실행해주세요.
$ ./rundb.sh
# 필요한 db 테이블을 생성합니다.
$ ./createdb.sh
# 원래 디렉토리로 돌아갑니다.
$ cd ..
# e2e test를 돌려보아요.
$ npm run test:e2e
```

## API 서버 실행하기

> DB 접속 설정을 위한 .env 파일내용입니다.  
> 설정 변경이 필요한 경우, .env 내용을 변경해주세요.

```
$ cat .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=todo_dev
DB_USERNAME=root
DB_PASSWORD=ajdajdsiasia
```


> 서버를 실행합니다.

```bash
# watch mode
$ npm run start:dev
```

> API 서버가 정상적으로 실행되면,  
> todo-front 를 실행합니다.
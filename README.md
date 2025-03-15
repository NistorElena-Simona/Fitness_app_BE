<<<<<<< HEAD
# Fitness_app_BE
BE
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```
Create .env file in root and put following variables(make sure all fields that begin with "your..." are completed with requested data):

```bash
BASE_URL="http://localhost:${PORT}"
PORT=3000

DB_USER=admin
DB_PASSWORD=admin
DB_NAME=nestjs_db
DB_PORT=5432
PG_VOLUME=postgres_data
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"

GOOGLE_CLIENT_ID= your google id (SEE LAST SECTION OF THIS README)
GOOGLE_CLIENT_SECRET= your google secret
GOOGLE_CALLBACK_URL="${BASE_URL}/auth/google/callback"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER= your email
SMTP_PASS= your smtp pass (get pass from https://myaccount.google.com/apppasswords)
SMTP_FROM="Your App <your email>"
JWT_SECRET="secret"
```
 Run docker container

```bash
$ docker-compose up
```

Migrate prisma db

```bash
$ npx prisma migrate dev
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Complete auth module

Complete authentication module
Technology stack
•	Backend: NestJS (Node.js framework)
•	Database: PostgreSQL (via Prisma ORM)
•	Authentication: JWT (JSON Web Token) & Passport.js
•	Authorization: Role-based access control (RBAC)
•	Security: Bcrypt for password hashing, Guards for request validation
 API Flow
-Authentication
1.	User logs in → auth/login (or with google)
2.	Server validates credentials using LocalAuthGuard
3.	If valid, JWT is issued
4.	JWT is stored on the client (frontend or mobile)
5.	User can refresh token → auth/refresh
6.	User can request password reset → auth/request-password-reset
7.	User resets password → auth/reset-password
-User Management
1.	User registers → user/register
2.	Email verification is sent → user/verify-email
3.	Once verified, user can log in
4.	User details can be fetched (if implemented)
-Admin Operations
1.	Admin can add/remove roles → admin/add-role/:userId
2.	Admin can delete users → admin/delete-user/:userId
3.	Admin can activate/deactivate users → admin/activate-user/:userId


# Login
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "yourUsername", "password": "yourPassword"}'

# Refresh Token
curl -X POST http://localhost:3000/auth/refresh \
     -H "Content-Type: application/json" \
     -d '{"refreshToken": "yourRefreshToken"}'

# Request Password Reset
curl -X POST http://localhost:3000/auth/request-password-reset \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com"}'

# Reset Password
curl -X POST http://localhost:3000/auth/reset-password \
     -H "Content-Type: application/json" \
     -d '{"token": "resetToken", "newPassword": "yourNewPassword"}'

# Logout
curl -X POST http://localhost:3000/auth/logout \
     -H "Content-Type: application/json" \
     -d '{"refreshToken": "yourRefreshToken"}'


# Register a new user(first user registred in db will be admin)
curl -X POST http://localhost:3000/user/register \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "yourPassword", "name": "Your Name"}'

# Verify Email
curl -X GET http://localhost:3000/user/verify-email?token=yourVerificationToken

# Login with google
http://localhost:3000/auth/google

# Add Role to User
curl -X PATCH http://localhost:3000/admin/add-role/{userId} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer yourAccessToken" \
     -d '{"role": "ADMIN"}'

# Remove Role from User
curl -X DELETE http://localhost:3000/admin/remove-role/{userId} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer yourAccessToken" \
     -d '{"role": "USER"}'

# Delete User
curl -X DELETE http://localhost:3000/admin/delete-user/{userId} \
     -H "Authorization: Bearer yourAccessToken"

# Activate User
curl -X PUT http://localhost:3000/admin/activate-user/{userId} \
     -H "Authorization: Bearer yourAccessToken"

# Deactivate User
curl -X PUT http://localhost:3000/admin/deactivate-user/{userId} \
     -H "Authorization: Bearer yourAccessToken"

## Get Google ID (for login/register with google)
Go to the Google Developer Console: https://console.cloud.google.com
Create a new project (or use an existing one).
In the "Credentials" tab, click "Create Credentials" and select "OAuth 2.0 Client IDs".
Set up the OAuth consent screen and configure the credentials (client ID and secret).
Ensure you configure the Authorized redirect URIs. For example redirect URI for this app is http://localhost:3000/auth/google/callback


>>>>>>> dd98b29 (readme)

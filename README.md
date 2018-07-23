# udemy-nodejs
This repository demonstrates what I learnt from the Udemy - The Complete Nodejs Developer Course - 2

In order for the project to work, add following code to `server/config/config.json`:

```
{
    "development": {
        "PORT": 3000,
        "MONGODB_URI": "mongodb://<server>:<port>/<db-name>",
        "JWT_SECRET": "<random-salt>"
    },
    "test": {
        "PORT": 3000,
        "MONGODB_URI": "mongodb://<server>:<port>/<test-db-name>",
        "JWT_SECRET": "<random-salt>"
    }
}
```
Also, don't forget to setup `MONGODB_URI` and `JWT_SECRET` on your heroku app as well!😉
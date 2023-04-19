# React-Query-Tutorial written as a quick guide to React Query

> We will be building an app to store users Posts by Title, and since our focus will be to understanding on how to work with React Query, we'll use a [fake REST API](https://www.npmjs.com/package/json-server) 

## Clone the Repo
```bash
git clone git@github.com:muriukialex/React-Query-Tutorial.git
```

### Install the dependencies
```bash
npm install
```

### Install [json-server](https://www.npmjs.com/package/json-server) which will work as our fake REST API
```
npm install -g json-server
```

#### After installing the JSON-server, create a db.json file with some data
```json
{
  "posts": [
    { "id": 1, "title": "json-server"}
  ]
}
```
#### then, start JSON Server
```bash
json-server --watch db.json
```

### After the fake REST api server is up and running, start your frontend server
```
npm run dev
```

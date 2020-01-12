# On Railway Tracker

Check whether you are on a railway or not

## Running

- Clone the source and run below commands. You need to have NodeJS 10+ version and NPM installed in your system.
- .env file should be updated prior to start the service.

```bash
npm install
npm start
```

## HTTP API

You can use the service by calling the HTTP API as mentioned below.

```bash
curl -X POST \
  http://localhost:8080/check \
  -H 'Content-Type: application/json' \
  -d '{
    "lon": 81.048298,
    "lat": 6.879066,
    "distance": 50
}'
```

Response

```json
{
    "inside": true
}
```

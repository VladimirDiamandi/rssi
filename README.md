# RSSI api

## Install manual:

- `npm i`
- `cp .env.example .env`
- set env values in the .env file
  - MONGO_URL => database connection url
  - ALERT_URL => http url to push alerts where
  - MIN_VALUE => minimum value to be sure device is connected (usually = -90)
- fill collection `devices` with some values (name, zone)
- `npm run start`

## Send RSSI info
endpoint: `/push/signal`
method: `POST`
payload: { deviceId, rssiLevel }

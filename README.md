# Getting started with Shift Service
Backend service of this repo (https://github.com/tanjungtech/shift-client). Do npm install and run the script using npm run dev (running on port 8321). Use .env to edit environment variable.

## App Architecture
This service consists of four main directories: controllers, models, routes, and utils.

/controllers is a request handler. It process the request, query the database, and send the response.
/models consists of database handler for mongoose. It has schedule and account collection.
/routes manages routes established by the sistem.
/utils is a function used to manipulate data in order to get a specific result (like validation and error handler).

## Routes

### `get(/account/all)`
Retrieve account information from the database. no parameter. It retrieves all accounts.

### `post(/schedule/all)`
Create a new shift. Must provide account_id and data of schedules (start_time, end_time). data is array to handle publishing shift.

### `get(/schedule/all)`
Retrieve shift by query parameter. Accepted queries for this route are 'start', 'account_id', and 'shift_type' (publish or general). Query 'start' will search for schedules listed for the next 7 days (start 00:00 to start+7days 23:59). account_id will filter the search result by account. 

### `put(/schedule/all)`
Update and delete a shift. Must provide the schedule _id, start_time, and end_time to update the schedule. This service implement soft delete so it won't remove the data from schedule collection. To use delete method, put 'deleted_on' value in req.body (equal to true). It will set deleted_on value (using new Date().getTime()) and the shift will not be retrived by request using get('schedule/all').


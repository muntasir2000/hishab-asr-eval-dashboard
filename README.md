Clone the repo and run the following command

```
cd app && yarn install
./build.sh
```


Node.js v14.21.4 is required for this project. Steps to run the application:

  ```
  $ cd programs/server && npm install
  $ export MONGO_URL='mongodb://user:password@host:port/databasename'
  $ export ROOT_URL='http://YOURSITE.com'
  $ export PORT=3000
  $ node main.js
  ```

Use the PORT environment variable to set the port where the
application will listen. The default is 80, but that will require
root on most systems.

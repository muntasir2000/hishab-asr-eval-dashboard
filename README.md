Clone the repo and run the following command

```
cd app && yarn install
./build.sh
```

First command will install the application dependencies. Running the second script will create a tarball of the applcation as app.tar.gz. 

Now, extract the tarball and follow the next steps.

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


You can run the application in development mode by running the following command.

```
./start.sh
```

While running on development mode meteor will spin up it's own mongo and it will listen to your application_port + 1. For example, if your applicaiton is running at port 3000 then the mongo will run at port 3001.

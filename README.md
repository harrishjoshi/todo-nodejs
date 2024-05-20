# Todo App

A simple todo application built using Node.js, Express, Mongoose, and EJS.

## Dependencies

- dotenv
- ejs
- express
- mongoose

### Create docker network:

<pre>
docker network create mongo-network
</pre>

### Run MongoDB:

<pre>
docker run -d \
--network mongo-network \
--name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=username \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-p 27017:27017 \
mongo
</pre>

### Check MongoDB Logs:

<pre>
docker logs mongodb
</pre>

### Run Mongo-Express:

<pre>
docker run -d \
--network mongo-network \
--name mongo-express \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=username \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_ENABLE_ADMIN=true \
-e ME_CONFIG_BASICAUTH_USERNAME=adminuser \
-e ME_CONFIG_BASICAUTH_PASSWORD=adminpass \
-p 8081:8081 \
mongo-express
</pre>

### Check Mongo-Express Logs:

<pre>
docker logs mongo-express
</pre>

### Ping MongoDB from Mongo-Express:

<pre>
docker exec -it mongo-express ping mongodb
</pre>

### Inspect network:

<pre>
docker network inspect mongo-network
</pre>

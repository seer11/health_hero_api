const { MongoClient } = require("mongodb");

let uri =
  (process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017"
    : process.env.ATLAS_CLUSTER_ADDRESS) ||
  "mongodb+srv://health_hero_admin:Damalkor123@cluster0.p40cr.mongodb.net/health_hero?retryWrites=true&w=majority";
/* istanbul ignore if */
if (process.env.TEST_SERVER === "no_spawn") {
  uri = "mongodb://localhost:27017";
}
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  poolSize: 3,
  keepAlive: process.env.NODE_ENV !== "development",
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
});

const remotedb =
  (process.env.NODE_ENV === "test" && "test") || process.env.CLUSTER_REMOTE_DB;

let connection = false;

const connect = async () => {
  try {
    if (connection && client.isConnected()) {
      return connection;
    } else {
      connection = await client.connect();
      return connection;
    }
  } catch (e) {
    return e;
  }
};

const getDb = async (database) => {
  database = database || remotedb;
  try {
    const c = await connect();
    if (c instanceof Error) {
      const { syscall, code, name, MongoNetworkError } = c;
      if (syscall && code) {
        c.message = `${syscall} ${code} Atlas DB`;
      } else if (name && MongoNetworkError) {
        c.message = `${name} : ${MongoNetworkError}`;
      } else {
        c.message = "Failed to connect to Atlas.";
      }
      return c;
    } else {
      return c.db(database);
    }
  } catch (e) {
    return e;
  }
};

module.exports = {
  client,
  remotedb,
  connect,
  getDb,
};

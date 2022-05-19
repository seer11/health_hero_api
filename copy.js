const { MongoClient } = require("mongodb");
const fs = require("fs");
// const { uuid } = require('./utils/convertHelper')

const alternateDb = process.argv[2] || "";

const config = {
  PKU_DB_READ: "MOCK_DATA",
  PKU_DB_WRITE: alternateDb.length ? alternateDb : "mongodb://localhost:27017",
};

const ignoreSchema = [];

const clientdb = "health_hero";

const path = require("path");

const clientWrite = new MongoClient(config.PKU_DB_WRITE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// insert new data to database
const update = async () => {
  await clientWrite.connect();

  // reset db local only
  // !alternateDb && await clientWrite.db(clientdb).dropDatabase()

  const mockFolders = fs.readdirSync(path.resolve(__dirname, "./MOCK_DATA"));

  let allFiles = [];
  const DATA_TREE = [];

  (mockFolders || []).forEach((folder) => {
    if (ignoreSchema.includes(folder)) {
      return null;
    }
    if (folder.match(".json")) {
      const data = fs.readFileSync(
        path.resolve(__dirname, `./MOCK_DATA/${folder}`),
        "utf8"
      );

      folder = folder.slice(0, -5);
      DATA_TREE.push({
        doc: folder,
        data,
      });
    } else {
      const files = fs.readdirSync(
        path.resolve(__dirname, `./MOCK_DATA/${folder}`)
      );
      allFiles = allFiles.concat(
        files.map((file) => {
          return {
            folder,
            file,
          };
        })
      );
    }
  });

  allFiles.map(async ({ folder, file }) => {
    const filePath = `${folder}/${file}`;
    const data = fs.readFileSync(
      path.resolve(__dirname, `./MOCK_DATA/${filePath}`),
      "utf8"
    );

    file = file.slice(0, -5);

    DATA_TREE.push({
      doc: `${folder}${file.replace(/^\w/, (c) => c.toUpperCase())}`,
      data,
    });
  });

  // only reset collection that related, ignore the one user added
  async function clean({ doc }) {
    const w = await clientWrite.db(clientdb).collection(doc).deleteMany({});
    return w;
  }

  async function write({ doc, data }) {
    let pdata;
    try {
      pdata = JSON.parse(data);
    } catch (e) {
      console.log(`FAILED to parse file: ${doc}`);
      return {};
    }
    const w = await clientWrite.db(clientdb).collection(doc).insertMany(pdata);
    return w;
  }

  await Promise.all(DATA_TREE.map(clean));

  await Promise.all(DATA_TREE.map(write)).then((r) => {
    console.log(
      `Finish updating ${alternateDb.length ? "remote" : "local"} mongodb`
    );
    clientWrite.close();
  });
};

// run
update();

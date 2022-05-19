// const { getSchema } = require("./queryParse");
const { schemaExist } = require("./validation");

const exist = schemaExist("game", "GET");
console.log("exist==>", exist);

// const validate = schemaValidate("game", "GET");
// console.log("validate==>", validate);

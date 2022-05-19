const { readFileSync, readFile } = require("fs");
const Validator = require("jsonschema").Validator;

// validate uuid
Validator.prototype.customFormats.uuidFormat = function (uuid) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    uuid
  );
};

// validate date
Validator.prototype.customFormats.dateFormat = function (date) {
  const timestamp = Date.parse(date);
  if (!date) return false;
  return !isNaN(timestamp) && new Date(date).toString() !== "Invalid Date";
};

Validator.prototype.customFormats.timestampFormat = function (timestamp) {
  if (!timestamp) return false;
  return /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(
    timestamp
  );
};

Validator.prototype.customFormats.numeric19precision0 = function (num) {
  if (!num) return false;
  return !/\./.test(num.toString()) && num.toString().length <= 19;
};

Validator.prototype.customFormats.emailFormat = function (email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

Validator.prototype.customFormats.passwordFormat = function (password) {
  return /(?=[A-Za-z0-9\d][^[\]{}<>()'"]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/.test(
    password
  );
};

Validator.prototype.customFormats.postcodeFormat = function (postcode) {
  return postcode.toString().length === 6;
};

Validator.prototype.customFormats.allowMissingFieldFormat = function (value) {
  return missingField[value.collection].includes(value.key);
};

const schemaExist = async (collection, method) => {
  let buffer;
  try {
    buffer = readFileSync(`../SCHEMA_DATA/${collection}.json`);
  } catch (e) {
    return { err: true, message: `'${collection}' schema is not supported` };
  }

  return { err: false, message: "", buffer };
};

// new validation schema support can be added here
// some validation may have custom validation too!
const schemas = {
  uuid: { type: "string", format: "uuidFormat" },
  int: { type: "number" },
  email: { type: "string", format: "emailFormat" },
  password: { type: "string", format: "passwordFormat" },
  text: {
    type: "string",
    minLength: 1,
  },
  bool: { type: "boolean" },
  date: { type: "string", format: "dateFormat" },
  timestamp: { type: "string", format: "timestampFormat" },
  "numeric(19,0)": { type: "number", format: "numeric19precision0" },
  "bucket/img": { type: "string", format: "bucketResource" },
  "array/int": { type: "array", items: { type: "number" } },
  "array/text": { type: "array", items: { type: "string" } },
  object: { type: "object" },
  postcode: { type: "string", format: "postcodeFormat" },
  allowMissingField: { type: "object", format: "allowMissingFieldFormat" },
};

const v = new Validator();

module.exports = {
  schemaExist,
};

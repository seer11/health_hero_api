module.exports.poster = async (exited, headers, success, message, result) => {
  return [exited, headers, success, message, result, schemaValidateStack];
};

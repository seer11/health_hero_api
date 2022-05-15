module.exports.api = async (event) => {
  const success = false;
  const message = "response message";
  const result = {};

  if (httpMethod === "GET") {
    [success, message, result] = await get.getter(success, message, result);
  }

  if (httpMethod === "POST") {
    [success, message, result] = await get.getter(success, message, result);
  }
  return response.send({
    success,
    message,
    result,
  });
};

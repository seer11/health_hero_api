// const { getDb } = require("../Atlas");

// exports.getId = (longId = "") => {
//   const [id] = longId.toUpperCase().split("-");
//   return id;
// };

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

exports.uuid = (quote, run) => {
  let u = "";
  const m = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let i = 0;
  let rb = (Math.random() * 0xffffffff) | 0;
  while (i++ < 36) {
    const c = m[i - 1];
    const r = rb & 0xf;
    const v = c === "x" ? r : r & (0x3 | 0x8);
    u += c === "-" || c === "4" ? c : v.toString(16);
    rb = i % 8 === 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  if (run && run.length === 3) {
    run.split("").forEach((t, i) => {
      u = setCharAt(u, 20 + i, t);
    });
  }
  if (quote && quote.length === 12) {
    quote.split("").forEach((t, i) => {
      u = setCharAt(u, 24 + i, t);
    });
  }
  return u;
};

// const gen = (length, onlyNumber, onlyChar) => {
//   let result = "";
//   const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const characters = onlyNumber
//     ? str.slice(-10)
//     : onlyChar
//     ? str.slice(0, -10)
//     : str;
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

// exports.gen = gen;

// exports.cleanup = async (collection) => {
//   const db = await getDb();
//   if (db instanceof Error) {
//     return { success: false, message: db.message };
//   }
//   const clean = await db.collection(collection).deleteMany({
//     age: {
//       $lte: new Date().getTime(),
//     },
//   });

//   const success = clean.result && clean.result.ok;

//   return {
//     success: !!success,
//     message: `${success ? "success" : "failed"} clean up`,
//   };
// };

// exports.parseBody = (event) => {
//   let body;
//   try {
//     body = JSON.parse(event.body || "{}");
//   } catch (e) {
//     const buff = Buffer.from(event.body, "base64"); // decode the body
//     try {
//       body = JSON.parse(buff.toString("ascii"));
//     } catch (e) {
//       body = {}; // if failed too just assign empty object
//     }
//   }
//   return body;
// };

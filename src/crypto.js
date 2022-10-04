// require("dotenv").config();

// export default encrypt = (id) => {
//     id = id.toString();
//     const iv = crypto.randomBytes(16);

//     const cipher = crypto.createCipheriv(process.env.REACT_APP_ALGORITHM, process.env.REACT_APP_SECRET_KEY, iv);
//     const encrypted = Buffer.concat([cipher.update(id), cipher.final()]);

//     let hash = `${iv.toString("hex")}-${encrypted.toString("hex")}`;
//     return hash;
// };

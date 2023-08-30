const { getFileStream } = require("../utils/s3");

const getFilesByKey = (req, res) => {
    console.log(req.params);
    const key = req.params.key;
    if(!key || key === 'null' || key === null || key === undefined || key === 'undefined'){
      return;
    }
    try {
      const readStream = getFileStream(key);
      readStream.pipe(res);
    } catch (error) {
      console.log(error);
    }
}


module.exports = {
    getFilesByKey,
}
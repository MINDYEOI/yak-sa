const express = require('express');
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const router = express.Router();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // 어느 폴더에 저장할건지
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname) // 이미지 이름
    }
  })
   
  var upload = multer({ storage: storage })

router.post('/image', (req, res) => {

    // 클라이언트로부터 받은 이미지 저장
    upload(req, res, err => {
        if (err) return req.json({ success: false, err })
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})   
    }
    )

})

module.exports = router;

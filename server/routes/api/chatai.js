const express = require("express");
const router = express.Router();
const chatai = require("../../utils/chatai");

router.post("/message", async (req, res) => {
  if (!req.query.msg) {
    res.send({
      msg: "You need to provide a message",
    });
    return;
  }

  try {
    const data = await chatai.sendMessage(req.query.msg);
    res.send(data);
    return data;
  } catch {
    res.send({
      msg: "We couldn't send the data",
    });
    return null;
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostModel, PostsModel } = require("../models/postModel");

router.get("/", (req, res) => {
    PostsModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(`Error => ${err}`);
        }
    })
})

router.get("/:id", (req, res) => {

})

router.post("/", (req, res) => {
    const post = new PostsModel({
        'author': req.body.author,
        'message': req.body.message,
    });

    post.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log(`Error => ${err}`);
    })
})

router.put("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknow : ${req.params.id}`)

    const post = {
        author: req.body.author,
        message: req.body.message
    }

    PostsModel.findOneAndUpdate(
        req.params.id, { $set: post }, { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error");
        }
    )
})

router.delete("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknow : ${req.params.id}`)

    PostsModel.findOneAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log("Delete error");
        }
    )
})

module.exports = router;
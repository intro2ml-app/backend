import express from "express";
import ModelModel from "../../models/Model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const models = await ModelModel.find();
    res.json(models).status(200);
});

router.get("/:id", async (req, res) => {
    const model = await ModelModel.find({ _id: req.params.id });
    if (!model) res.send("Not found").status(404);
    else res.json(model).status(200);
});

router.post("/", async (req, res) => {
    try {
        const newModel = new ModelModel({
            model_name: req.body.model_name,
            description: req.body.description,
        });
        const model = await newModel.save();
        res.json(model).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const updates = {
            $set: {
                model_name: req.body.model_name,
                description: req.body.description,
            },
        };

        const model = await ModelModel.updateOne(query, updates);
        res.json(model).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const model = await ModelModel.deleteOne(query);
        res.json(model).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;
import express from "express";
import ModelModel from "../../models/Model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const models = await ModelModel.find();
        res.json(models).status(200);
    } catch (err) {
        console.error("Error getting models");
        res.status(500).send("Error getting models");
    }
});

router.post("/", async (req, res) => {
    try {
        const newModel = new ModelModel({
            model_name: req.body.model_name,
            service: req.body.service,
            input_limit: req.body.input_limit,
            output_limit: req.body.output_limit,
            best_for: req.body.best_for,
            use_case: req.body.use_case,
            knowledge_cutoff: req.body.knowledge_cutoff,
            rate_limit: req.body.rate_limit,
        });
        const model = await newModel.save();
        res.json(model).status(201);
    } catch (err) {
        console.error("Error adding model");
        res.status(500).send("Error adding model");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const updates = {
            $set: {
                model_name: req.body.model_name,
                service: req.body.service,
                input_limit: req.body.input_limit,
                output_limit: req.body.output_limit,
                best_for: req.body.best_for,
                use_case: req.body.use_case,
                knowledge_cutoff: req.body.knowledge_cutoff,
                rate_limit: req.body.rate_limit,
            },
        };

        const model = await ModelModel.updateOne(query, updates);
        res.json(model).status(200);
    } catch (err) {
        console.error("Error updating model");
        res.status(500).send("Error updating model");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const model = await ModelModel.deleteOne(query);
        res.json(model).status(200);
    } catch (err) {
        console.error("Error deleting model");
        res.status(500).send("Error deleting model");
    }
});

export default router;
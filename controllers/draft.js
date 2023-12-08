const DraftModel = require('../models/draft');
const draftsService = require('../services/draft');
const ArticleModel = require('../models/article');

exports.getDrafts = async (req,res)=>{
    try{
        const drafts = await draftsService.findAllDrafts();
        res.send({drafts});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};

exports.postDraft = async (req,res)=>{
    console.log(req.body);
    const draftInfo={
        name: req.body.name,
        artical: req.body.artical,
        date: req.body.date,
        image: req.body.image,
        articalType: req.body.articalType,
        publisherId: req.body.publisherId
    };
    try{
        const createdDraft = await draftsService.addNewDraft(draftInfo);
        return res.status(201).send({
            msg: 'Draft created successfully',
            draftId: createdDraft._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    };
}

exports.getDrafts = async (req, res) => {
    try {
        const publisherId = req.query.publisherId;
        const drafts = await draftsService.findAllDrafts(publisherId);
        res.send({ drafts });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
};

exports.updateDraft = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const body = req.body;

            const updatedDraft = await DraftModel.findOneAndUpdate({ _id: id }, body, { new: true });

            if (updatedDraft) {
                await DraftModel.deleteOne({ _id: id });
                const productInfo = {
                    name: updatedDraft.name,
                    artical: updatedDraft.artical,
                    date: updatedDraft.date,
                    image: updatedDraft.image,
                    articalType: updatedDraft.articalType,
                    publisherId: updatedDraft.publisherId
                };

                const createdProduct = await ArticleModel.create(productInfo);

                return res.status(201).send({
                    msg: "Record updated and moved to products",
                    productId: createdProduct._id
                });
            } else {
                return res.status(404).send({ error: "Draft not found" });
            }
        } else {
            return res.status(401).send({ error: "User not Found...!" });
        }

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
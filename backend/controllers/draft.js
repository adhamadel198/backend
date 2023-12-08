const DraftModel = require('../models/draft');
const draftsService = require('../services/draft');

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

exports.updateDraft= async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const body = req.body;

            DraftModel.updateOne({ _id: id }, body, function(err, data) {
                if (err) throw err;
                return res.status(201).send({ msg: "Record updated" });
            });
        } else {
            return res.status(401).send({ error: "User not Found...!" });
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
};
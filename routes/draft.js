const { Router } = require('express');
const draftsController = require('../controllers/draft'); 

const draftsRouter = Router();

draftsRouter.get('/', draftsController.getDrafts);
draftsRouter.post('/', draftsController.postDraft);
draftsRouter.get('/:draftId', draftsController.getDrafts);

draftsRouter.route("/updateDraft").put(draftsController.updateDraft);


module.exports = draftsRouter;
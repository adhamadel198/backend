const {Router}= require('express');
const publishersController= require('../controllers/publisher');
const publishersRouter = Router();
publishersRouter.get('/',publishersController.getpublishers);
module.exports= publishersRouter;
publishersRouter.post('/',publishersController.postPublisher);
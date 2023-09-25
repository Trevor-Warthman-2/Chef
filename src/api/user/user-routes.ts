import express from 'express';
import favoriteRecipeRoutes from './user-meta-data/favorite-recipes';

const router = express.Router();

router.use('/', favoriteRecipeRoutes);

export = router;


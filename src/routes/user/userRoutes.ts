import express from 'express';
import favoriteRecipeRoutes from './userMetaData/favoriteRecipes';

const router = express.Router();

router.use('/', favoriteRecipeRoutes);

export = router;


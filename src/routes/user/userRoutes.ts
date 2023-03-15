import express from 'express';
import favoriteVariantRoutes from './userMetaData/favoriteVariants';

const router = express.Router();

router.use('/', favoriteVariantRoutes);

export = router;


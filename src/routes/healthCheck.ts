import express from 'express';

const router = express.Router();
/**
 * @swagger
 * /and-his-name-is:
 *   get:
 *     description: Are you ready?
 *     responses:
 *       200:
 *         description: to see him this Sunday Night?!
 */
router.get('/', (req, res) => {
  const data = {
    message: 'JOHN CENA!!!',
    uptime: process.uptime(),
    date: new Date()
  }

  res.status(200).send(data);
});
export = router;

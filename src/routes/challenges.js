const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/challengeController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

router.post('/', auth, [
  body('title').isLength({ min: 3 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  ctrl.create(req, res, next);
});

router.put('/:id', auth, (req, res, next) => {
  ctrl.update(req, res, next);
});

router.delete('/:id', auth, (req, res, next) => {
  ctrl.remove(req, res, next);
});

module.exports = router;

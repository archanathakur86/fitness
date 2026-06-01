const Challenge = require('../models/Challenge');

exports.list = async (req, res, next) => {
  try {
    const { sortBy = 'createdAt', order = 'desc', title } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    const challenges = await Challenge.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 }).populate('owner', 'name email');
    res.json({ data: challenges });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const ch = await Challenge.findById(req.params.id).populate('owner', 'name email');
    if (!ch) return res.status(404).json({ message: 'Challenge not found' });
    res.json({ data: ch });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const payload = { ...req.body, owner: req.user.id };
    const ch = await Challenge.create(payload);
    res.status(201).json({ data: ch });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const ch = await Challenge.findById(req.params.id);
    if (!ch) return res.status(404).json({ message: 'Challenge not found' });
    if (String(ch.owner) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(ch, req.body);
    await ch.save();
    res.json({ data: ch });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const ch = await Challenge.findById(req.params.id);
    if (!ch) return res.status(404).json({ message: 'Challenge not found' });
    if (String(ch.owner) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await ch.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

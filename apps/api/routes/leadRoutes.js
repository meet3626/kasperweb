const express = require('express');
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');
const router = express.Router();

router.route('/')
  .post(createLead)
  .get(getLeads);

router.route('/:id')
  .put(updateLeadStatus)
  .delete(deleteLead);

module.exports = router;

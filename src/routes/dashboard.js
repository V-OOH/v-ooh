const express = require("express");
const router  = express.Router();
const { buscarDashboardZonas } = require("../controllers/dashboardController");

// GET /dashboard/zonas/:idEmpresa
router.get("/zonas/:idEmpresa", buscarDashboardZonas);

module.exports = router;

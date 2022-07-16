// Imports ---------------------------------------
import { Router } from 'express';
import { tableOfModules } from '../data/tableOfModules.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// List all records
router.get('/', (req, res) => {
  // Validate request
  // Access data model
  // Response to request
  res.json(tableOfModules);
});

// Read specific record
router.get('/:id', (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id));
  if (!module) return res.status(404).json({ Messsage: `Record ${req.params.id} not found`});
  // Response to request
  res.json(module);
});

// Create record
router.post('/', (req, res) => {
  // Validate request
  // Access data model
  const newModule = { ...req.body, "ModuleID": tableOfModules.reduce((maxval,current) => Math.max(maxval,current)) + 1 };
  tableOfModules.push(newModule);
  // Response to request
  res.json(newModule);
});

// Update specific record
router.put('/:id', (req, res) => {
  // Validate request
  // Access data model
  const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id));
  if (!module) return res.status(404).json({ Messsage: `Record ${req.params.id} not found` });
  ["ModuleName", "ModuleCode", "ModuleLevel", "ModuleLeaderID", "ModuleImageURL"].map((key) => {
    module[key] = req.body[key] || module[key]
  });
  // Response to request
  res.json(module);
});

// Delete specific record
router.delete('/:id', (req, res) => {
  // Validate request
  // Access data model
  const arrayIndex = tableOfModules.findIndex((module) => module.ModuleID === parseInt(req.params.id));
  if (arrayIndex < 0) return res.status(404).json({ Messsage: `Record ${req.params.id} not found` });
  tableOfModules.splice(arrayIndex,1);
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` });
});

export default router;

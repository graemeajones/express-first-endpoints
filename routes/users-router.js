// Imports ---------------------------------------
import { Router } from 'express';
import { tableOfUsers } from '../data/tableOfUsers.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// List all records
router.get('/', (req, res) => {
  // Validate request
  // Access data model
  // Response to request
  res.json(tableOfUsers);
});

// Read specific record
router.get('/:id', (req, res) => {
  // Validate request
  // Access data model
  const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: `Record ${req.params.id} not found`});
  // Response to request
  res.json(user);
});

// Create record
router.post('/', (req, res) => {
  // Validate request
  // Access data model
  const newUser = { ...req.body, "UserID": tableOfUsers.reduce((max, curr) => curr.UserID > max.UserID ? curr : max).UserID + 1 };
  tableOfUsers.push(newUser);
  // Response to request
  res.json(newUser);
});

// Update specific record
router.put('/:id', (req, res) => {
  // Validate request
  // Access data model
  const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: `Record ${req.params.id} not found` });
  ["UserFirstname", "UserLastname", "UserEmail", "UserPassword", "UserRegistered", "UserUsertypeID", "UserLevel", "UserImageURL"].map((key) => {
    user[key] = req.body[key] || user[key]
  });
  // Response to request
  res.json(user);
});

// Delete specific record
router.delete('/:id', (req, res) => {
  // Validate request
  // Access data model
  const index = tableOfUsers.findIndex((user) => user.UserID === parseInt(req.params.id));
  if (index < 0) return res.status(404).json({ message: `Record ${req.params.id} not found` });
  tableOfUsers.splice(index,1);
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` });
});

export default router;

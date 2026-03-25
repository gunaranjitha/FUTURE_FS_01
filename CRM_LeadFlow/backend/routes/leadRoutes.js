const express = require("express");
const router = express.Router();

let leads = [];

// ✅ CREATE
router.post("/", (req, res) => {
  const newLead = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    source: req.body.source || "",
    status: req.body.status || "New",
    notes: req.body.notes || ""
  };

  leads.push(newLead);
  res.json(newLead);
});

// ✅ READ
router.get("/", (req, res) => {
  res.json(leads);
});

// ✅ UPDATE (IMPORTANT FIX)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let updatedLead;

  leads = leads.map((lead) => {
    if (lead.id === id) {
      updatedLead = { ...lead, ...req.body };
      return updatedLead;
    }
    return lead;
  });

  res.json(updatedLead);
});

// ✅ DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  leads = leads.filter((lead) => lead.id !== id);

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
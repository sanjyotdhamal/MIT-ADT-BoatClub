const express = require("express");
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");
const router = express.Router();

// ─── Public: Submit a Join Request ───────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      aadharNo,
      nsrsId,
      rfId,
      birthCertificate,
      domicile,
      department,
      year,
      enrolment_no,
      experience,
      reason,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and Phone Number are required!" });
    }

    if (!birthCertificate) {
      return res.status(400).json({ message: "Birth Certificate is required!" });
    }

    const reg = new Registration({
      name,
      email,
      phone,
      age: age ? Number(age) : undefined,
      aadharNo,
      nsrsId,
      rfId,
      birthCertificate,
      domicile,
      department,
      year,
      enrolment_no,
      experience,
      reason,
    });

    await reg.save();
    res.status(201).json(reg);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error. Could not submit registration.", error: err.message });
  }
});

// ─── Admin Only: Get All Registrations ───────────────────────────────────────
router.get("/", auth, async (req, res) => {
  try {
    const list = await Registration.find().sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    console.error("Fetch registrations error:", err);
    res.status(500).json({ message: "Server error. Could not retrieve registrations.", error: err.message });
  }
});

// ─── Admin Only: Delete a Registration ───────────────────────────────────────
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Registration not found!" });
    }
    res.json({ message: "Registration deleted successfully!" });
  } catch (err) {
    console.error("Delete registration error:", err);
    res.status(500).json({ message: "Server error. Could not delete registration.", error: err.message });
  }
});

module.exports = router;

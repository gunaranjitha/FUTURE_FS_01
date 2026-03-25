import React, { useState } from "react";

function LeadForm({ addLead }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !source) return;
    addLead({ name, email, source, status: "New", notes: "" });
    setName(""); setEmail(""); setSource("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
      <button type="submit" style={{ backgroundColor: "#007bff", color: "white" }}>Add Lead</button>
    </form>
  );
}

export default LeadForm;
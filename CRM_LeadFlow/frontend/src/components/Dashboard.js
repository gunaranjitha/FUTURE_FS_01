import React from "react";

function Dashboard({ leads }) {
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const contacted = leads.filter(l => l.status === "Contacted").length;
  const converted = leads.filter(l => l.status === "Converted").length;

  return (
    <div className="dashboard">
      <div className="card stat">Total Leads: {total}</div>
      <div className="card stat">New: {newLeads}</div>
      <div className="card stat">Contacted: {contacted}</div>
      <div className="card stat">Converted: {converted}</div>
    </div>
  );
}

export default Dashboard;
import React, { useState, useEffect } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [view, setView] = useState("crm"); // crm / dashboard
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const fetchLeads = async () => {
    const res = await fetch("http://localhost:5000/api/leads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (lead) => {
    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
    fetchLeads();
  };

  const updateLead = async (id, updatedLead) => {
    await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead)
    });
    fetchLeads();
  };

  const updateStatus = (id, status) => {
    const lead = leads.find(l => l.id === id);
    if (lead) updateLead(id, { ...lead, status });
  };

  const updateNote = (id, note) => {
    const lead = leads.find(l => l.id === id);
    if (lead) updateLead(id, { ...lead, notes: note });
  };

  const deleteLead = async (id) => {
    await fetch(`http://localhost:5000/api/leads/${id}`, {
      method: "DELETE"
    });
    fetchLeads();
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || lead.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h1>Mini CRM</h1>

      {/* 🔥 TOP CONTROLS */}
      <div className="topbar">
        <button onClick={() => setView("crm")}>CRM</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>

      {view === "crm" ? (
        <>
          <div className="toolbar">
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>
          </div>

          <LeadForm addLead={addLead} />

          <LeadList
            leads={filteredLeads}
            updateStatus={updateStatus}
            updateNote={updateNote}
            updateLead={updateLead}
            deleteLead={deleteLead}
          />
        </>
      ) : (
        <Dashboard leads={leads} />
      )}
    </div>
  );
}

export default App;
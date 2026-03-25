import React, { useState } from "react";

function LeadItem({ lead, updateStatus, deleteLead, updateLead }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(lead.name);
  const [editEmail, setEditEmail] = useState(lead.email);
  const [editSource, setEditSource] = useState(lead.source || "");
  const [note, setNote] = useState(lead.notes || "");

  const saveNote = () => {
    updateLead(lead.id, { ...lead, notes: note });
  };

  const saveEdit = () => {
    updateLead(lead.id, {
      ...lead,
      name: editName,
      email: editEmail,
      source: editSource
    });
    setIsEditing(false);
  };

  return (
    <div className="card">
      
      {/* Name */}
      {isEditing ? (
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
      ) : (
        <h3>{lead.name}</h3>
      )}

      {/* Email */}
      {isEditing ? (
        <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
      ) : (
        <p>{lead.email}</p>
      )}

      {/* Source */}
      {isEditing ? (
        <input value={editSource} onChange={(e) => setEditSource(e.target.value)} />
      ) : (
        <p>
          <strong>Source:</strong>
          <span className="badge">{lead.source}</span>
        </p>
      )}

      {/* Status */}
      <select
        value={lead.status}
        onChange={(e) => updateStatus(lead.id, e.target.value)}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Converted</option>
      </select>

      {/* Notes */}
      <div className="note-section">
        <input
          value={note}
          placeholder="Add note"
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={saveNote}>Save</button>
      </div>

      {/* Buttons */}
      <div className="card-actions">
        <button className="delete" onClick={() => deleteLead(lead.id)}>
          Delete
        </button>

        {isEditing ? (
          <button className="save-btn" onClick={saveEdit}>
            Save
          </button>
        ) : (
          <button className="edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default LeadItem;
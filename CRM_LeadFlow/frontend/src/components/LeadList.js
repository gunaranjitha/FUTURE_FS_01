import React from "react";
import LeadItem from "./LeadItem";

function LeadList({ leads, updateStatus, deleteLead, updateNote, updateLead }) {
  return (
    <div>
      {leads.length === 0 ? (
        <p className="empty">No leads found 🚫</p>
      ) : (
        leads.map((lead) => (
          <LeadItem
            key={lead.id}
            lead={lead}
            updateStatus={updateStatus}
            deleteLead={deleteLead}
            updateNote={updateNote}
            updateLead={updateLead}
          />
        ))
      )}
    </div>
  );
}

export default LeadList;
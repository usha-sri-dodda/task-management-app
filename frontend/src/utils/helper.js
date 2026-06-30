// -----------------------------
// Format Date
// -----------------------------
export const formatDate = (date) => {

    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();

};


// -----------------------------
// Format Date & Time
// -----------------------------
export const formatDateTime = (date) => {

    if (!date) return "N/A";

    return new Date(date).toLocaleString();

};


// -----------------------------
// Capitalize First Letter
// -----------------------------
export const capitalize = (text) => {

    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

};


// -----------------------------
// Status Color
// -----------------------------
export const getStatusColor = (status) => {

    switch (status) {

        case "Completed":
            return "#16a34a";

        case "In Progress":
            return "#2563eb";

        default:
            return "#dc2626";

    }

};


// -----------------------------
// Priority Color
// -----------------------------
export const getPriorityColor = (priority) => {

    switch (priority) {

        case "High":
            return "#dc2626";

        case "Medium":
            return "#ca8a04";

        default:
            return "#16a34a";

    }

};
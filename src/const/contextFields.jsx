// This list of fields is used dynamically throughout various parts of the app.

export const contextFields = [
  { id: "checkedBy", name: "Checked by", type: "text", required: "false", category: "people" },
  { id: "enteredBy", name: "Entered by", type: "text", required: "false", category: "people" },
  { id: "recorder", name: "Recorder", type: "text", required: "false", category: "people" },
  { id: "excavator", name: "Excavator", type: "text", required: "false", category: "people" },
  { id: "site", name: "Site", type: "text", required: "false", category: "site" },
  { id: "siteArea", name: "Site area", type: "text", required: "false", category: "site" },
  { id: "excavatedOn", name: "Excavated on", type: "text", required: "false", category: "site" },
  { id: "excavationMethod", name: "Excavation method", type: "text", required: "false", category: "site" },
  { id: "excavationEnd", name: "Excavation end", type: "datetime-local", required: "false", category: "site" },
  { id: "eastings", name: "Eastings", type: "number", required: "false", category: "position" },
  { id: "northings", name: "Northings", type: "number", required: "false", category: "position" },
  { id: "spotX", name: "Spot X", type: "number", required: "false", category: "position" },
  { id: "spotY", name: "Spot Y", type: "number", required: "false", category: "position" },
  { id: "composition", name: "Composition", type: "text", required: "false", category: "description" },
  { id: "contextType", name: "Context type", type: "text", required: "false", category: "description" },
  { id: "dimensions", name: "Dimensions", type: "text", required: "false", category: "description" },
  { id: "setNum", name: "Set Num", type: "number", required: "false", category: "description" },
  { id: "thickness", name: "Thickness", type: "number", required: "false", category: "description" },
  { id: "fillOf", name: "Fill of", type: "number", required: "false", category: "description" },
  { id: "description", name: "Description", type: "text", required: "false", category: "description" },
  { id: "earliestDate", name: "Earliest date", type: "datetime-local", required: "false", category: "date" },
  { id: "latestDate", name: "Latest date", type: "datetime-local", required: "false", category: "date" },
  { id: "dateText", name: "Date text", type: "text", required: "false", category: "date" },
  { id: "period", name: "Period", type: "text", required: "false", category: "date" },
  { id: "associatedWith", name: "Associated with", type: "text", required: "false", category: "associated" },
  { id: "records", name: "Records", type: "text", required: "false", category: "associated" },
  { id: "notes", name: "Notes", type: "text", required: "false", category: "notes" },
];



export const apiURL = "https://iadb-backend.onrender.com/api";
// export const apiURL = "http://localhost:4001/api";

/* 
  sieved: { type: Boolean, required: false },
  completed: { type: Boolean, required: false },
  planNA: { type: Boolean, required: false },
  */

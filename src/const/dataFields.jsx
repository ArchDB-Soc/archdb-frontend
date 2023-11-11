// List out the different fields for each data object so the API doesn't have to be called every time they're needed.

export const recordFields = [
  { id: "friendlyId", name: "ID", type: "text", required: "false", category: "internal", keyInfo: true },
  { id: "checkedBy", name: "Checked by", type: "text", required: "false", category: "people" },
  { id: "enteredBy", name: "Entered by", type: "text", required: "false", category: "people" },
  { id: "recorder", name: "Recorder", type: "text", required: "false", category: "people" },
  { id: "excavator", name: "Excavator", type: "text", required: "false", category: "people" },
  { id: "siteName", name: "Site name", type: "text", required: "true", category: "site", keyInfo: true },
  { id: "_site", name: "Site", type: "text", required: "true", category: "site" },
  { id: "siteArea", name: "Site area", type: "text", required: "false", category: "site" },
  { id: "excavatedOn", name: "Excavated on", type: "text", required: "false", category: "site" },
  { id: "excavationMethod", name: "Excavation method", type: "text", required: "false", category: "site" },
  { id: "excavationEnd", name: "Excavation end", type: "datetime-local", required: "false", category: "site" },
  { id: "eastings", name: "Eastings", type: "number", required: "false", category: "position" },
  { id: "northings", name: "Northings", type: "number", required: "false", category: "position" },
  { id: "spotX", name: "Spot X", type: "number", required: "false", category: "position" },
  { id: "spotY", name: "Spot Y", type: "number", required: "false", category: "position" },
  { id: "composition", name: "Composition", type: "text", required: "false", category: "description" },
  { id: "recordType", name: "Record type", type: "text", required: "false", category: "description" },
  { id: "dimensions", name: "Dimensions", type: "text", required: "false", category: "description" },
  { id: "thickness", name: "Thickness", type: "number", required: "false", category: "description" },
  { id: "fillOf", name: "Fill of", type: "number", required: "false", category: "description" },
  { id: "description", name: "Description", type: "text", required: "false", category: "description", keyInfo: true },
  { id: "earliestDate", name: "Earliest date", type: "datetime-local", required: "false", category: "date" },
  { id: "latestDate", name: "Latest date", type: "datetime-local", required: "false", category: "date" },
  { id: "dateText", name: "Date text", type: "text", required: "false", category: "date" },
  { id: "period", name: "Period", type: "text", required: "false", category: "date", keyInfo: true },
  { id: "associatedWith", name: "Associated with", type: "text", required: "false", category: "associated" },
  { id: "records", name: "Records", type: "text", required: "false", category: "associated" },
  { id: "notes", name: "Notes", type: "text", required: "false", category: "notes" },
];

export const siteFields = [
  { id: "name", name: "Name", type: "text", required: "true", category: "info", keyInfo: true },
  { id: "latitude", name: "Latitude", type: "number", required: "false", category: "info", keyInfo: true },
  { id: "longitude", name: "Longitude", type: "number", required: "false", category: "info", keyInfo: true },
  { id: "type", name: "Type", type: "text", required: "false", category: "info" },
  { id: "date", name: "Date", type: "datetime-local", required: "false", category: "info" },
  { id: "excavator", name: "Excavator", type: "text", required: "false", category: "info" },
  { id: "abstract", name: "Abstract", type: "text", required: "false", category: "info", keyInfo: true },
  { id: "records", name: "Records", type: "text", required: "false", category: "info" },

];

export const setFields = [
  { id: "_site", name: "Site", type: "text", required: "true", category: "site" },
  { id: "siteName", name: "Site name", type: "text", required: "true", category: "site", keyInfo: true },
  { id: "title", name: "Title", type: "text", required: "false", category: "info", keyInfo: true },
  { id: "period", name: "Period", type: "text", required: "false", category: "info", keyInfo: true },
  { id: "notes", name: "Notes", type: "text", required: "false", category: "info", keyInfo: true },
  { id: "records", name: "Records", type: "text", required: "false", category: "info" },
]


/* 
  sieved: { type: Boolean, required: false },
  completed: { type: Boolean, required: false },
  planNA: { type: Boolean, required: false },
  */

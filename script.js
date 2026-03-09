/* JSON */
const textArea = document.getElementById("textArea");
/* SQL */
const textAreaResult = document.getElementById("textAreaResult");
/* Table */
const table = document.getElementById("table");
/* Btns */
const btnSql = document.getElementById("btnSql");
const btnCopy = document.getElementById("btnCopy");

/* Format a single value for SQL */
function formatValue(value) {
  if (value === null) return "NULL";
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "string") {
    // Detect ISO 8601 datetime (e.g. "2024-11-05T13:41:53-0500")
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      const formatted = value.replace("T", " ").substring(0, 19);
      return `'${formatted}'`;
    }
    return `'${value}'`;
  }
  return value;
}

/* Transform JSON to SQL */
const formatData = (data, table) => {
  const regex = /\{(.*?)\}/g;
  const resultArray = [];
  let match;

  while ((match = regex.exec(data)) !== null) {
    resultArray.push(match[0]);
  }

  const jsonArray = [];

  for (const item of resultArray) {
    jsonArray.push(JSON.parse(item));
  }

  formatSql(jsonArray, table.toLowerCase());
};

function formatSql(json, table) {
  let sql = "";
  for (const item of json) {
    const values = Object.values(item).map(formatValue);
    sql += `INSERT INTO ${table} (${Object.keys(item)}) VALUES (${values});\n`;
  }

  textAreaResult.value = sql;
}

/* Btns actions */
btnSql.addEventListener("click", () => {
  if (textArea.value === "" || table.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Advertencia!",
      text: "Por favor, ingrese los datos requeridos.",
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    });
    return;
  }

  formatData(textArea.value, table.value);
  Swal.fire({
    icon: "success",
    title: "SQL generado!",
    text: "El código SQL se generó correctamente.",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    position: "top-end",
  });
});

btnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(textAreaResult.value).then(
    Swal.fire({
      icon: "success",
      title: "Copiado!",
      text: "El código SQL se copió al portapapeles.",
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    })
  );
});

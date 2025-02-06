/* JSON */
const textArea = document.getElementById("textArea");
/* SQL */
const textAreaResult = document.getElementById("textAreaResult");
/* Table */
const table = document.getElementById("table");
/* Btns */
const btnSql = document.getElementById("btnSql");
const btnCopy = document.getElementById("btnCopy");

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
    jsonArray.push(
      JSON.parse(item, (key, value) => (value === null ? "NULL" : value))
    );
  }

  formatSql(jsonArray, table);
};

function formatSql(json, table) {
  let sql = ``;
  for (const item of json) {
    sql += `INSERT INTO ${table} (${Object.keys(item)}) VALUES (${Object.values(
      item
    )});\n`;
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

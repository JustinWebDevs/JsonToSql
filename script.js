const textArea = document.getElementById('textArea');
const textAreaResult = document.getElementById('textAreaResult');
const table = document.getElementById('table');
const btnSql = document.getElementById('btnSql');
const btnCopy = document.getElementById('btnCopy');

const formatData = (data, table) => {
    
  const regex = /\{(.*?)\}/g;
  const resultArray = [];
  let match;
  
  while ((match = regex.exec(data)) !== null) {
    resultArray.push(match[0]);
  }
  
  const jsonArray = [];

  for (const item of resultArray) {
    jsonArray.push(JSON.parse(item, (key, value) => (value === null ? 'NULL' : value)));
  }

  formatSql(jsonArray, table);

}

function formatSql(json, table){
  let sql = ``;
  for (const item of json) {
    sql += `INSERT INTO ${table} (${Object.keys(item)}) VALUES (${Object.values(item)});\n`;
  }
  
  textAreaResult.value = sql;
} 


btnSql.addEventListener('click', ()=>{
    formatData(textArea.value, table.value)
});

btnCopy.addEventListener('click', ()=>{
  navigator.clipboard.writeText(textAreaResult.value).then(console.log('copiado correctamente'));
});
const textArea = document.getElementById('textArea');
const btn = document.getElementById('btn');

const formatData = (data) => {
    
const expresionRegular = /\{([^}]+)\}/;
const json = data.match(expresionRegular);

if (json) {
  const textoEntreLlaves = json[1];
  console.log(textoEntreLlaves);
} else {
  console.log("No se encontraron llaves con texto.");
}


}

btn.addEventListener('click', ()=>{
    formatData(textArea.value)
});

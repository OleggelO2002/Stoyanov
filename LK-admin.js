function swapFieldLabels(){

document.querySelectorAll(".custom-field").forEach(function(field){

const label = field.querySelector(".label-value");
const description = field.querySelector(".field-description-block");

if(!label || !description) return;

if(field.dataset.swapped) return;

const labelText = label.textContent.trim();
const descriptionText = description.textContent.trim();

label.textContent = descriptionText;
description.textContent = labelText;

field.dataset.swapped = "true";

});

}

/* запускаем сразу */
swapFieldLabels();

/* следим за подгрузкой элементов */
const observer = new MutationObserver(function(){
swapFieldLabels();
});

observer.observe(document.body,{
childList:true,
subtree:true
});

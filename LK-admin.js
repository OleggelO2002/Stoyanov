document.addEventListener("DOMContentLoaded", function(){

setTimeout(function(){

document.querySelectorAll(".custom-field").forEach(function(field){

const label = field.querySelector(".label-value");
const description = field.querySelector(".field-description-block");

if(!label || !description) return;

const labelText = label.textContent.trim();
const descriptionText = description.textContent.trim();

label.textContent = descriptionText;
description.textContent = labelText;

});

}, 500);

});

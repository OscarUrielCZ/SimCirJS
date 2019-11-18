window.addEventListener("DOMContentLoaded", function() {
    let savebtn = document.getElementById("savebtn");

    savebtn.addEventListener("click", () => {
        let circuitinfo = document.getElementById("circuitbox");
        let info = document.querySelector(".simcir-json-data-area");
        console.log(info.value);
    }); 
});
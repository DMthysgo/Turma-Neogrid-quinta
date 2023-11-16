document.addEventListener("DOMContentLoaded", function() {
const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newusername = document.getElementById("newusername").value;
    const newpassword = document.getElementById("newpassword").value;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);

    xhr.onload = function(){
        let usersData = [];
        if (xhr.status === 200){
            usersData = JSON.parse(xhr.responseText);
        }

        usersData.push({
            "username": newusername,
            "password": newpassword,
        });

        const jsonBlob = new Blob([JSON.stringify(usersData)], {type: "application/json"});
        const jsonUrl = URL.createObjectURL(jsonBlob);

        const a = document.createElement("a");
        a.href = jsonUrl;
        a.download = "users.json";
        a.click();
    }
    xhr.send();
})
})
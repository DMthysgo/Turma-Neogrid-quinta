document.addEventListener("DOMContentLoaded",function(){
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "data.json", true);

        xhr.onload = function(){
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText)
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;

                const users = responseData.users;

                const foundUser = users.find(user => user.username === username && user.password === password);

                if (foundUser !== undefined){
                    alert("Login realizado com sucesso!");
                    window.location.href = "pagina.html";
                }
                else{
                    alert("Credencias invalidas, por facor tente novamente!");
                }
            }
        }
        xhr.send()
    })
})
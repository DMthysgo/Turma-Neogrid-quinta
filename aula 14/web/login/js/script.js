const form = document.getElementById("form");
const campo = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  senhaValidate();

  const user = campo[0].value;
  const senha = campo[1].value;

  const login_data = {
    user,
    senha,
  };

  try {
    const resposta = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_data),
    });

    const data = await resposta.json();

    if (resposta.ok) {
      console.log(data.msg);
      localStorage.setItem("jwtToken", data.token);
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        const response = await fetch(`/user/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const dados = await response.json();
          window.location.href = `/Home?user=${user}`;
        } else {
          alert(response.msg);
        }
      } catch (error) {
        console.error("Erro ao acesso a rota protegida: ", error);
      }
    } else {
    }
  } catch (error) {
    console.error(error);
  }
});

function setError(index) {
  campo[index].style.border = "2px solid #e63636";
  spans[index].style.display = "block";
}

function removeError(index) {
  campo[index].style.border = "";
  spans[index].style.display = "none";
}

function senhaValidate() {
  if (campo[1].value.lenght < 8) {
    setError(1);
  } else {
    removeError(1);
  }
}

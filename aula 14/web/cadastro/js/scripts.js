const form = document.getElementById("form");
const campo = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  nameValidation();
  emailValidate();
  senhaValidate();
  compareSenha();

  const nome = campo[0].value;
  const email = document.getElementById("email").value;
  const senha = campo[2].value;

  const user_data = {
    user: nome,
    email: email,
    senha: senha,
  };

  try {
    const resposta = await fetch("/auth/cadastro", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user_data),
    });

    const data = await resposta.json();
    if (resposta.ok) {
      alert(data.msg);
      window.location.href = `/`;
    } else {
      alert(data.msg);
    }
  } catch (error) {
    alert("Erro ao se cadastrar", error);
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

function nameValidation() {
  if (campo[0].value.lenght < 3) {
    setError(0);
  } else {
    removeError(0);
  }
}

function emailValidate() {
  if (!emailRegex.test(campo[1].value)) {
    setError(1);
  } else {
    removeError(1);
  }
}

function senhaValidate() {
  if (campo[2].value.lenght < 8) {
    setError(2);
  } else {
    removeError(2);
    compareSenha();
  }
}

function compareSenha() {
  if (campo[2].value == campo[3].value && campo[3].value.lenght) {
    setError(3);
  } else {
    removeError(3);
  }
}

const displayFrom = document.querySelector("#displayFrom");
const btnRegister = document.querySelector("#RegisterBtn");

//vDeclaration des variables pour les champs du formulaire de connexion
const btnLogin = document.querySelector("#loginBtn");

btnRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    await fetch("import/register.php")
        .then((response) => response.text())
        .then((data) => {
           displayFrom.innerHTML = data;
        });
        const btnRegisterOnForm = document.querySelector("#register_form");
        btnRegisterOnForm.addEventListener("submit", async (event) => {
           event.preventDefault();
           fetch("import/register.php", {
                method: "POST",
                body: new FormData(btnRegisterOnForm)
           })
              .then((response) => response.json())
                .then((data) => {
                    const displayMessage = document.querySelector("#errorMsg");
                    if (data.status === "success") {
                        displayMessage.innerHTML = "Vous êtes bien inscrit";
                        displayMessage.classList.add("alert-success");
                        displayMessage.classList.remove("alert-danger");
                    }
                    if (data.status === "empty") {
                        displayMessage.innerHTML = "Veuillez remplir tous les champs";
                        displayMessage.classList.add("alert-danger");
                        displayMessage.classList.remove("alert-success");
                    }
                    if (data.status === "passwordNotMatch") {
                        displayMessage.innerHTML = "Les mots de passe ne correspondent pas";
                        displayMessage.classList.add("alert-danger");
                        displayMessage.classList.remove("alert-success");
                    }
                    if (data.status === "loginExist") {
                        displayMessage.innerHTML = "Ce login existe déjà";
                        displayMessage.classList.add("alert-danger");
                        displayMessage.classList.remove("alert-success");
                    }
                });
        });
});

btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    await fetch("import/login.php")
        .then((response) => response.text())
        .then((data) => {
            displayFrom.innerHTML = data;
        });
        const btnLoginOnForm = document.querySelector("#login_form");
        btnLoginOnForm.addEventListener("submit", async (event) => {
           event.preventDefault();
              fetch("import/login.php", {
                method: "POST",
                body: new FormData(btnLoginOnForm)
              })
                .then((response) => response.json())
                .then((data) => {
                    const displayMessage = document.querySelector("#errorMsg");
                    if (data.status === "success") {
                        displayMessage.innerHTML = "Vous êtes bien connecté";
                        displayMessage.classList.add("alert-success");
                        displayMessage.classList.remove("alert-danger");
                        window.location.href = "index.php";
                    }
                    if (data.status === "empty") {
                        displayMessage.innerHTML = "Veuillez remplir tous les champs";
                        displayMessage.classList.add("alert-danger");
                        displayMessage.classList.remove("alert-success");
                    }
                    if (data.status === "error") {
                        displayMessage.innerHTML = "Login ou mot de passe incorrect";
                        displayMessage.classList.add("alert-danger");
                        displayMessage.classList.remove("alert-success");
                    }
                });
        });
});
const displayFrom = document.querySelector("#displayFrom");
const btnRegister = document.querySelector("#RegisterBtn");

btnRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    await fetch("import/register.php")
        .then((response) => response.text())
        .then((data) => {
           displayFrom.innerHTML = data;
        });
        const btnRegisterOnForm = document.querySelector("#register_form");
        btnRegisterOnForm.addEventListener("click", async (event) => {
           event.preventDefault();
           fetch("import/register.php", {
                method: "POST",
                body: new FormData(btnRegisterOnForm)
           })
              .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        });
});
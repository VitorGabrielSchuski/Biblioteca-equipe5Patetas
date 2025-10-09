document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (email && senha) {
    window.location.href = "dashboard.html";
  } else {
    alert("Preencha todos os campos corretamente!");
  }
});

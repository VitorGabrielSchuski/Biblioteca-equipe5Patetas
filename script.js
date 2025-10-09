document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginPage = document.getElementById("login-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const logoutBtn = document.getElementById("logout");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simula login
      loginPage.classList.remove("active");
      dashboardPage.classList.add("active");
    });
  
    logoutBtn.addEventListener("click", () => {
      dashboardPage.classList.remove("active");
      loginPage.classList.add("active");
    });
  });
  
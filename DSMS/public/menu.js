function logout() {
  localStorage.removeItem("token"); // 로컬 스토리지에서 토큰을 제거하여 로그아웃 처리
  alert("로그아웃 되었습니다.");
  location.href = "login.html";
}

const token = localStorage.getItem("token");

const loginMenu = document.getElementById("login-menu"); // "login-menu"라는 ID를 가진 요소를 가져와서 loginMenu 변수에 할당
const logoutMenu = document.getElementById("logout-menu"); // "logout-menu"라는 ID를 가진 요소를 가져와서 logoutMenu 변수에 할당

if (token) {
  loginMenu.style.display = "none";
  logoutMenu.style.display = "inline"; // 로그아웃 메뉴 표시
} else {
  logoutMenu.style.display = "none"; // 로그아웃 메뉴 숨김
}

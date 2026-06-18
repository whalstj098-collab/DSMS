// 로그아웃 함수
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");

  alert("로그아웃 되었습니다.");

  location.href = "login.html";
}

// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 로그인 상태 확인
  const token = localStorage.getItem("token");

  // 메뉴 요소 가져오기
  const loginMenu = document.getElementById("login-menu");
  const logoutMenu = document.getElementById("logout-menu");

  // 요소 없으면 종료
  if (!loginMenu || !logoutMenu) return;

  // 로그인 상태에 따라 UI 변경
  if (token) {
    loginMenu.style.display = "none";
    logoutMenu.style.display = "inline-block";
  } else {
    loginMenu.style.display = "inline-block";
    logoutMenu.style.display = "none";
  }
});

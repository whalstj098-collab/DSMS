// DOM 로딩 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 이미 로그인된 상태라면 로그인 페이지 접근 차단
  const token = localStorage.getItem("token");

  if (token) {
    location.href = "index.html";
  }

  // 로그인 버튼 가져오기
  const loginBtn = document.getElementById("login-btn");

  // 버튼 클릭 이벤트
  loginBtn.addEventListener("click", async () => {
    // 입력값 가져오기
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 서버로 로그인 요청
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // 응답 처리
    const result = await response.json();

    console.log(result);

    // 로그인 성공
    if (result.success) {
      // localStorage에 사용자 정보 저장
      localStorage.setItem("token", result.token);
      localStorage.setItem("name", result.name);

      alert("로그인 성공!");

      // 메인 페이지 이동
      location.href = "index.html";
    } else {
      alert(result.message);
    }
  });
});

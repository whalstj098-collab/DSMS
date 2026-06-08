const token = localStorage.getItem("token"); // localStorage에서 "token"이라는 키로 저장된 값을 가져와서 token 변수에 할당

if (token) {
  location.href = "index.html";
} // 이미 로그인된 상태라면 홈 페이지로만 이동
const loginBtn = document.getElementById("login-btn"); // "login-btn"이라는 ID를 가진 요소를 가져와서 loginBtn 변수에 할당

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value; // "email"이라는 ID를 가진 요소의 값을 가져오고 email 변수에 할당
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 서버에 알리는 헤더를 설정
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }); // "/login" 엔드포인트로 POST 요청을 보냄, 요청 본문에 email과 password를 JSON 문자열로 변환하여 포함

  const result = await response.json(); // 서버로부터 JSON 형식의 응답을 받아서 result 변수에 할당
  console.log(result);

  if (result.success) {
    localStorage.setItem("token", result.token); // 로그인 성공 시 JWT 토큰을 localStorage에 저장
    localStorage.setItem("name", result.name);

    alert("로그인 성공!");

    location.href = "index.html"; // 로그인 성공하면 홈 페이지로 이동
  } else {
    alert(result.message); // 로그인 실패 시 메시지 표시
  }
}); // loginBtn 요소에 클릭 이벤트 리스너를 추가 사용자가 버튼을 클릭하면 이 함수가 실행

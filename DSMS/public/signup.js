const signupBtn = document.getElementById("signup-btn"); // "signup-btn"이라는 ID를 가진 요소를 가져와서 signupBtn 변수에 할당

signupBtn.addEventListener("click", async () => {
  // signupBtn 요소에 클릭 이벤트 리스너를 추가 사용자가 버튼을 클릭하면 이 함수가 실행

  const name = document.getElementById("name").value; // "name"이라는 ID를 가진 요소의 값을 가져오고 name 변수에 할당
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const major = document.getElementById("major").value; // "major"라는 ID를 가진 요소의 값을 가져오고 major 변수에 할당
  const grade = document.getElementById("grade").value;
  const intro = document.getElementById("intro").value;

  const response = await fetch("/signup", {
    // "/signup" 엔드포인트로 POST 요청을 보냄
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 서버에 알리는 헤더를 설정
    },
    body: JSON.stringify({
      name,
      email,
      password,
      major,
      grade,
      intro,
    }), // 요청 본문에 name, email, password, major, grade, intro를 JSON 문자열로 변환하여 포함
  });

  const result = await response.json(); // 서버로부터 JSON 형식의 응답을 받아서 result 변수에 할당

  alert(result.message); // 서버에서 받은 메시지를 사용자에게 알림으로 표시

  if (result.success) {
    location.href = "login.html"; // 회원가입이 성공하면 로그인 페이지로 이동
  }
});

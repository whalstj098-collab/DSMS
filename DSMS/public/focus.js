const saveBtn = document.getElementById("save-status"); // "save-status"라는 ID를 가진 버튼 요소를 가져와 saveBtn 변수에 할당

saveBtn.addEventListener("click", async () => {
  // 상태 저장 버튼을 클릭하면 실행되는 이벤트 리스너

  const status = document.getElementById("status-select").value;
  // 사용자가 선택한 상태(상담 가능, 집중 중 등)를 가져와 status 변수에 할당

  const name = localStorage.getItem("name");
  // localStorage에 저장된 로그인 사용자 이름을 가져와 name 변수에 할당

  const response = await fetch("/status", {
    // "/status" 엔드포인트로 상태 변경 요청을 보냄

    method: "POST",
    // POST 방식으로 데이터 전송

    headers: {
      "Content-Type": "application/json",
      // 요청 본문이 JSON 형식임을 서버에 알림
    },

    body: JSON.stringify({
      name,
      status,
    }),
    // 사용자 이름과 선택한 상태를 JSON 문자열로 변환하여 서버에 전송
  });

  const result = await response.json();
  // 서버로부터 받은 응답을 JSON 형식으로 변환하여 result 변수에 할당

  alert(result.message);
  // 서버가 반환한 결과 메시지를 알림창으로 출력
});

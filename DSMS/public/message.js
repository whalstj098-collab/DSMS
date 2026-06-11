const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
  const message = document.getElementById("message").value; // "message"라는 ID를 가진 요소의 값을 가져오고 message 변수에 할당
  const major = document.getElementById("major").value;
  const user = localStorage.getItem("name");

  // 메시지 입력값과 전공을 가져오고, localStorage에서 사용자 이름을 가져옴
  const response = await fetch("/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 서버에 알리는 헤더를 설정
    },
    body: JSON.stringify({
      // 요청 본문에 메시지, 전공, 사용자 이름을 JSON 형식으로 포함하여 서버에 전송
      user,
      major,
      message,
    }),
  }); // "/message" 엔드포인트로 POST 요청을 보냄

  const result = await response.json(); // 서버로부터 JSON 형식의 응답을 받아서 result 변수에 할당

  alert(result.message);

  loadMessages(); // 메시지 목록을 새로고침하여 최신 메시지를 표시
}); // sendBtn 요소에 클릭 이벤트 리스너를 추가 사용자가 버튼을 클릭하면 이 함수가 실행

// 메시지 목록을 서버에서 가져와서 화면에 표시
async function loadMessages() {
  const response = await fetch("/messages"); // "/messages" 엔드포인트로 GET 요청을 보내서 메시지 목록을 가져옴

  const messages = await response.json(); // 서버로부터 JSON 형식의 응답을 받아서 messages 변수에 할당

  const list = document.getElementById("message-list"); // "message-list"라는 ID를 가진 요소를 가져와서 list 변수에 할당

  list.innerHTML = ""; // 메시지 목록을 초기화하여 이전 메시지를 제거

  messages.forEach((msg, index) => {
    list.innerHTML += `
<div class="card">

  <h3>${msg.user}</h3>

  <p>[${msg.major}]</p>

  <p>${msg.message}</p>

  <small>${msg.time}</small>

${
  msg.reply
    ? `
      <div class="reply-box">
        <strong>${msg.replyUser}님의 답변</strong>
        <p>${msg.reply}</p>
      </div>
      `
    : `
  <button class="reply-btn" onclick="showReplyBox(${index})">
    답변하기
  </button>

  <div id="reply-box-${index}"></div>
  `
}
</div>
`;
  }); // messages 배열을 반복하면서 각 메시지를 HTML 카드 형식으로 만들어서 list 요소에 추가, 답변이 있는 경우 멘토 답변을 표시하고, 없는 경우 답변하기 버튼을 표시
}

loadMessages(); // 페이지가 로드될 때 메시지 목록을 가져와서 표시

// 멘토 답변 등록 함수
async function replyMessage(index) {
  // 답변하기 버튼이 클릭되면 이 함수가 실행, index는 답변할 메시지의 인덱스

  const reply = prompt("답변을 입력하세요."); // 사용자에게 답변을 입력받는 프롬프트 창을 띄우고 입력된 값을 reply 변수에 할당

  if (!reply) return; // 사용자가 답변을 입력하지 않고 취소한 경우 함수를 종료

  await fetch("/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index,
      reply,
    }),
  }); // "/reply" 엔드포인트로 POST 요청을 보내서 멘토 답변을 등록, 요청 본문에 답변할 메시지의 인덱스와 입력된 답변을 JSON 형식으로 포함

  alert("답변이 등록되었습니다."); // 답변 등록 성공 메시지를 사용자에게 알림으로 표시

  loadMessages();
}
// 답변 입력창을 표시하는 함수
function showReplyBox(index) {
  const box = document.getElementById(`reply-box-${index}`); // "reply-box-{index}"라는 ID를 가진 요소를 가져와서 box 변수에 할당

  box.innerHTML = `
    <textarea
      id="reply-input-${index}"
      class="reply-input"
      placeholder="답변을 입력하세요"
    ></textarea>

    <button
      class="reply-btn"
      onclick="submitReply(${index})"
    >
      답변 등록
    </button>
  `;
}
// 답변 등록 함수
async function submitReply(index) {
  const reply = document.getElementById(`reply-input-${index}`).value;
  const replyUser = localStorage.getItem("name");

  if (!reply.trim()) {
    alert("답변을 입력하세요.");
    return;
  }

  await fetch("/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index,
      reply,
      replyUser, // 답변을 등록한 멘토의 이름도 함께 서버로 전송
    }),
  });

  loadMessages();
}

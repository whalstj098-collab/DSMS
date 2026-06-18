document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");

  if (!sendBtn) return;

  /*질문 등록*/
  sendBtn.addEventListener("click", async () => {
    const message = document.getElementById("message").value;
    const major = document.getElementById("major").value;
    const user = localStorage.getItem("name");

    const response = await fetch("/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        major,
        message,
      }),
    });

    const result = await response.json();

    alert(result.message);

    loadMessages();
  });

  /*메시지 목록 로딩*/
  async function loadMessages() {
    const response = await fetch("/messages");
    const messages = await response.json();

    const list = document.getElementById("message-list");

    list.innerHTML = "";

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
    });
  }

  /*답변 입력 UI 생성*/
  window.showReplyBox = function (index) {
    const box = document.getElementById(`reply-box-${index}`);

    box.innerHTML = `
      <textarea
        id="reply-input-${index}"
        class="reply-input"
        placeholder="답변 입력"
      ></textarea>

      <button class="reply-btn" onclick="submitReply(${index})">
        답변 등록
      </button>
    `;
  };

  /*답변 입력 및 출력*/
  window.submitReply = async function (index) {
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
        replyUser,
      }),
    });

    loadMessages();
  };

  // 최초 실행
  loadMessages();
});

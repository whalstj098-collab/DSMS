document.addEventListener("DOMContentLoaded", () => {
  // 질문 등록 버튼 가져오기
  const sendBtn = document.getElementById("subject-send-btn");

  // 과목 선택창 가져오기
  const select = document.getElementById("subject-select");

  // 페이지에 버튼이 없으면 종료
  if (!sendBtn) return;

  // 질문 등록 버튼 클릭
  sendBtn.addEventListener("click", async () => {
    const message = document.getElementById("subject-message").value; // 질문 내용
    const subject = select.value; // 선택한 과목
    const user = localStorage.getItem("name"); // 로그인한 사용자 이름

    const response = await fetch("/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        subject,
        message,
      }),
    });

    const result = await response.json();

    alert(result.message);

    // 질문 등록 후 목록 새로고침
    loadSubjects();

    // 입력창 비우기
    document.getElementById("subject-message").value = "";
  });

  // 교과 질문 목록 불러오기
  async function loadSubjects() {
    const response = await fetch("/subjects");

    const subjects = await response.json();

    const list = document.getElementById("subject-list");

    list.innerHTML = "";

    const selected = select.value;

    subjects.forEach((item, index) => {
      if (selected === "전체" || item.subject === selected) {
        list.innerHTML += `
      <div class="card">
        <h3>${item.user}</h3>
        <p>[${item.subject}]</p>
        <p>${item.message}</p>
        <small>${item.time}</small>
        ${
          item.reply
            ? `
              <div class="reply-box">
                <strong>${item.replyUser}님의 답변</strong>
                <p>${item.reply}</p>
              </div>
            `
            : `
              <button
                class="reply-btn"
                onclick="showReplyBox(${index})"
              >
                답변하기
              </button>

              <div id="reply-box-${index}"></div>
            `
        }
      </div>
    `;
      }
    });
  }

  // 과목 변경 시 목록 새로고침
  select.addEventListener("change", loadSubjects);

  // 최초 실행
  loadSubjects();
});

// 답변 입력창 표시
function showReplyBox(index) {
  const box = document.getElementById(`reply-box-${index}`);

  box.innerHTML = ` <textarea
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

// 답변 등록
async function submitReply(index) {
  const reply = document.getElementById(`reply-input-${index}`).value;

  const replyUser = localStorage.getItem("name");

  // 답변이 비어있으면 종료
  if (!reply.trim()) {
    alert("답변을 입력하세요.");
    return;
  }

  await fetch("/subjectReply", {
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

  alert("답변이 등록되었습니다.");

  // 새로고침하여 답변 반영
  location.reload();
}

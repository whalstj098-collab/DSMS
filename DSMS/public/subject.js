document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("subject-send-btn");

  if (!sendBtn) return;

  /*질문 등록*/
  sendBtn.addEventListener("click", async () => {
    const message = document.getElementById("subject-message").value;
    const subject = document.getElementById("subject-select").value;
    const user = localStorage.getItem("name");

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

    loadSubjects();
  });

  /*목록 출력*/
  async function loadSubjects() {
    const response = await fetch("/subjects");
    const subjects = await response.json();

    const list = document.getElementById("subject-list");

    list.innerHTML = "";

    const selected = document.getElementById("subject-select").value;

    subjects.forEach((item) => {
      if (selected === "전체" || item.subject === selected) {
        list.innerHTML += `
          <div class="card">

            <h3>${item.user}</h3>

            <p>[${item.subject}]</p>

            <p>${item.message}</p>

            <small>${item.time}</small>

          </div>
        `;
      }
    });
  }

  // 필터 변경 시
  document
    .getElementById("subject-select")
    .addEventListener("change", loadSubjects);

  // 최초 실행
  loadSubjects();
});

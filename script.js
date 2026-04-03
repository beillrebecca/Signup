// =========================
// 🔹 新規登録処理（Signup）
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  signupBtn?.addEventListener("click", () => {
    const contact = document.getElementById("contact").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    // 入力チェック
    if(!contact || !username || !password){
      alert("全ての項目を入力してください");
      return;
    }

    // 保存（簡易版：ローカルストレージ）
    const userData = {
      contact: contact,
      username: username,
      password: password
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("登録完了！ログインしてください");
    location.href = "../Login/"; // ログインページに飛ばす
  });
});
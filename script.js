// =========================
// 🔹 新規登録処理（Signup）
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  signupBtn?.addEventListener("click", () => {
    const emailOrPhone = document.getElementById("newEmailOrPhone")?.value || "";
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    if(emailOrPhone && username && password){
      // 1人分の情報をオブジェクトにまとめる
      const userData = {
        contact: emailOrPhone,
        username: username,
        password: password
      };

      // localStorage に JSON 文字列で保存
      localStorage.setItem("loginUserData", JSON.stringify(userData));

      alert("登録完了！ログインしてください");
      location.href = "../Login/"; // Login ページの index.html に移動
    } else {
      alert("全て入力してください");
    }
  });
});

// =========================
// 🔹 新規登録処理（Signup + Firebaseメール認証）
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  signupBtn?.addEventListener("click", () => {
    const email = document.getElementById("contact").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    // 入力チェック
    if(!email || !username || !password){
      alert("全ての項目を入力してください");
      return;
    }

    // Firebase 初期化済みを前提
    const auth = firebase.auth();

    // メールアドレスとパスワードでアカウント作成
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // ユーザー作成成功
        const user = userCredential.user;

        // ユーザー名をプロファイルに設定
        return user.updateProfile({ displayName: username })
          .then(() => user);
      })
      .then((user) => {
        // メール確認を送信
        return user.sendEmailVerification();
      })
      .then(() => {
        alert("登録完了！確認メールを送信しました。メールを確認してからログインしてください。");
        location.href = "../Login/"; // ログインページへ
      })
      .catch((error) => {
        console.error(error);
        alert("エラー：" + error.message);
      });
  });
});
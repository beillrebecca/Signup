document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const contactInput = document.getElementById("contact");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirm");

  const auth = firebase.auth();

  // reCAPTCHA 初期化（電話番号用）
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible'
  });

  signupBtn?.addEventListener("click", async () => {
    alert("クリックイベント発火！"); // デバッグ用

    const contact = contactInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value.trim();

    if (!contact || !password || !passwordConfirm) {
      alert("全ての項目を入力してください");
      return;
    }

    if (password !== passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    // メールアドレス登録
    if (contact.includes("@")) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(contact, password);
        const user = userCredential.user;

        // Signup UIDを sessionStorage に保存
        sessionStorage.setItem("signupUid", user.uid);
        sessionStorage.setItem("verificationType", "email");

        // 🔥 デバッグ用 alert
        alert(`メール登録完了！UID: ${user.uid}`);

        // 本来はここでサーバーへ確認コード送信
        // fetch('/send-verification-email', { ... })

        window.location.href = "/Verify/index.html";

      } catch (error) {
        console.error("エラー内容:", error);
        alert("エラー: " + error.message);
      }
      return;
    }

    // 電話番号登録
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await auth.signInWithPhoneNumber(contact, appVerifier);
      window.confirmationResult = confirmationResult;

      sessionStorage.setItem("phoneNumber", contact);
      sessionStorage.setItem("verificationType", "phone");

      alert("SMSで確認コードを送信しました。verifyページで入力してください。");
      window.location.href = "/Verify/index.html";

    } catch (error) {
      console.error("電話番号登録エラー:", error);
      alert("電話番号登録エラー: " + error.message);
    }
  });
});
console.log("signup.js 読み込み成功");
alert("signup.js 読み込み成功");

document.addEventListener("DOMContentLoaded", () => {
  console.log("signup.js 読み込み成功");
  alert("signup.js 読み込み成功"); // JS が読み込まれたか確認

  const signupBtn = document.getElementById("signupBtn");
  const contactInput = document.getElementById("contact");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirm");

  if (!signupBtn) {
    alert("signupBtn が見つかりません");
    return;
  }

  const auth = firebase.auth();

  // reCAPTCHA 初期化（電話番号用）
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible'
  });

  signupBtn.addEventListener("click", async () => {
    console.log("ボタンがクリックされました");
    alert("クリックイベント発火！"); // クリック確認用

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

    sessionStorage.setItem("verificationType", "email");

    await user.sendEmailVerification();

    alert("確認メールを送信しました！");
    window.location.href = "/Verify/index.html";

  } catch (error) {
    alert(error.message);
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

      console.log("SMS送信成功");
      alert("SMSで確認コードを送信しました。verifyページで入力してください。");
      window.location.href = "/Verify/index.html";

    } catch (error) {
      console.error("電話番号登録エラー:", error);
      alert("電話番号登録エラー: " + error.message);
    }
  });
});
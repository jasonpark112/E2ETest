const key = CryptoJS.enc.Utf8.parse("1234567890123456"); // 클라이언트와 서버가 같은 키 사용

function encryptAndSend() {
    const data = document.getElementById("data").value;

    // AES 암호화를 통해 데이터 암호화
    const encryptedData = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(encryptedData)
    })
    .then(response => response.text())
    .then(encryptedResponse => {
        // 서버에서 응답받은 암호화된 데이터를 복호화
        const decryptedResponse = CryptoJS.AES.decrypt(encryptedResponse, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

        document.getElementById("response").innerText = "Decrypted Response from Server: " + decryptedResponse;
    })
    .catch(error => console.error('Error:', error));
}

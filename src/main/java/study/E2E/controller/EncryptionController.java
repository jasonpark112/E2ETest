package study.E2E.controller;

import org.springframework.web.bind.annotation.*;
import study.E2E.util.EncryptionUtil;

@RestController
@RequestMapping("/api")
public class EncryptionController {


    @PostMapping("/process")
    public String processData(@RequestBody String encryptedData) {
        try {
            // 1. 클라이언트에서 받은 데이터를 복호화
            String decryptedData = EncryptionUtil.decrypt(encryptedData);
            System.out.println("Decrypted Data from Client: " + decryptedData);

            // 2. 복호화된 데이터를 다시 암호화하여 클라이언트로 응답
            return EncryptionUtil.encrypt(decryptedData);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during encryption/decryption";
        }
    }
}
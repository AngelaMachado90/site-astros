<?php
$emailSafe = isset($email) ? (string) $email : '';
$downloadSafe = isset($downloadUrl) ? (string) $downloadUrl : 'https://simplers.com/amostra-gratis';
?>
    <div style="padding:32px 24px;">
      <p style="margin:0 0 16px;font-size:16px;">Ola!</p>

      <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#3c3553;">
        Seja bem-vinda a comunidade Aurora Scorpio.
      </p>

      <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#3c3553;">
        Seu cadastro foi confirmado e sua amostra gratis do eBook de Marco ja esta liberada.
      </p>

      <div style="text-align:center;margin:18px 0 26px;">
        <a
          href="<?php echo htmlspecialchars($downloadSafe, ENT_QUOTES, 'UTF-8'); ?>"
          target="_blank"
          rel="noopener noreferrer"
          style="display:inline-block;padding:12px 22px;background:#6f42c1;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;"
        >
          Baixar amostra gratis
        </a>
      </div>

      <p style="margin:0 0 12px;font-size:14px;color:#5f567c;line-height:1.6;">
        E-mail cadastrado: <strong><?php echo htmlspecialchars($emailSafe, ENT_QUOTES, 'UTF-8'); ?></strong>
      </p>

      <p style="margin:0;font-size:12px;color:#8f89a6;line-height:1.6;">
        Se voce nao solicitou este cadastro, pode ignorar este e-mail.
      </p>
    </div>


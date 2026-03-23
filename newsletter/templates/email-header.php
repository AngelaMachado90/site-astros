<?php
$titulo = isset($titulo) ? (string) $titulo : 'Aurora Scorpio';
$urlBase = isset($urlBase) ? (string) $urlBase : 'https://astros.koddahub.com.br';
?>
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8'); ?></title>
</head>
<body style="margin:0;padding:20px;background:#f5f0ff;font-family:Arial,sans-serif;color:#1b1f3b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(76,42,133,.12);">
    <div style="background:linear-gradient(135deg,#6f42c1 0%,#4c2a85 100%);padding:28px 20px;text-align:center;">
      <img src="<?php echo htmlspecialchars($urlBase, ENT_QUOTES, 'UTF-8'); ?>/assets/email/star.svg" alt="" width="42" height="42" style="display:block;margin:0 auto 10px;filter:brightness(0) invert(1);opacity:.9;">
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:600;letter-spacing:.5px;">Aurora Scorpio</h1>
      <p style="margin:6px 0 0;color:#f7df95;font-size:13px;">Astrologia Mistica e Autoconhecimento</p>
    </div>


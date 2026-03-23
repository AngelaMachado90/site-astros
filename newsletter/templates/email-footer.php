<?php
$urlBase = isset($urlBase) ? (string) $urlBase : 'https://astros.koddahub.com.br';
$ano = date('Y');
?>
    <div style="padding:18px 20px;background:#faf7ff;border-top:1px solid #ece3ff;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:#6d648a;">
        © <?php echo htmlspecialchars((string) $ano, ENT_QUOTES, 'UTF-8'); ?> Aurora Scorpio
      </p>
      <p style="margin:0;font-size:12px;color:#6d648a;">
        <a href="<?php echo htmlspecialchars($urlBase, ENT_QUOTES, 'UTF-8'); ?>/politica-privacidade.html" style="color:#6f42c1;text-decoration:none;">Politica de Privacidade</a>
        <span style="margin:0 6px;color:#9f95bd;">|</span>
        <a href="<?php echo htmlspecialchars($urlBase, ENT_QUOTES, 'UTF-8'); ?>/termos-de-uso.html" style="color:#6f42c1;text-decoration:none;">Termos de Uso</a>
      </p>
    </div>
  </div>
</body>
</html>


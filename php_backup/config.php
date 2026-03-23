<?php
// Configurações da newsletter
define('URL_BASE', 'https://astros.koddahub.com.br');
define('EMAIL_FROM', 'astros@koddahub.com.br');
define('EMAIL_FROM_NAME', 'Aurora Scorpio');
define('ARQUIVO_INSCRITOS', __DIR__ . '/inscritos.txt');

// Função auxiliar para enviar e-mail
function enviarEmailTemplate($para, $assunto, $template, $dados = []) {
    extract($dados);
    ob_start();
    include "templates/email-header.php";
    include "templates/email-{$template}.php";
    include "templates/email-footer.php";
    $mensagem = ob_get_clean();
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: " . EMAIL_FROM_NAME . " <" . EMAIL_FROM . ">\r\n";
    
    return mail($para, $assunto, $mensagem, $headers);
}
?>
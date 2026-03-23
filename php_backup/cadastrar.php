<?php
// Arquivo: /newsletter/cadastrar.php
require_once 'config.php'; // Se tiver configurações

$arquivo_inscritos = 'inscritos.txt';
$email = $_POST['email'] ?? '';
$consentimento = $_POST['consentimento'] ?? '';

// ... (validações existentes) ...

// Após validar e salvar, enviar e-mail
if ($enviar_email) {
    $assunto = "Bem-vinda à Newsletter Aurora Scorpio";
    
    // Incluir os templates
    $titulo = "Confirmação de inscrição";
    include 'templates/email-header.php';
    include 'templates/email-body-confirmacao.php';
    include 'templates/email-footer.php';
    
    // O HTML completo já foi gerado pelos includes
    $mensagem = ob_get_contents(); // Captura tudo que foi echo
    ob_end_clean(); // Limpa o buffer
    
    // Headers do e-mail
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: Aurora Scorpio <astros@koddahub.com.br>\r\n";
    
    // Enviar
    mail($email, $assunto, $mensagem, $headers);
}
?>
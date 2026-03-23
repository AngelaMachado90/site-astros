<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Metodo nao permitido.'
    ]);
    exit;
}

function hostPermitido(string $urlOuHost): bool
{
    $host = parse_url($urlOuHost, PHP_URL_HOST);
    if (!is_string($host) || $host === '') {
        $host = $urlOuHost;
    }

    $host = strtolower(trim($host));
    $hostsPermitidos = [
        'astros.koddahub.com.br',
        'www.astros.koddahub.com.br',
        'localhost',
        '127.0.0.1',
    ];

    return in_array($host, $hostsPermitidos, true);
}

$originHeader = isset($_SERVER['HTTP_ORIGIN']) ? (string) $_SERVER['HTTP_ORIGIN'] : '';
$refererHeader = isset($_SERVER['HTTP_REFERER']) ? (string) $_SERVER['HTTP_REFERER'] : '';

if ($originHeader !== '' && !hostPermitido($originHeader)) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'error' => 'Origem nao autorizada.'
    ]);
    exit;
}

if ($refererHeader !== '' && !hostPermitido($refererHeader)) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'error' => 'Origem do formulario nao autorizada.'
    ]);
    exit;
}

$emailRaw = isset($_POST['email']) ? trim((string) $_POST['email']) : '';
$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
$consentimento = isset($_POST['consentimento']) ? (string) $_POST['consentimento'] : '';
$downloadUrl = isset($_POST['ebook_url']) ? trim((string) $_POST['ebook_url']) : '';
$website = isset($_POST['website']) ? trim((string) $_POST['website']) : '';

if ($website !== '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'Requisicao invalida.'
    ]);
    exit;
}

if ($email === false) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'E-mail invalido.'
    ]);
    exit;
}

if ($consentimento !== '1') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'Consentimento obrigatorio para envio da amostra.'
    ]);
    exit;
}

if (!preg_match('/^https?:\/\//i', $downloadUrl)) {
    $downloadUrl = 'https://simplers.com/amostra-gratis';
}

$arquivoInscritos = __DIR__ . '/inscritos.txt';
if (!is_file($arquivoInscritos)) {
    file_put_contents($arquivoInscritos, '');
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
$timestamp = gmdate('c');

$linhas = @file($arquivoInscritos, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if ($linhas === false) {
    $linhas = [];
}

$jaInscrito = false;
foreach ($linhas as $linha) {
    $partes = explode("\t", $linha);
    if (isset($partes[1]) && strcasecmp(trim($partes[1]), $email) === 0) {
        $jaInscrito = true;
        break;
    }
}

if (!$jaInscrito) {
    $registro = $timestamp . "\t" . $email . "\t" . $ip . PHP_EOL;
    @file_put_contents($arquivoInscritos, $registro, FILE_APPEND | LOCK_EX);
}

$assunto = 'Sua amostra gratis do eBook de Marco chegou';
$titulo = 'Bem-vinda! Sua amostra gratis chegou';
$urlBase = 'https://astros.koddahub.com.br';
$templateDir = __DIR__ . '/templates';

$mensagem = '';
$headerTemplate = $templateDir . '/email-header.php';
$bodyTemplate = $templateDir . '/email-body-boas-vindas.php';
$footerTemplate = $templateDir . '/email-footer.php';

if (is_file($headerTemplate) && is_file($bodyTemplate) && is_file($footerTemplate)) {
    ob_start();
    include $headerTemplate;
    include $bodyTemplate;
    include $footerTemplate;
    $mensagem = (string) ob_get_clean();
}

if ($mensagem === '') {
    $mensagem = '<!doctype html><html lang="pt-br"><body style="font-family: Arial, sans-serif; line-height:1.6; color:#1b1f3b;">'
        . '<h2 style="color:#4c2a85;">Amostra gratis liberada</h2>'
        . '<p>Oi! Recebemos seu cadastro e sua amostra gratis ja esta disponivel.</p>'
        . '<p><a href="' . htmlspecialchars($downloadUrl, ENT_QUOTES, 'UTF-8') . '" style="display:inline-block; background:#4c2a85; color:#ffffff; text-decoration:none; padding:10px 16px; border-radius:8px;">Baixar amostra gratis</a></p>'
        . '<p style="font-size:12px; color:#666;">Se voce nao solicitou este cadastro, ignore este e-mail.</p>'
        . '</body></html>';
}

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Aurora Scorpio <astros@koddahub.com.br>\r\n";

$emailEnviado = @mail($email, $assunto, $mensagem, $headers);

http_response_code(200);
echo json_encode([
    'success' => true,
    'already_subscribed' => $jaInscrito,
    'email_sent' => $emailEnviado,
    'download_url' => $downloadUrl,
    'message' => 'Cadastro confirmado. A amostra gratis ja esta disponivel.'
]);

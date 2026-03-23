<?php
// Template: Cabeçalho padrão para todos os e-mails
$url_base = "https://astros.koddahub.com.br";
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo ?? 'Aurora Scorpio'; ?></title>
    <style>
        /* Estilos base para e-mail */
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .header {
            background: linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .footer {
            background-color: #f8f5ff;
            padding: 25px 20px;
            text-align: center;
            font-size: 13px;
            color: #666;
            border-top: 1px solid #e9d5ff;
        }
        .content {
            padding: 40px 30px;
            background-color: #ffffff;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #6f42c1;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #5a32a3;
        }
        .btn:hover {
            background-color: #5a32a3;
        }
        .assinatura {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px dashed #8a5fd4;
            text-align: right;
            font-style: italic;
            color: #6f42c1;
        }
        @media only screen and (max-width: 480px) {
            .content { padding: 25px 15px; }
        }
    </style>
</head>
<body style="margin: 0; padding: 20px; background-color: #f0e9ff; font-family: Arial, sans-serif;">
    <div class="email-wrapper" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(111,66,193,0.1);">
        
        <!-- HEADER PADRÃO -->
        <div class="header" style="background: linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%); padding: 40px 20px; text-align: center;">
            <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 60px; height: 60px; margin-bottom: 15px; filter: brightness(0) invert(1);">
            <h1 style="color: #ffffff; margin: 10px 0; font-size: 28px; font-weight: 400;">Aurora Scorpio</h1>
            <p style="color: #ffdb7c; margin: 0; font-size: 14px;">Astrologia Mística & Autoconhecimento</p>
        </div>
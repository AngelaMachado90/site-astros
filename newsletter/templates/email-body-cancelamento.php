<?php
// Template: E-mail de confirmação de cancelamento
$email = $email ?? '';
$url_base = "https://astros.koddahub.com.br";
?>
        <div class="content" style="padding: 40px 30px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 40px; height: 40px; opacity: 0.5;">
            </div>
            
            <p style="font-size: 18px; color: #333; margin-bottom: 25px;">Olá,</p>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
                Sua inscrição na newsletter da <strong style="color: #6f42c1;">Aurora Scorpio</strong> foi cancelada com sucesso.
            </p>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6; margin: 30px 0;">
                Sentiremos sua falta! Se mudar de ideia, você pode se inscrever novamente quando quiser.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="<?php echo $url_base; ?>" class="btn" style="display: inline-block; padding: 12px 30px; background-color: #6f42c1; color: #ffffff; text-decoration: none; border-radius: 50px;">
                    Voltar ao site
                </a>
            </div>
            
            <div class="assinatura" style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #8a5fd4; text-align: right;">
                <p style="margin: 0; color: #6f42c1; font-style: italic;">Que os astros iluminem seu caminho</p>
                <p style="margin: 5px 0 0; color: #6f42c1; font-weight: bold;">Aurora Scorpio</p>
            </div>
        </div>
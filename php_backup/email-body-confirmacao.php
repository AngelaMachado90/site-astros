<?php
// Template: Corpo do e-mail de confirmação
$email = $email ?? ''; // Recebido do script principal
$url_base = "https://astros.koddahub.com.br";
?>
        <!-- CONTEÚDO PRINCIPAL -->
        <div class="content" style="padding: 40px 30px; background-color: #ffffff;">
            
            <!-- Estrelas decorativas -->
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 32px; height: 32px; opacity: 0.5; margin: 0 5px;">
                <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 40px; height: 40px; opacity: 0.8; margin: 0 5px;">
                <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 32px; height: 32px; opacity: 0.5; margin: 0 5px;">
            </div>
            
            <p style="font-size: 18px; color: #333; margin-bottom: 25px;">Olá,</p>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 20px;">
                Sua inscrição na <strong style="color: #6f42c1;">Newsletter Aurora Scorpio</strong> foi confirmada com sucesso!
            </p>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 30px;">
                Agora você receberá as previsões diárias diretamente no seu email, com a sabedoria dos astros para guiar seu dia.
            </p>
            
            <!-- Grid dos signos (opcional) -->
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin: 30px 0;">
                <?php
                $signos = ['aries', 'touro', 'gemeos', 'cancer', 'leao', 'virgem', 
                          'libra', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes'];
                foreach ($signos as $signo) {
                    echo "<div style='text-align: center;'>
                            <img src='{$url_base}/assets/icons/signos/{$signo}.svg' alt='' style='width: 35px; height: 35px; opacity: 0.7;'>
                          </div>";
                }
                ?>
            </div>
            
            <!-- Link de cancelamento -->
            <div style="text-align: center; margin: 35px 0 20px;">
                <a href="<?php echo $url_base; ?>/newsletter/cancelar.php?email=<?php echo urlencode($email); ?>" 
                   class="btn" style="display: inline-block; padding: 12px 30px; background-color: #6f42c1; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 14px;">
                    Cancelar inscrição
                </a>
            </div>
            
            <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
                Se você não se inscreveu, pode ignorar este e-mail.
            </p>
            
            <!-- Assinatura -->
            <div class="assinatura" style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #8a5fd4; text-align: right;">
                <p style="margin: 0; color: #6f42c1; font-style: italic;">Que os astros iluminem seu caminho</p>
                <p style="margin: 5px 0 0; color: #6f42c1; font-weight: bold;">Aurora Scorpio</p>
            </div>
        </div>
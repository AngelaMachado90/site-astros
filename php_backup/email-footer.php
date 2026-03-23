<?php
// Template: Rodapé padrão para todos os e-mails
$url_base = "https://astros.koddahub.com.br";
$ano = date('Y'); // Pega o ano atual dinamicamente
?>
        <!-- FOOTER PADRÃO -->
        <div class="footer" style="background-color: #f8f5ff; padding: 25px 20px; text-align: center; font-size: 13px; color: #666;">
            
            <!-- Logo estrela -->
            <img src="<?php echo $url_base; ?>/assets/email/star.svg" alt="" style="width: 20px; height: 20px; opacity: 0.5; margin-bottom: 10px;">
            
            <!-- Copyright -->
            <p style="margin: 5px 0;">© <?php echo $ano; ?> Aurora Scorpio. Todos os direitos reservados.</p>
            
            <!-- Links legais -->
            <p style="margin: 5px 0;">
                <a href="<?php echo $url_base; ?>/politica-privacidade.html" style="color: #6f42c1; text-decoration: none;">Política de Privacidade</a>
                <span style="margin: 0 8px; color: #8a5fd4;">|</span>
                <a href="<?php echo $url_base; ?>/termos-de-uso.html" style="color: #6f42c1; text-decoration: none;">Termos de Uso</a>
            </p>
            
            <!-- CRÉDITO KODDAHUB (sutil e profissional) -->
            <p style="margin: 15px 0 5px; font-size: 11px; color: #999; border-top: 1px solid #e9d5ff; padding-top: 15px;">
                <span style="opacity: 0.7;">desenvolvido por</span>
                <a href="https://www.koddahub.com.br" target="_blank" rel="noopener noreferrer" 
                   style="color: #6f42c1; text-decoration: none; font-weight: 500; margin-left: 4px;">
                    Kodda<span style="color: #ffc107;">Hub</span>
                </a>
            </p>
        </div>
    </div>
</body>
</html>
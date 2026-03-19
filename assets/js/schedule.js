// schedule.js - Versão Corrigida
(function(global) {
    'use strict';
    
    // ============================================
    // CONFIGURAÇÕES GLOBAIS
    // ============================================
    const CONFIG = {
        TIMEZONE: 'America/Sao_Paulo',
        DATA_PADRAO: '2026-03-18',
        DIA_ATUAL_CALENDARIO: '18',
        DIAS_COM_POST: ['12', '13', '14', '15', '16', '17', '18'],
        MESES: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]
    };

    // ============================================
    // DADOS DOS POSTS
    // ============================================
    const DADOS = {
        janeiroLua: {
            1: "Virgem", 2: "Libra", 3: "Libra", 4: "Escorpiao", 5: "Escorpiao",
            6: "Sagitario", 7: "Sagitario", 8: "Capricornio", 9: "Capricornio",
            10: "Aquario", 11: "Aquario", 12: "Peixes", 13: "Peixes", 14: "Áries",
            15: "Áries", 16: "Touro", 17: "Touro", 18: "Gêmeos", 19: "Gêmeos",
            20: "Cancer", 21: "Cancer", 22: "Leao", 23: "Leao", 24: "Virgem",
            25: "Virgem", 26: "Libra", 27: "Libra", 28: "Escorpiao", 29: "Escorpiao",
            30: "Sagitario", 31: "Sagitario"
        },
        
        fevereiroLua: {
            1: "Capricornio", 2: "Leao", 3: "Leao", 4: "Virgem", 5: "Virgem",
            6: "Libra", 7: "Libra", 8: "Escorpiao", 9: "Escorpiao", 10: "Sagitario"
        },
        
        marcoPosts: [
            { dia: 1, lua: "Libra", sol: "Peixes", titulo: "Previsão Diária - 01 de Março 2026", preview: "Lua em Libra traz harmonia para comecar o mes." },
            { dia: 2, lua: "Libra", sol: "Peixes", titulo: "Previsão Diária - 02 de Março 2026", preview: "Vênus em Peixes ativa a sensibilidade artística." },
            { dia: 3, lua: "Escorpiao", sol: "Peixes", titulo: "Previsão Diária - 03 de Março 2026", preview: "Intensidade emocional com Lua em Escorpiao." },
            { dia: 4, lua: "Escorpiao", sol: "Peixes", titulo: "Previsão Diária - 04 de Março 2026", preview: "Plutao em Aquario transforma relacoes." },
            { dia: 5, lua: "Sagitario", sol: "Peixes", titulo: "Previsão Diária - 05 de Março 2026", preview: "Otimismo e expansao com Lua em Sagitario." },
            { dia: 6, lua: "Sagitario", sol: "Peixes", titulo: "Previsão Diária - 06 de Março 2026", preview: "Jupiter em Cancer amplia a intuicao." },
            { dia: 7, lua: "Capricornio", sol: "Peixes", titulo: "Previsão Diária - 07 de Março 2026", preview: "Organização e foco com Lua em Capricornio." },
            { dia: 8, lua: "Capricornio", sol: "Peixes", titulo: "Previsão Diária - 08 de Março 2026", preview: "Saturno em Peixes estrutura sonhos." },
            { dia: 9, lua: "Aquario", sol: "Peixes", titulo: "Previsão Diária - 09 de Março 2026", preview: "Inovação e ideias originais." },
            { dia: 10, lua: "Aquario", sol: "Peixes", titulo: "Previsão Diária - 10 de Março 2026", preview: "Urano em Touro traz revolucoes praticas." },
            { dia: 11, lua: "Peixes (NOVA)", sol: "Peixes", titulo: "Lua Nova em Peixes", preview: "Lua Nova para renascimento espiritual e novos comecos." },
            { dia: 12, lua: "Peixes", sol: "Peixes", titulo: "Previsão Diária - 12 de Março 2026", preview: "Intuição elevada no pós-Lua Nova." },
            { dia: 13, lua: "Áries", sol: "Peixes", titulo: "Sexta-feira 13: Portal Mistico", preview: "Sexta-feira 13: transforme medo em poder.", destaque: true },
            { dia: 14, lua: "Áries", sol: "Peixes", titulo: "Previsão Diária - 14 de Março 2026", preview: "Marte em Gêmeos traz ação comunicativa." },
            { dia: 15, lua: "Touro", sol: "Peixes", titulo: "Previsão Diária - 15 de Março 2026", preview: "Estabilidade e prazer com Lua em Touro." },
            { dia: 16, lua: "Touro", sol: "Peixes", titulo: "Previsão Diária - 16 de Março 2026", preview: "Vênus em Peixes inspira amor romântico." },
            { dia: 17, lua: "Gêmeos", sol: "Peixes", titulo: "Previsão Diária - 17 de Março 2026", preview: "Comunicação acelerada com Lua em Gêmeos." },
            { dia: 18, lua: "Gêmeos", sol: "Peixes", titulo: "Previsão Diária - 18 de Março 2026", preview: "Mercúrio em Peixes aumenta a intuição." },
            { dia: 19, lua: "Cancer", sol: "Peixes", titulo: "Previsão Diária - 19 de Março 2026", preview: "Sensibilidade e acolhimento em foco." },
            { dia: 20, lua: "Cancer", sol: "Peixes", titulo: "Equinocio de Outono: Sol em Áries", preview: "Equinocio de Outono e inicio de novos comecos." },
            { dia: 21, lua: "Leao", sol: "Áries", titulo: "Previsão Diária - 21 de Março 2026", preview: "Criatividade e autoexpressao." },
            { dia: 22, lua: "Leao", sol: "Áries", titulo: "Previsão Diária - 22 de Março 2026", preview: "Coragem e iniciativa com Sol em Áries." },
            { dia: 23, lua: "Virgem", sol: "Áries", titulo: "Previsão Diária - 23 de Março 2026", preview: "Organização e analise." },
            { dia: 24, lua: "Virgem", sol: "Áries", titulo: "Previsão Diária - 24 de Março 2026", preview: "Mercúrio em Áries traz comunicação direta." },
            { dia: 25, lua: "Libra", sol: "Áries", titulo: "Previsão Diária - 25 de Março 2026", preview: "Equilibrio nas relacoes." },
            { dia: 26, lua: "Libra", sol: "Áries", titulo: "Previsão Diária - 26 de Março 2026", preview: "Amor incondicional com Vênus em Peixes." },
            { dia: 27, lua: "Escorpiao", sol: "Áries", titulo: "Previsão Diária - 27 de Março 2026", preview: "Profundidade emocional e transformação." },
            { dia: 28, lua: "Escorpiao", sol: "Áries", titulo: "Previsão Diária - 28 de Março 2026", preview: "Plutao transforma o coletivo." },
            { dia: 29, lua: "Sagitario (CHEIA)", sol: "Áries", titulo: "Lua Cheia em Sagitario", preview: "Lua Cheia com expansao, verdade e liberdade." },
            { dia: 30, lua: "Sagitario", sol: "Áries", titulo: "Previsão Diária - 30 de Março 2026", preview: "Integração de aprendizados apos a Lua Cheia." },
            { dia: 31, lua: "Capricornio", sol: "Áries", titulo: "Previsão Diária - 31 de Março 2026", preview: "Encerramento do mes com foco e organização." }
        ],
        
        postsUltimos7Dias: {
            "2026-03-18": {
                data_formatada: "18 MAR",
                lua: "🌙 Lua em Gêmeos",
                titulo: "Previsão Diária - 18 de Março 2026",
                conteudo: "Mercúrio em Peixes amplia a intuição. A comunicação flui com mais sensibilidade hoje.",
                lema: "Seja a pessoa capaz de sorrir no pior dos dias",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: "sorrir"
            },
            "2026-03-17": {
                data_formatada: "17 MAR",
                lua: "🌙 Lua em Gêmeos",
                titulo: "Previsão Diária - 17 de Março 2026",
                conteudo: "Comunicação acelerada com Lua em Gêmeos. Mente ágil e curiosa.",
                lema: "A pressa pode esperar, a paciência ensina",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            },
            "2026-03-16": {
                data_formatada: "16 MAR",
                lua: "🌙 Lua em Touro",
                titulo: "Previsão Diária - 16 de Março 2026",
                conteudo: "Vênus em Peixes inspira amor romântico e conexões profundas.",
                lema: "O amor é a única força que transforma o caos em paz",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            },
            "2026-03-15": {
                data_formatada: "15 MAR",
                lua: "🌙 Lua em Touro",
                titulo: "Previsão Diária - 15 de Março 2026",
                conteudo: "Estabilidade e prazer com Lua em Touro. Momento de apreciar as pequenas coisas.",
                lema: "A beleza está nos olhos de quem sabe esperar",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            },
            "2026-03-14": {
                data_formatada: "14 MAR",
                lua: "🌙 Lua em Áries",
                titulo: "Previsão Diária - 14 de Março 2026",
                conteudo: "Marte em Gêmeos traz ação comunicativa. Iniciativa e coragem.",
                lema: "A coragem não é ausência de medo, é ação apesar dele",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            },
            "2026-03-13": {
                data_formatada: "13 MAR",
                lua: "🌙 Lua em Peixes",
                titulo: "Previsão Diária - 13 de Março 2026",
                conteudo: "Intuição elevada. Momento de confiar nos pressentimentos.",
                lema: "A intuição é a voz da alma que o medo tenta calar",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            },
            "2026-03-12": {
                data_formatada: "12 MAR",
                lua: "🌙 Lua em Peixes",
                titulo: "Previsão Diária - 12 de Março 2026",
                conteudo: "Intuição elevada no pós-Lua Nova. Momento de semear intenções.",
                lema: "Plante hoje o que quer colher amanhã",
                lema_autor: "Aurora Scorpio",
                destaque_palavra: null
            }
        },
        
        signosArquivoData: [
            { nome: "Áries", slug: "aries", icone: "/assets/icons/signos/aries.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Touro", slug: "touro", icone: "/assets/icons/signos/touro.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Gêmeos", slug: "gemeos", icone: "/assets/icons/signos/gemeos.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Câncer", slug: "cancer", icone: "/assets/icons/signos/cancer.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Leão", slug: "leao", icone: "/assets/icons/signos/leao.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Virgem", slug: "virgem", icone: "/assets/icons/signos/virgem.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Libra", slug: "libra", icone: "/assets/icons/signos/libra.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Escorpião", slug: "escorpiao", icone: "/assets/icons/signos/escorpiao.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Sagitário", slug: "sagitario", icone: "/assets/icons/signos/sagitario.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Capricórnio", slug: "capricornio", icone: "/assets/icons/signos/capricornio.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Aquário", slug: "aquario", icone: "/assets/icons/signos/aquario.svg", posts: 12, ultimoPost: "2026-03-18" },
            { nome: "Peixes", slug: "peixes", icone: "/assets/icons/signos/peixes.svg", posts: 12, ultimoPost: "2026-03-18" }
        ]
    };

    // ============================================
    // FUNÇÕES UTILITÁRIAS
    // ============================================
    
    function escapeHtml(value) {
        if (!value) return '';
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function normalizarTexto(valor) {
        if (!valor) return '';
        return String(valor)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function normalizarSlugSigno(nome) {
        return normalizarTexto(nome)
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function normalizarElemento(elemento) {
        const elemNorm = normalizarTexto(elemento);
        if (elemNorm.includes("fogo")) return "fogo";
        if (elemNorm.includes("terra")) return "terra";
        if (elemNorm.includes("agua")) return "agua";
        return "ar";
    }

    function formatDatePretty(dateString) {
        if (!dateString || typeof window.AuroraSchedule?.formatDateLong !== 'function') {
            return dateString || '';
        }
        return window.AuroraSchedule.formatDateLong(dateString);
    }

    function formatarDataCurtaArquivo(dataIso) {
        if (!dataIso) return '';
        const [ano, mes, dia] = dataIso.split("-");
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const mesNome = meses[parseInt(mes, 10) - 1] || "Mar";
        return `${parseInt(dia, 10)} ${mesNome} ${ano}`;
    }

    function formatarDataPrevisoes(valorData) {
        const dataFormatada = formatDatePretty(valorData || window.AuroraSchedule?.getTodayISO?.() || CONFIG.DATA_PADRAO);
        return dataFormatada.replace(/ de ([a-zà-úç]+)/i, (_, mes) => 
            ` de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`
        );
    }

    // ============================================
    // GERAÇÃO DE POSTS
    // ============================================
    
    function gerarTodosPosts() {
        const posts = [];

        // Janeiro
        for (let dia = 1; dia <= 31; dia++) {
            const diaStr = String(dia).padStart(2, "0");
            const sol = dia >= 20 ? "Aquario" : "Capricornio";
            posts.push({
                id: `j${diaStr}`,
                arquivo: `diario-${diaStr}-01-2026.html`,
                data: `2026-01-${diaStr}`,
                titulo: `Previsão Diária - ${diaStr} de Janeiro de 2026`,
                lua: DADOS.janeiroLua[dia],
                sol,
                tipo: "diario",
                preview: `Energia de ${DADOS.janeiroLua[dia]} guiando o dia com foco em consciencia e autoconhecimento.`
            });
        }

        // Fevereiro
        for (let dia = 1; dia <= 10; dia++) {
            const diaStr = String(dia).padStart(2, "0");
            posts.push({
                id: `f${diaStr}`,
                arquivo: `diario-${diaStr}-02-2026.html`,
                data: `2026-02-${diaStr}`,
                titulo: `Previsão Diária - ${diaStr} de Fevereiro de 2026`,
                lua: DADOS.fevereiroLua[dia],
                sol: "Aquario",
                tipo: "diario",
                preview: `Dia de ${DADOS.fevereiroLua[dia]} com movimento astrológico voltado para clareza e transformação.`
            });
        }

        // Março
        DADOS.marcoPosts.forEach(post => {
            const diaStr = String(post.dia).padStart(2, "0");
            posts.push({
                id: `m${diaStr}`,
                arquivo: `diario-03-${diaStr}-2026.html`,
                data: `2026-03-${diaStr}`,
                titulo: post.titulo,
                lua: post.lua,
                sol: post.sol,
                tipo: "diario",
                preview: post.preview,
                destaque: post.destaque === true
            });
        });

        return posts;
    }

    // ============================================
    // INICIALIZAÇÃO PRINCIPAL
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔮 Inicializando Aurora Scorpio...');
        
        // Verificar se AuroraSchedule está disponível
        if (!window.AuroraSchedule) {
            console.error('AuroraSchedule não encontrado! Verifique se schedule.js foi carregado corretamente.');
            return;
        }

        // ============================================
        // OBTENÇÃO DA DATA ATUAL
        // ============================================
        const hoje = window.AuroraSchedule.getTodayISO();
        console.log('Data atual:', hoje);

        // ============================================
        // GERAÇÃO DE POSTS
        // ============================================
        const todosPosts = gerarTodosPosts();

        const postsDisponiveis = todosPosts
            .filter(post => window.AuroraSchedule.isPostAvailable(post.data))
            .sort((a, b) => b.data.localeCompare(a.data));

        // ============================================
        // ELEMENTOS DO DOM
        // ============================================
        const postsGrid = document.getElementById("posts-grid");
        const contador = document.getElementById("contador-posts");
        const botaoFiltros = document.querySelectorAll(".month-btn");
        const buscaInput = document.getElementById("busca");
        const calendario = document.getElementById("calendario");

        // ============================================
        // ÍCONES
        // ============================================
        const iconesSignos = {
            aries: "/assets/icons/signos/aries.svg",
            touro: "/assets/icons/signos/touro.svg",
            gemeos: "/assets/icons/signos/gemeos.svg",
            cancer: "/assets/icons/signos/cancer.svg",
            leao: "/assets/icons/signos/leao.svg",
            virgem: "/assets/icons/signos/virgem.svg",
            libra: "/assets/icons/signos/libra.svg",
            escorpiao: "/assets/icons/signos/escorpiao.svg",
            sagitario: "/assets/icons/signos/sagitario.svg",
            capricornio: "/assets/icons/signos/capricornio.svg",
            aquario: "/assets/icons/signos/aquario.svg",
            peixes: "/assets/icons/signos/peixes.svg"
        };

        const iconesElementos = {
            fogo: "bi-fire",
            terra: "bi-tree",
            ar: "bi-wind",
            agua: "bi-droplet"
        };

        // ============================================
        // FUNÇÕES DE RENDERIZAÇÃO
        // ============================================
        
        function criarCard(post) {
            const isEspecial = post.tipo === "especial";
            const cardClasse = isEspecial ? "special-card" : "";
            const tipoTexto = isEspecial
                ? `<span class="badge-especial"><i class="bi bi-stars"></i> Especial</span>`
                : `<span class="badge-post"><i class="bi bi-calendar3"></i> Post Diário</span><span class="badge-lua"><i class="bi bi-moon-stars"></i> Lua em ${post.lua}</span>`;

            const solInfo = isEspecial
                ? ""
                : `<span class="sol-info"><i class="bi bi-sun-fill meta-icon sun" aria-hidden="true"></i> Sol em ${post.sol || "—"}</span>`;
            
            const tituloLinkPost = escapeHtml(`Leia o post completo: ${post.titulo}`);

            return `
                <div class="col mb-4" data-data="${post.data}">
                    <article class="mystic-card ${cardClasse} h-100">
                        <div class="card-body d-flex flex-column h-100 p-3 gap-2">
                            <div class="card-badges">
                                ${tipoTexto}
                            </div>
                            <small class="text-muted"><i class="bi bi-calendar3 meta-icon"></i> ${formatDatePretty(post.data)}</small>
                            <h3 class="h5" style="margin-top:8px;">${escapeHtml(post.titulo)}</h3>
                            <p class="preview">${escapeHtml(post.preview)}</p>
                            <div class="d-flex justify-content-between align-items-center gap-2 mt-auto pt-2 flex-wrap">
                                ${solInfo}
                                <a href="posts/${post.arquivo}" class="btn-card" title="${tituloLinkPost}" aria-label="${tituloLinkPost}">Ler mais <i class="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        }

        function renderPosts(lista) {
            if (!postsGrid) return;
            
            postsGrid.innerHTML = "";
            const semDestaque = lista.filter((post) => !post.destaque);

            if (semDestaque.length === 0) {
                postsGrid.innerHTML = lista.length > 0
                    ? '<div class="col-12"><div class="nenhum-post">O resultado desta busca está na seção de post do dia.</div></div>'
                    : '<div class="col-12"><div class="nenhum-post">Nenhum post encontrado para este filtro.</div></div>';
                if (contador) contador.textContent = `${lista.length} publicações`;
                renderCalendario();
                return;
            }

            semDestaque.forEach((post) => {
                postsGrid.insertAdjacentHTML("beforeend", criarCard(post));
            });

            if (contador) contador.textContent = `${lista.length} publicações`;
            renderCalendario();
        }

        function filtrarPosts() {
            const mesSelecionado = document.querySelector(".month-btn.active")?.dataset.mes || "all";
            const busca = (buscaInput?.value || "").toLowerCase().trim();

            let filtrados = [...postsDisponiveis];

            if (mesSelecionado !== "all") {
                filtrados = filtrados.filter((post) =>
                    post.data.startsWith(mesSelecionado)
                );
            }

            if (busca) {
                filtrados = filtrados.filter((post) => {
                    const texto = [
                        formatDatePretty(post.data),
                        post.data,
                        post.lua,
                        post.sol,
                        post.titulo,
                        post.preview
                    ].join(" ").toLowerCase();

                    return texto.includes(busca);
                });
            }

            renderPosts(filtrados);
        }

        // ============================================
        // CALENDÁRIO
        // ============================================
        
        function renderizarCelulaCalendario(dia) {
            if (!dia) return "<td></td>";

            const diaStr = String(dia);
            if (diaStr === CONFIG.DIA_ATUAL_CALENDARIO) {
                return `<td class="dia-atual">${diaStr}</td>`;
            }

            if (CONFIG.DIAS_COM_POST.includes(diaStr)) {
                return `<td class="dia-com-post">${diaStr}</td>`;
            }

            return `<td class="text-muted">${diaStr}</td>`;
        }

        function gerarCalendarioMar2026() {
            const semanas = [
                [1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19, 20, 21],
                [22, 23, 24, 25, 26, 27, 28],
                [29, 30, 31, "", "", "", ""]
            ];

            const linhas = semanas
                .map(semana => {
                    const celulas = semana.map(dia => renderizarCelulaCalendario(dia)).join("");
                    return `<tr>${celulas}</tr>`;
                })
                .join("");

            return `
                <table class="table table-bordered text-center mb-0 align-middle">
                    <thead>
                        <tr>
                            <th>DOM</th>
                            <th>SEG</th>
                            <th>TER</th>
                            <th>QUA</th>
                            <th>QUI</th>
                            <th>SEX</th>
                            <th>SÁB</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhas}
                    </tbody>
                </table>
                <div class="mt-3 d-flex gap-3 small">
                    <div class="d-flex align-items-center gap-1">
                        <span class="dia-com-post" style="width: 20px; height: 20px; display: inline-block;"></span>
                        <span>Post publicado</span>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <span class="dia-atual" style="width: 20px; height: 20px; display: inline-block;"></span>
                        <span>Hoje</span>
                    </div>
                </div>
            `;
        }

        function renderCalendario() {
            if (!calendario) return;
            
            calendario.innerHTML = "";
            calendario.insertAdjacentHTML(
                "beforeend",
                `<div class="mb-2">${gerarCalendarioMar2026()}</div>`
            );
        }

        // ============================================
        // ARQUIVO POR SIGNO
        // ============================================
        
        function renderizarUltimosPostsSignos() {
            const container = document.getElementById("ultimos-posts-signos");
            if (!container) return;

            const html = DADOS.signosArquivoData
                .slice(0, 6)
                .map(signo => {
                    const badgeHoje = signo.ultimoPost === CONFIG.DATA_PADRAO
                        ? '<span class="badge-hoje">Hoje</span>'
                        : "";
                    const urlSigno = `signo-${signo.slug}.html`;
                    return `
                        <a href="${urlSigno}" class="signo-arquivo-item" aria-label="Abrir página de ${signo.nome}">
                            <img src="${signo.icone}" alt="${signo.nome}" class="icone-signo" width="32" height="32" />
                            <div class="info-signo">
                                <span class="nome-signo">${signo.nome}</span>
                                <span class="data-signo"> · ${formatarDataCurtaArquivo(signo.ultimoPost)}</span>
                            </div>
                            ${badgeHoje}
                        </a>
                    `;
                })
                .join("");

            container.innerHTML = html;
        }

        function renderizarGridSignosArquivo() {
            const container = document.getElementById("grid-signos-arquivo");
            if (!container) return;

            const html = DADOS.signosArquivoData
                .map(signo => {
                    const urlSigno = `signo-${signo.slug}.html`;
                    return `
                        <a href="${urlSigno}" class="arquivo-grid-item" aria-label="Ver arquivo de ${signo.nome}">
                            <img src="${signo.icone}" alt="${signo.nome}" class="icone-signo-grid" width="40" height="40" />
                            <span class="nome-signo-grid">${signo.nome}</span>
                            <span class="qtd-posts">${signo.posts} posts</span>
                        </a>
                    `;
                })
                .join("");

            container.innerHTML = html;
        }

        // ============================================
        // POSTS DINÂMICOS (ÚLTIMOS 7 DIAS)
        // ============================================
        
        function atualizarDestaqueVisualCardsDia(dataSelecionada) {
            const cards = document.querySelectorAll(".card-dia");
            cards.forEach(card => {
                card.classList.remove("card-destaque", "card-signo-ativo");
                card.classList.add("card-signo");
                card.setAttribute("aria-pressed", "false");
                
                const badge = card.querySelector(".badge-dourado, .badge");
                if (badge) badge.remove();
            });

            const cardSelecionado = document.querySelector(`.card-dia[data-dia="${dataSelecionada}"]`);
            if (!cardSelecionado) return;

            cardSelecionado.classList.remove("card-signo");
            cardSelecionado.classList.add("card-destaque", "card-signo-ativo");
            cardSelecionado.setAttribute("aria-pressed", "true");

            const corpoCard = cardSelecionado.querySelector(".card-body");
            if (!corpoCard) return;

            const badge = document.createElement("span");
            badge.className = "badge-dourado d-inline-block mb-2";
            badge.textContent = dataSelecionada === CONFIG.DATA_PADRAO ? " HOJE " : "ATUAL";
            corpoCard.insertBefore(badge, corpoCard.firstChild);
        }

        function atualizarPostDinamico(dataSelecionada) {
            const post = DADOS.postsUltimos7Dias[dataSelecionada];
            if (!post) return;

            const tituloEl = document.getElementById("post-titulo");
            const luaEl = document.getElementById("post-lua");
            const subtituloEl = document.getElementById("post-subtitulo");
            const conteudoEl = document.getElementById("post-conteudo");
            const lemaEl = document.getElementById("lema-texto");
            const autorEl = document.getElementById("lema-autor");
            const linkEl = document.getElementById("post-link");

            if (tituloEl) {
                const prefixo = dataSelecionada === CONFIG.DATA_PADRAO ? "HOJE • " : "";
                tituloEl.textContent = `${prefixo}${post.data_formatada}`;
            }
            
            if (luaEl) luaEl.innerHTML = post.lua;
            if (subtituloEl) subtituloEl.textContent = post.titulo;
            if (conteudoEl) conteudoEl.textContent = post.conteudo;
            
            if (lemaEl) {
                if (post.destaque_palavra) {
                    const palavraEscapada = post.destaque_palavra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    const regexDestaque = new RegExp(`(${palavraEscapada})`, "gi");
                    const lemaComDestaque = escapeHtml(post.lema).replace(
                        regexDestaque,
                        '<span class="palavra-destaque">$1</span>'
                    );
                    lemaEl.innerHTML = `"${lemaComDestaque}"`;
                } else {
                    lemaEl.innerHTML = `"${escapeHtml(post.lema)}"`;
                }
            }
            
            if (autorEl) autorEl.textContent = post.lema_autor || "Aurora Scorpio";

            if (linkEl) {
                const postRelacionado = postsDisponiveis.find(p => p.data === dataSelecionada);
                linkEl.setAttribute("href", postRelacionado ? `posts/${postRelacionado.arquivo}` : "#");
                linkEl.setAttribute("title", `Ler post completo de ${post.data_formatada}`);
                linkEl.setAttribute("aria-label", `Abrir post completo de ${post.data_formatada}`);
            }

            atualizarDestaqueVisualCardsDia(dataSelecionada);
        }

        function inicializarCardsUltimos7Dias() {
            const cards = document.querySelectorAll(".card-dia");
            if (!cards.length) return;

            cards.forEach(card => {
                card.addEventListener("click", () => {
                    atualizarPostDinamico(card.dataset.dia);
                });

                card.addEventListener("keydown", (evento) => {
                    if (evento.key === "Enter" || evento.key === " ") {
                        evento.preventDefault();
                        atualizarPostDinamico(card.dataset.dia);
                    }
                });
            });

            atualizarPostDinamico(CONFIG.DATA_PADRAO);
        }

        // ============================================
        // PREVISÕES DOS SIGNOS
        // ============================================
        
        const FALLBACK_PREVISOES = {
            data: hoje,
            signos: [],
            fallbackAviso: "Em breve: previsões diárias atualizadas. Selecione um signo novamente em alguns instantes."
        };

        const previsoesState = {
            todosSignos: [],
            filtroAtivo: null,
            fallbackAviso: "As previsões dos signos ainda não foram publicadas."
        };

        async function carregarPrevisoesDiarias() {
            try {
                const resposta = await fetch("/data/previsoes-diarias.json", { cache: "no-store" });
                if (!resposta.ok) throw new Error(`Falha ao carregar previsões: status ${resposta.status}`);
                
                const dados = await resposta.json();
                if (!dados || !Array.isArray(dados.signos)) throw new Error("Estrutura de previsões inválida.");
                
                return dados;
            } catch (erro) {
                console.warn("Não foi possível carregar /data/previsoes-diarias.json", erro);
                return { ...FALLBACK_PREVISOES };
            }
        }

        function criarCardSigno(signo) {
            const elementoSlug = normalizarElemento(signo.elemento || "Ar");
            const elementoLabel = { fogo: "Fogo", terra: "Terra", ar: "Ar", agua: "Água" }[elementoSlug] || "Ar";
            const iconeElemento = iconesElementos[elementoSlug] || "bi-stars";
            const nomeSigno = String(signo.nome || "Signo");
            const slugSigno = normalizarSlugSigno(nomeSigno);
            const urlSigno = `/signo-${slugSigno}.html`;
            const iconeSigno = iconesSignos[slugSigno] || "/assets/icons/star.svg";
            const nomeSignoEscapado = escapeHtml(nomeSigno);

            const areas = (signo.areas || [])
                .map(area => `<span class="badge text-bg-light border">${escapeHtml(area)}</span>`)
                .join("");

            return `
                <div class="previsao-signo card mb-4" data-signo="${slugSigno}" style="display: none;">
                    <div class="card-header d-flex align-items-center gap-2 flex-wrap">
                        <img src="${iconeSigno}" alt="Símbolo de ${nomeSignoEscapado}" title="Símbolo de ${nomeSignoEscapado}" width="24" height="24" />
                        <h3 class="h5 mb-0">${nomeSignoEscapado}</h3>
                        <span class="ms-2 text-muted small">
                            <i class="bi ${iconeElemento} me-1"></i>${elementoLabel}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <span class="badge text-bg-dark"><i class="bi bi-moon-stars me-1"></i>Lua em ${escapeHtml(signo.lua || "—")}</span>
                            <span class="badge text-bg-secondary"><i class="bi bi-sun-fill me-1"></i>Sol em ${escapeHtml(signo.sol || "—")}</span>
                        </div>
                        <p class="mb-3">${escapeHtml(signo.previsao || "")}</p>
                        <div class="d-flex flex-wrap gap-2 mb-3">${areas}</div>
                        <div class="p-3 bg-light rounded border-start border-4">
                            <strong>Dica do dia:</strong> ${escapeHtml(signo.dica || "Siga sua intuição com presença.")}
                        </div>
                        <div class="mt-3">
                            <a href="${urlSigno}" class="btn btn-outline-primary btn-sm">Ver signo completo</a>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderizarPrevisoesSignos(listaSignos) {
            const lista = document.getElementById("lista-previsoes-signos");
            if (!lista) return;

            lista.innerHTML = "";
            listaSignos.forEach(signo => {
                lista.insertAdjacentHTML("beforeend", criarCardSigno(signo));
            });
        }

        function inicializarFiltroSignos() {
            const botoes = document.querySelectorAll("#seletor-signos button");
            const previsoes = document.querySelectorAll(".previsao-signo");
            const estadoZero = document.getElementById("estado-zero");
            const btnMostrarTodos = document.getElementById("filtro-mostrar-todos") || document.getElementById("mostrar-todos");
            const btnLimparFiltro = document.getElementById("filtro-limpar") || document.getElementById("limpar-filtro");

            function esconderTodasPrevisoes() {
                previsoes.forEach(p => p.style.display = "none");
            }

            function resetarBotoes() {
                botoes.forEach(b => {
                    b.classList.remove("btn-primary", "btn-roxo", "text-white", "active");
                    b.classList.add("btn-outline-primary");
                });
            }

            function mostrarEstadoZero() {
                esconderTodasPrevisoes();
                if (estadoZero) estadoZero.style.display = "block";
                resetarBotoes();
            }

            function mostrarTodos() {
                previsoes.forEach(p => p.style.display = "block");
                if (estadoZero) estadoZero.style.display = "none";
                resetarBotoes();
            }

            botoes.forEach(botao => {
                botao.addEventListener("click", function onClickSigno() {
                    const { signo } = this.dataset;
                    esconderTodasPrevisoes();
                    if (estadoZero) estadoZero.style.display = "none";

                    const previsaoSelecionada = document.querySelector(`.previsao-signo[data-signo="${signo}"]`);
                    if (previsaoSelecionada) previsaoSelecionada.style.display = "block";

                    resetarBotoes();
                    this.classList.remove("btn-outline-primary");
                    this.classList.add("btn-primary", "text-white", "active");
                });
            });

            if (btnMostrarTodos) btnMostrarTodos.addEventListener("click", mostrarTodos);
            if (btnLimparFiltro) btnLimparFiltro.addEventListener("click", mostrarEstadoZero);

            mostrarEstadoZero();
        }

        async function inicializarPrevisoesSignos() {
            const previsoes = await carregarPrevisoesDiarias();
            previsoesState.todosSignos = Array.isArray(previsoes?.signos) ? previsoes.signos : [];
            previsoesState.fallbackAviso = previsoes?.fallbackAviso || FALLBACK_PREVISOES.fallbackAviso;

            // Atualizar cabeçalho
            const dataEl = document.getElementById("previsoes-data-atual");
            const luaEl = document.getElementById("previsoes-lua-global");
            const solEl = document.getElementById("previsoes-sol-global");

            if (dataEl) dataEl.textContent = formatarDataPrevisoes(previsoes?.data || hoje);
            
            const postReferencia = postsDisponiveis.find(p => p.data === (previsoes?.data || hoje));
            if (luaEl) luaEl.textContent = postReferencia?.lua || previsoes?.signos?.[0]?.lua || "—";
            if (solEl) solEl.textContent = postReferencia?.sol || previsoes?.signos?.[0]?.sol || "—";

            renderizarPrevisoesSignos(previsoesState.todosSignos);
            inicializarFiltroSignos();

            if (!previsoesState.todosSignos.length) {
                const estadoZero = document.getElementById("estado-zero");
                if (estadoZero) {
                    estadoZero.innerHTML = `
                        <img src="/assets/icons/star.svg" alt="Ícone de estrela" title="Ícone de estrela" width="48" height="48" class="mb-3 opacity-50" />
                        <p class="h5 mb-2">Previsões indisponíveis</p>
                        <p class="text-muted">${escapeHtml(previsoesState.fallbackAviso)}</p>
                    `;
                }
            }
        }

        // ============================================
        // NEWSLETTER
        // ============================================
        
        function bindNewsletterForm({ formId, inputId, msgId, successClass }) {
            const form = document.getElementById(formId);
            const input = document.getElementById(inputId);
            const msg = document.getElementById(msgId);

            if (!form || !input || !msg) return;

            form.addEventListener("submit", (evento) => {
                evento.preventDefault();
                const email = input.value.trim();

                if (!email) {
                    msg.className = `small mt-2 text-danger`;
                    msg.textContent = "Digite um e-mail válido para receber as previsões.";
                    return;
                }

                msg.className = `small mt-2 ${successClass}`;
                msg.textContent = "Inscrição realizada com sucesso! 💫";
                input.value = "";
            });
        }

        // ============================================
        // COOKIE CONSENT - LGPD
        // ============================================
        
        function initCookieConsent() {
            const cookieConsent = document.getElementById("cookieConsent");
            const cookiePreferencias = localStorage.getItem("cookieConsent");

            if (!cookiePreferencias) {
                setTimeout(() => {
                    if (cookieConsent) cookieConsent.style.display = "block";
                }, 1000);
            } else {
                aplicarPreferenciasCookies(JSON.parse(cookiePreferencias));
            }
        }

        function aceitarTodosCookies() {
            const preferencias = {
                necessarios: true,
                analytics: true,
                funcionais: true,
                data: new Date().toISOString()
            };

            localStorage.setItem("cookieConsent", JSON.stringify(preferencias));
            document.getElementById("cookieConsent").style.display = "none";
            aplicarPreferenciasCookies(preferencias);
            mostrarMensagemCookies("Preferências salvas com sucesso!");
        }

        function mostrarConfigCookies() {
            const configPanel = document.getElementById("cookieConfigPanel");
            const overlay = document.getElementById("cookieOverlay");

            const cookiePreferencias = localStorage.getItem("cookieConsent");
            if (cookiePreferencias) {
                const prefs = JSON.parse(cookiePreferencias);
                const analyticsCheck = document.getElementById("cookiesAnalytics");
                const funcionaisCheck = document.getElementById("cookiesFuncionais");
                if (analyticsCheck) analyticsCheck.checked = prefs.analytics;
                if (funcionaisCheck) funcionaisCheck.checked = prefs.funcionais;
            }

            if (configPanel) configPanel.style.display = "block";
            if (overlay) overlay.style.display = "block";
            if (cookieConsent) cookieConsent.style.display = "none";
        }

        function fecharConfigCookies() {
            const configPanel = document.getElementById("cookieConfigPanel");
            const overlay = document.getElementById("cookieOverlay");
            
            if (configPanel) configPanel.style.display = "none";
            if (overlay) overlay.style.display = "none";

            if (!localStorage.getItem("cookieConsent")) {
                const cookieConsent = document.getElementById("cookieConsent");
                if (cookieConsent) cookieConsent.style.display = "block";
            }
        }

        function salvarConfigCookies() {
            const analyticsCheck = document.getElementById("cookiesAnalytics");
            const funcionaisCheck = document.getElementById("cookiesFuncionais");
            
            const preferencias = {
                necessarios: true,
                analytics: analyticsCheck ? analyticsCheck.checked : true,
                funcionais: funcionaisCheck ? funcionaisCheck.checked : true,
                data: new Date().toISOString()
            };

            localStorage.setItem("cookieConsent", JSON.stringify(preferencias));
            fecharConfigCookies();
            aplicarPreferenciasCookies(preferencias);
            mostrarMensagemCookies("Preferências de cookies salvas!");
        }

        function aplicarPreferenciasCookies(prefs) {
            if (typeof gtag !== "undefined") {
                gtag("consent", "update", {
                    analytics_storage: prefs.analytics ? "granted" : "denied"
                });
            }
            console.log(prefs.analytics ? "Analytics ativado" : "Analytics desativado");
        }

        function mostrarMensagemCookies(texto) {
            const toast = document.createElement("div");
            toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: #6f42c1;
                color: #ffc107;
                padding: 0.75rem 1.5rem;
                border-radius: 999px;
                font-size: 0.9rem;
                z-index: 100001;
                border: 1px solid #ffc107;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease-out;
            `;
            toast.textContent = texto;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = "slideUp 0.3s reverse ease-out";
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }

        // ============================================
        // MENU ATIVO
        // ============================================
        
        function ativarMenuAtivo() {
            const caminhoAtual = window.location.pathname;
            const menu = document.querySelectorAll(".nav-link-cosmic");
            menu.forEach(link => {
                const href = link.getAttribute("href");
                if (href === caminhoAtual || (caminhoAtual === "/" && link.textContent.includes("Início"))) {
                    link.classList.add("active");
                }
            });
        }

        // ============================================
        // VERIFICAÇÃO DE DUPLICATAS
        // ============================================
        
        function verificarDuplicatas() {
            const arquivos = todosPosts.map(post => post.arquivo);
            const duplicatas = arquivos.filter((item, index) => arquivos.indexOf(item) !== index);
            if (duplicatas.length) {
                console.warn("⚠️ Posts duplicados encontrados:", [...new Set(duplicatas)]);
            }
        }

        // ============================================
        // APLICAR FILTRO PADRÃO
        // ============================================
        
        function aplicarFiltroPadrao() {
            const mesPadrao = botaoFiltros && [...botaoFiltros].find(btn => btn.dataset.mes === hoje.slice(0, 7));
            if (mesPadrao && !mesPadrao.classList.contains("active")) {
                botaoFiltros.forEach(btn => btn.classList.remove("active"));
                mesPadrao.classList.add("active");
            }
        }

        // ============================================
        // EVENT LISTENERS
        // ============================================
        
        botaoFiltros.forEach(btn => {
            btn.addEventListener("click", () => {
                botaoFiltros.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                filtrarPosts();
            });
        });

        if (buscaInput) {
            buscaInput.addEventListener("input", filtrarPosts);
        }

        // ============================================
        // INICIALIZAÇÃO GERAL
        // ============================================
        
        verificarDuplicatas();
        inicializarCardsUltimos7Dias();
        aplicarFiltroPadrao();
        filtrarPosts();
        renderizarUltimosPostsSignos();
        renderizarGridSignosArquivo();
        inicializarPrevisoesSignos();
        ativarMenuAtivo();
        
        // Newsletter
        bindNewsletterForm({
            formId: "form-newsletter",
            inputId: "email-news",
            msgId: "msg-news",
            successClass: "text-success"
        });

        // Cookie Consent
        initCookieConsent();
        
        // Expor funções globalmente se necessário
        window.auroraFunctions = {
            aceitarTodosCookies,
            mostrarConfigCookies,
            fecharConfigCookies,
            salvarConfigCookies,
            filtrarPosts
        };

        console.log('Aurora Scorpio inicializado com sucesso!');
    });

})(window);
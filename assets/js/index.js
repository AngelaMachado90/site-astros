      const schedule = window.AuroraSchedule;
      const dataAtual = schedule.getDateParts(
        new Date(),
        schedule.BLOG_TIMEZONE,
      );
      const hoje = dataAtual.iso;
      const todosPosts = [];

      const janeiroLua = {
        1: "Virgem",
        2: "Libra",
        3: "Libra",
        4: "Escorpiao",
        5: "Escorpiao",
        6: "Sagitario",
        7: "Sagitario",
        8: "Capricornio",
        9: "Capricornio",
        10: "Aquario",
        11: "Aquario",
        12: "Peixes",
        13: "Peixes",
        14: "Áries",
        15: "Áries",
        16: "Touro",
        17: "Touro",
        18: "Gêmeos",
        19: "Gêmeos",
        20: "Cancer",
        21: "Cancer",
        22: "Leao",
        23: "Leao",
        24: "Virgem",
        25: "Virgem",
        26: "Libra",
        27: "Libra",
        28: "Escorpiao",
        29: "Escorpiao",
        30: "Sagitario",
        31: "Sagitario",
      };

      const fevereiroLua = {
        1: "Capricornio",
        2: "Leao",
        3: "Leao",
        4: "Virgem",
        5: "Virgem",
        6: "Libra",
        7: "Libra",
        8: "Escorpiao",
        9: "Escorpiao",
        10: "Sagitario",
      };

      const marcoPosts = [
        {
          dia: 1,
          lua: "Libra",
          sol: "Peixes",
          titulo: "Previsão Diária - 01 de Março 2026",
          preview: "Lua em Libra traz harmonia para comecar o mes.",
        },
        {
          dia: 2,
          lua: "Libra",
          sol: "Peixes",
          titulo: "Previsão Diária - 02 de Março 2026",
          preview: "Venus em Peixes ativa a sensibilidade artistica.",
        },
        {
          dia: 3,
          lua: "Escorpiao",
          sol: "Peixes",
          titulo: "Previsão Diária - 03 de Março 2026",
          preview: "Intensidade emocional com Lua em Escorpiao.",
        },
        {
          dia: 4,
          lua: "Escorpiao",
          sol: "Peixes",
          titulo: "Previsão Diária - 04 de Março 2026",
          preview: "Plutao em Aquario transforma relacoes.",
        },
        {
          dia: 5,
          lua: "Sagitario",
          sol: "Peixes",
          titulo: "Previsão Diária - 05 de Março 2026",
          preview: "Otimismo e expansao com Lua em Sagitario.",
        },
        {
          dia: 6,
          lua: "Sagitario",
          sol: "Peixes",
          titulo: "Previsão Diária - 06 de Março 2026",
          preview: "Jupiter em Cancer amplia a intuicao.",
        },
        {
          dia: 7,
          lua: "Capricornio",
          sol: "Peixes",
          titulo: "Previsão Diária - 07 de Março 2026",
          preview: "Organização e foco com Lua em Capricornio.",
        },
        {
          dia: 8,
          lua: "Capricornio",
          sol: "Peixes",
          titulo: "Previsão Diária - 08 de Março 2026",
          preview: "Saturno em Peixes estrutura sonhos.",
        },
        {
          dia: 9,
          lua: "Aquario",
          sol: "Peixes",
          titulo: "Previsão Diária - 09 de Março 2026",
          preview: "Inovação e ideias originais.",
        },
        {
          dia: 10,
          lua: "Aquario",
          sol: "Peixes",
          titulo: "Previsão Diária - 10 de Março 2026",
          preview: "Urano em Touro traz revolucoes praticas.",
        },
        {
          dia: 11,
          lua: "Peixes (NOVA)",
          sol: "Peixes",
          titulo: "Lua Nova em Peixes",
          preview: "Lua Nova para renascimento espiritual e novos comecos.",
        },
        {
          dia: 12,
          lua: "Peixes",
          sol: "Peixes",
          titulo: "Previsão Diária - 12 de Março 2026",
          preview: "Intuicao elevada no pos-Lua Nova.",
        },
        {
          dia: 13,
          lua: "Áries",
          sol: "Peixes",
          titulo: "Sexta-feira 13: Portal Mistico",
          preview: "Sexta-feira 13: transforme medo em poder.",
          destaque: true,
        },
        {
          dia: 14,
          lua: "Áries",
          sol: "Peixes",
          titulo: "Previsão Diária - 14 de Março 2026",
          preview: "Marte em Gêmeos traz ação comunicativa.",
        },
        {
          dia: 15,
          lua: "Touro",
          sol: "Peixes",
          titulo: "Previsão Diária - 15 de Março 2026",
          preview: "Estabilidade e prazer com Lua em Touro.",
        },
        {
          dia: 16,
          lua: "Touro",
          sol: "Peixes",
          titulo: "Previsão Diária - 16 de Março 2026",
          preview: "Venus em Peixes inspira amor romantico.",
        },
        {
          dia: 17,
          lua: "Gêmeos",
          sol: "Peixes",
          titulo: "Previsão Diária - 17 de Março 2026",
          preview: "Comunicação acelerada com Lua em Gêmeos.",
        },
        {
          dia: 18,
          lua: "Gêmeos",
          sol: "Peixes",
          titulo: "Previsão Diária - 18 de Março 2026",
          preview: "Mercurio em Peixes aumenta a intuicao.",
        },
        {
          dia: 19,
          lua: "Cancer",
          sol: "Peixes",
          titulo: "Previsão Diária - 19 de Março 2026",
          preview: "Sensibilidade e acolhimento em foco.",
        },
        {
          dia: 20,
          lua: "Cancer",
          sol: "Peixes",
          titulo: "Equinocio de Outono: Sol em Áries",
          preview: "Equinocio de Outono e inicio de novos comecos.",
        },
        {
          dia: 21,
          lua: "Leao",
          sol: "Áries",
          titulo: "Previsão Diária - 21 de Março 2026",
          preview: "Criatividade e autoexpressao.",
        },
        {
          dia: 22,
          lua: "Leao",
          sol: "Áries",
          titulo: "Previsão Diária - 22 de Março 2026",
          preview: "Coragem e iniciativa com Sol em Áries.",
        },
        {
          dia: 23,
          lua: "Virgem",
          sol: "Áries",
          titulo: "Previsão Diária - 23 de Março 2026",
          preview: "Organização e analise.",
        },
        {
          dia: 24,
          lua: "Virgem",
          sol: "Áries",
          titulo: "Previsão Diária - 24 de Março 2026",
          preview: "Mercurio em Áries traz comunicação direta.",
        },
        {
          dia: 25,
          lua: "Libra",
          sol: "Áries",
          titulo: "Previsão Diária - 25 de Março 2026",
          preview: "Equilibrio nas relacoes.",
        },
        {
          dia: 26,
          lua: "Libra",
          sol: "Áries",
          titulo: "Previsão Diária - 26 de Março 2026",
          preview: "Amor incondicional com Venus em Peixes.",
        },
        {
          dia: 27,
          lua: "Escorpiao",
          sol: "Áries",
          titulo: "Previsão Diária - 27 de Março 2026",
          preview: "Profundidade emocional e transformação.",
        },
        {
          dia: 28,
          lua: "Escorpiao",
          sol: "Áries",
          titulo: "Previsão Diária - 28 de Março 2026",
          preview: "Plutao transforma o coletivo.",
        },
        {
          dia: 29,
          lua: "Sagitario (CHEIA)",
          sol: "Áries",
          titulo: "Lua Cheia em Sagitario",
          preview: "Lua Cheia com expansao, verdade e liberdade.",
        },
        {
          dia: 30,
          lua: "Sagitario",
          sol: "Áries",
          titulo: "Previsão Diária - 30 de Março 2026",
          preview: "Integração de aprendizados apos a Lua Cheia.",
        },
        {
          dia: 31,
          lua: "Capricornio",
          sol: "Áries",
          titulo: "Previsão Diária - 31 de Março 2026",
          preview: "Encerramento do mes com foco e organização.",
        },
      ];

      for (let dia = 1; dia <= 31; dia += 1) {
        const diaStr = String(dia).padStart(2, "0");
        const sol = dia >= 20 ? "Aquario" : "Capricornio";

        todosPosts.push({
          id: `j${diaStr}`,
          arquivo: `diario-${diaStr}-01-2026.html`,
          data: `2026-01-${diaStr}`,
          titulo: `Previsão Diária - ${diaStr} de Janeiro de 2026`,
          lua: janeiroLua[dia],
          sol,
          tipo: "diario",
          preview: `Energia de ${janeiroLua[dia]} guiando o dia com foco em consciencia e autoconhecimento.`,
        });
      }

      for (let dia = 1; dia <= 10; dia += 1) {
        const diaStr = String(dia).padStart(2, "0");

        todosPosts.push({
          id: `f${diaStr}`,
          arquivo: `diario-${diaStr}-02-2026.html`,
          data: `2026-02-${diaStr}`,
          titulo: `Previsão Diária - ${diaStr} de Fevereiro de 2026`,
          lua: fevereiroLua[dia],
          sol: "Aquario",
          tipo: "diario",
          preview: `Dia de ${fevereiroLua[dia]} com movimento astrológico voltado para clareza e transformação.`,
        });
      }

      marcoPosts.forEach((post) => {
        const diaStr = String(post.dia).padStart(2, "0");
        todosPosts.push({
          id: `m${diaStr}`,
          arquivo: `diario-03-${diaStr}-2026.html`,
          data: `2026-03-${diaStr}`,
          titulo: post.titulo,
          lua: post.lua,
          sol: post.sol,
          tipo: "diario",
          preview: post.preview,
          destaque: post.destaque === true,
        });
      });

      const mesNomes = schedule.MONTHS_PT;
      const postsDisponiveis = todosPosts
        .filter((post) => schedule.isPostAvailable(post.data, hoje))
        .sort((a, b) => b.data.localeCompare(a.data));
      const postsGrid = document.getElementById("posts-grid");
      const featuredEl = document.getElementById("featured-post");
      const contador = document.getElementById("contador-posts");
      const botaoFiltros = document.querySelectorAll(".month-btn");
      const buscaInput = document.getElementById("busca");
      const calendario = document.getElementById("calendario");
      const mesesComPosts = [...new Set(todosPosts.map((post) => post.data.slice(0, 7)))].sort();

      function formatDatePretty(dateString) {
        return schedule.formatDateLong(dateString);
      }

      function escapeHtml(value) {
        return String(value || "")
          .replaceAll("&", "&amp;")
          .replaceAll('"', "&quot;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
      }

      const simbolosSignos = {
        aries: "♈",
        touro: "♉",
        gemeos: "♊",
        cancer: "♋",
        leao: "♌",
        virgem: "♍",
        libra: "♎",
        escorpiao: "♏",
        sagitario: "♐",
        capricornio: "♑",
        aquario: "♒",
        peixes: "♓",
      };

      const iconesSignos = {
        aries: "bi-fire",
        touro: "bi-tree",
        gemeos: "bi-chat-dots",
        cancer: "bi-heart",
        leao: "bi-sun",
        virgem: "bi-flower1",
        libra: "bi-balance-scale",
        escorpiao: "bi-lightning",
        sagitario: "bi-bullseye",
        capricornio: "bi-mountain",
        aquario: "bi-wind",
        peixes: "bi-droplet"
      };

      function normalizarSlugSigno(nome) {
        return String(nome || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      function formatarDataPrevisoes(valorData) {
        const capitalizarMes = (texto) =>
          texto.replace(
            / de ([a-zà-úç]+)/i,
            (_, mes) => ` de ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`,
          );

        if (!valorData) {
          return capitalizarMes(formatDatePretty(hoje));
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(valorData)) {
          return capitalizarMes(formatDatePretty(valorData));
        }

        return valorData;
      }

      // UI/SEO: fallback para quando o JSON de previsões não estiver disponível.
      const FALLBACK_PREVISOES = {
        data: hoje,
        signos: [],
        fallbackAviso: "🌟 Em breve: previsões diárias atualizadas",
      };

      async function carregarPrevisoesDiarias() {
        try {
          const resposta = await fetch("/data/previsoes-diarias.json", {
            cache: "no-store",
          });

          if (!resposta.ok) {
            throw new Error(
              `Falha ao carregar previsões: status ${resposta.status}`,
            );
          }

          const dados = await resposta.json();
          if (!dados || !Array.isArray(dados.signos)) {
            throw new Error("Estrutura de previsões inválida.");
          }

          return dados;
        } catch (erro) {
          console.warn("⚠️ Não foi possível carregar /data/previsoes-diarias.json", erro);
          return { ...FALLBACK_PREVISOES };
        }
      }

      function criarCardSigno(signo) {
        const coresElemento = {
          Fogo: "#c62828",
          Terra: "#2e7d32",
          Ar: "#1565c0",
          Água: "#01579b",
        };

        const bgElemento = {
          Fogo: "#ffebee",
          Terra: "#e8f5e8",
          Ar: "#e3f2fd",
          Água: "#e1f5fe",
        };

        const elemento = signo.elemento || "Fogo";
        const cor = coresElemento[elemento] || "#4c2a85";
        const bgCor = bgElemento[elemento] || "#f0e6ff";
        const nomeSigno = String(signo.nome || "Signo");
        const slugSigno = normalizarSlugSigno(nomeSigno);
        const urlSigno = `/signo-${slugSigno}.html`;
        const iconeSigno = iconesSignos[slugSigno] || "bi-stars";
        const iconeSignoRender = iconeSigno === "bi-balance-scale" ? "bi-bezier2" : iconeSigno;
        const titleSigno = escapeHtml(`Ver tudo sobre o signo de ${nomeSigno}`);
        const ariaSigno = escapeHtml(`Abrir página do signo ${nomeSigno}`);
        const nomeSignoEscapado = escapeHtml(nomeSigno);

        const iconesAreas = {
          amor: "❤️",
          dinheiro: "💰",
          amizades: "👥",
          trabalho: "💼",
          estudos: "📚",
          família: "🏠",
          familia: "🏠",
          saúde: "🩺",
          saude: "🩺",
        };

        const areas = (signo.areas || [])
          .map((area) => {
            const areaKey = area
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const icone = iconesAreas[areaKey] || "✨";
            return `<span class="badge" style="background: ${bgCor}; color: ${cor}; padding: 0.35rem 0.75rem; border-radius: 999px; font-size: 0.75rem; margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">
      ${icone} ${area}
    </span>`;
          })
          .join("");

        return `
    <div class="signo-card" style="border-left: 4px solid ${cor};">
      <div class="signo-header">
        <h3 class="signo-nome">
          <a
            href="${urlSigno}"
            title="${titleSigno}"
            aria-label="${ariaSigno}"
            style="color: inherit; text-decoration: none;"
          ><i class="bi ${iconeSignoRender}" style="margin-right: 6px"></i>${nomeSignoEscapado}</a>
        </h3>
        <span class="elemento-badge elemento-${elemento}">${elemento}</span>
      </div>
      <div style="margin-bottom: 1rem;">
        <span style="background: var(--cosmic-purple); color: white; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.7rem; margin-right: 0.5rem;">🌙 Lua em ${signo.lua}</span>
        <span style="background: var(--soft-gold); color: var(--midnight-blue); padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.7rem;">☀️ Sol em ${signo.sol}</span>
      </div>
      <p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; flex: 1;">${signo.previsao}</p>
      <div style="margin-bottom: 1rem;">${areas}</div>
      <div style="background: ${bgCor}50; padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; border-left: 3px solid ${cor};">
        <strong>✨ Dica do dia:</strong> ${signo.dica}
      </div>
      <div class="mt-3">
        <a
          href="${urlSigno}"
          class="btn-cosmic-small"
          title="${titleSigno}"
          aria-label="${ariaSigno}"
        ><i class="bi bi-arrow-right-circle" style="margin-right: 6px"></i>Ver signo completo</a>
      </div>
    </div>
  `;
      }

      function atualizarCabecalhoPrevisoes(previsoes) {
        const dataEl = document.getElementById("previsoes-data-atual");
        const luaEl = document.getElementById("previsoes-lua-global");
        const solEl = document.getElementById("previsoes-sol-global");

        if (!dataEl || !luaEl || !solEl) {
          return;
        }

        dataEl.textContent = formatarDataPrevisoes(previsoes?.data || hoje);

        const postReferencia = postsDisponiveis.find(
          (post) => post.data === (previsoes?.data || hoje),
        );
        const luaGlobal = postReferencia?.lua || previsoes?.signos?.[0]?.lua || "—";
        const solGlobal = postReferencia?.sol || previsoes?.signos?.[0]?.sol || "—";

        luaEl.textContent = luaGlobal;
        solEl.textContent = solGlobal;
      }

      function atualizarAlertaEspecial(previsoes) {
        const alerta = document.getElementById("alerta-astrologico");
        const chamada = document.getElementById("chamada-especial");
        const ctaLink = document.getElementById("cta-especial-link");
        const ctaTexto = document.getElementById("cta-especial-texto");

        if (!alerta || !chamada || !ctaLink || !ctaTexto) {
          return;
        }

        const mostrarAlerta = Boolean(
          previsoes?.anoNovoAstrologico && previsoes?.chamadaEspecial,
        );

        alerta.classList.toggle("d-none", !mostrarAlerta);

        if (!mostrarAlerta) {
          return;
        }

        chamada.textContent = previsoes.chamadaEspecial;
        ctaTexto.textContent = previsoes?.ctaEspecial?.texto || "Ver mais";
        ctaLink.setAttribute(
          "href",
          previsoes?.ctaEspecial?.link || "/live-ano-novo-astrologico/",
        );
        const tituloCta = previsoes?.ctaEspecial?.texto
          ? `Acessar: ${previsoes.ctaEspecial.texto}`
          : "Acessar conteúdo especial de astrologia";
        ctaLink.setAttribute("title", tituloCta);
        ctaLink.setAttribute("aria-label", tituloCta);
      }

      function renderizarPrevisoesSignos(previsoes) {
        const grid = document.getElementById("grid-signos");
        if (!grid) {
          return;
        }

        grid.innerHTML = "";
        const signos = previsoes?.signos || [];

        if (!signos.length) {
          const mensagemFallback = escapeHtml(
            previsoes?.fallbackAviso ||
              "🌙 As previsões dos signos ainda não foram publicadas.",
          );
          grid.innerHTML =
            `<div class="col-12"><div class="nenhum-post">${mensagemFallback}</div></div>`;
          return;
        }

        signos.forEach((signo) => {
          grid.insertAdjacentHTML("beforeend", criarCardSigno(signo));
        });
      }

      async function inicializarPrevisoesSignos() {
        const grid = document.getElementById("grid-signos");
        if (!grid) return;

        let previsoes = null;

        try {
          const resposta = await fetch("/data/previsoes-diarias.json", {
            cache: "no-store",
          });
          if (resposta.ok) {
            previsoes = await resposta.json();
          }
        } catch (erro) {
          console.warn("Arquivo JSON não encontrado, usando dados de fallback");
        }

        // Se não carregou ou está vazio, usa DADOS FALLBACK IGUAL À IMAGEM
        if (!previsoes?.signos?.length) {
          previsoes = {
            data: "2026-03-15",
            signos: [
              {
                nome: "ÁRIES",
                elemento: "Fogo",
                lua: "Áries",
                sol: "Peixes",
                previsao:
                  "Lua e Vênus prometem um domingo cheio de diversão e interações sociais. Só vale cuidar dos impulsos com dinheiro e evitar decisões no calor do momento.",
                dica: "No amor, sinceridade e jogo limpo vão fazer toda diferença.",
                areas: ["amor", "dinheiro", "amizades"],
              },
              {
                nome: "TOURO",
                elemento: "Terra",
                lua: "Touro",
                sol: "Peixes",
                previsao:
                  "O domingo pede ajustes inteligentes na vida financeira e mais clareza em acordos com outras pessoas.",
                dica: "Se bater tensão em tarefas coletivas, respire antes de responder.",
                areas: ["dinheiro", "trabalho", "amizades"],
              },
              {
                nome: "GÊMEOS",
                elemento: "Ar",
                lua: "Gêmeos",
                sol: "Peixes",
                previsao:
                  "Sua mente está ágil, curiosa e cheia de ideias novas para reinventar projetos.",
                dica: "Conversas importantes podem abrir portas, desde que você evite prometer mais do que consegue cumprir.",
                areas: ["estudos", "trabalho", "amizades"],
              },
              {
                nome: "CÂNCER",
                elemento: "Água",
                lua: "Câncer",
                sol: "Peixes",
                previsao:
                  "As emoções ficam mais visíveis e você tende a captar tudo ao redor com intensidade.",
                dica: "O dia favorece acolhimento, reconciliações e organização da rotina doméstica.",
                areas: ["família", "amizades", "saúde"],
              },
            ],
            chamadaEspecial:
              "Ano Novo Astrológico + 5 planetas em Áries = energia máxima de começar coisas novas. Quer saber onde isso bate no seu Mapa Astral?",
            ctaEspecial: {
              texto: "Vem pra live (grátis)!",
              link: "/live-ano-novo-astrologico/",
            },
          };
        }

        // Atualiza cabeçalho
        const dataEl = document.getElementById("previsoes-data-atual");
        const luaEl = document.getElementById("previsoes-lua-global");
        const solEl = document.getElementById("previsoes-sol-global");

        if (dataEl) dataEl.textContent = previsoes.data || "15 de Março de 2026";
        if (luaEl) luaEl.textContent = "Touro";
        if (solEl) solEl.textContent = "Peixes";

        // Mostra alerta especial
        const alerta = document.getElementById("alerta-astrologico");
        const chamada = document.getElementById("chamada-especial");
        const ctaLink = document.getElementById("cta-especial-link");
        const ctaTexto = document.getElementById("cta-especial-texto");

        if (alerta && previsoes.chamadaEspecial) {
          alerta.classList.remove("d-none");
          if (chamada) chamada.textContent = previsoes.chamadaEspecial;
          if (ctaTexto)
            ctaTexto.textContent =
              previsoes.ctaEspecial?.texto || "Vem pra live (grátis)!";
          if (ctaLink) ctaLink.href = previsoes.ctaEspecial?.link || "#";
        }

        // Renderiza os cards
        grid.innerHTML = "";
        previsoes.signos.forEach((signo) => {
          grid.insertAdjacentHTML("beforeend", criarCardSigno(signo));
        });
      }

      function setMesAtivo(chaveMes) {
        const botaoAlvo = [...botaoFiltros].find(
          (btn) => btn.dataset.mes === chaveMes,
        );

        if (!botaoAlvo) {
          return;
        }

        botaoFiltros.forEach((btn) => btn.classList.remove("active"));
        botaoAlvo.classList.add("active");
        filtrarPosts();
      }

      function ativarTooltips() {
        if (!window.bootstrap?.Tooltip) {
          return;
        }

        document
          .querySelectorAll('[data-bs-toggle="tooltip"]')
          .forEach((elemento) => {
            window.bootstrap.Tooltip.getOrCreateInstance(elemento, {
              container: "body",
              trigger: "hover focus",
            });
          });
      }

      function renderFeatured() {
        const postHoje =
          postsDisponiveis.find((post) => post.data === hoje) ||
          postsDisponiveis[0];

        if (!postHoje) {
          featuredEl.innerHTML = `
                    <div class="nenhum-post">
                        🌙 Ainda não há publicações liberadas para exibir.
                    </div>
                `;
          return;
        }

        const [, mesHoje] = postHoje.data.split("-");
        const mesHojeNome = mesNomes[parseInt(mesHoje, 10) - 1].toUpperCase();
        const diaHojeLabel = String(parseInt(postHoje.data.split("-")[2], 10));
        const badgeTexto =
          postHoje.data === hoje
            ? `✨ HOJE • ${diaHojeLabel} DE ${mesHojeNome} ✨`
            : `✨ DESTAQUE • ${diaHojeLabel} DE ${mesHojeNome} ✨`;
        const tituloLinkDestaque = escapeHtml(
          `Leia o post completo: ${postHoje.titulo}`,
        );

        featuredEl.innerHTML = `
                <div class="row g-4 align-items-center">
                    <div class="col-md-7">
                        <div class="post-destaque">
                            <div class="destaque-badge">
                                <span class="badge-hoje">${badgeTexto}</span>
                            </div>
                            <h3 class="destaque-titulo">${postHoje.titulo}</h3>
                            <div class="destaque-meta">
                                <span><i class="bi bi-calendar3 meta-icon"></i> ${formatDatePretty(postHoje.data)}</span>
                                <span><i class="bi bi-moon-stars meta-icon"></i> Lua em ${postHoje.lua}</span>
                                <span><i class="bi bi-sun-fill meta-icon sun"></i> Sol em ${postHoje.sol || "—"}</span>
                            </div>
                            <p class="destaque-texto">${postHoje.preview}</p>
                            <a href="posts/${postHoje.arquivo}" class="btn-destaque mt-4" title="${tituloLinkDestaque}" aria-label="${tituloLinkDestaque}">Ler post completo <i class="bi bi-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="ritual-semana">
                            <h4><i class="bi bi-moon-stars"></i> Ritual da Semana</h4>
                            <p>Respire, acenda uma vela e escreva: <em>"O que escolho transformar hoje?"</em></p>
                        </div>
                    </div>
                </div>
            `;
      }

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
                            <h3 class="h5" style="margin-top:8px;">${post.titulo}</h3>
                            <p class="preview">${post.preview}</p>
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
        postsGrid.innerHTML = "";
        const semDestaque = lista.filter((post) => !post.destaque);

        if (semDestaque.length === 0) {
          postsGrid.innerHTML =
            lista.length > 0
              ? '<div class="col-12"><div class="nenhum-post">🌙 O resultado desta busca está no post em destaque acima.</div></div>'
              : '<div class="col-12"><div class="nenhum-post">🌙 Nenhum post encontrado para este filtro.</div></div>';
          contador.textContent = `${lista.length} publicações`;
          renderCalendario(lista);
          return;
        }

        semDestaque.forEach((post) => {
          postsGrid.insertAdjacentHTML("beforeend", criarCard(post));
        });

        contador.textContent = `${lista.length} publicações`;
        renderCalendario(lista);
      }

      function filtrarPosts() {
        const mesSelecionado =
          document.querySelector(".month-btn.active")?.dataset.mes || "all";
        const busca = (buscaInput.value || "").toLowerCase().trim();

        let filtrados = [...postsDisponiveis];

        if (mesSelecionado !== "all") {
          filtrados = filtrados.filter((post) =>
            post.data.startsWith(mesSelecionado),
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
              post.preview,
            ]
              .join(" ")
              .toLowerCase();

            return texto.includes(busca);
          });
        }

        renderPosts(filtrados);
      }

      function gerarCalendario(mes, ano, lista = []) {
        const primeiroDia = new Date(ano, mes - 1, 1);
        const ultimoDia = new Date(ano, mes, 0);
        const diasNoMes = ultimoDia.getDate();
        const diaSemanaInicio = primeiroDia.getDay(); // 0 = Domingo

        const postsPorData = new Map(lista.map((post) => [post.data, post]));
        let html = '<div class="calendar-weekdays">';

        ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].forEach((dia) => {
          html += `<div class="calendar-weekday">${dia}</div>`;
        });
        html += '</div><div class="calendar-days">';

        for (let i = 0; i < diaSemanaInicio; i += 1) {
          html += '<div class="calendar-day-slot" aria-hidden="true"></div>';
        }

        for (let dia = 1; dia <= diasNoMes; dia += 1) {
          const dataISO = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
          const postDoDia = postsPorData.get(dataISO);
          const classes = ["calendar-day-card"];

          if (postDoDia) {
            classes.push("has-post");
          } else {
            classes.push("no-post");
          }

          if (dataISO === hoje) {
            classes.push("today");
          }

          if (postDoDia) {
            const tituloCalendario = escapeHtml(`Leia o post: ${postDoDia.titulo}`);
            html += `
              <a
                href="posts/${postDoDia.arquivo}"
                class="${classes.join(" ")}"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="calendar-tooltip"
                data-bs-title="${escapeHtml(postDoDia.titulo)}"
                title="${tituloCalendario}"
                aria-label="${escapeHtml(`${postDoDia.titulo} em ${formatDatePretty(dataISO)}`)}"
              >
                <span class="calendar-day-number">${dia}</span>
                <span class="calendar-post-dot" aria-hidden="true"></span>
              </a>
            `;
          } else {
            html += `
              <div class="${classes.join(" ")}" aria-hidden="true">
                <span class="calendar-day-number">${dia}</span>
              </div>
            `;
          }
        }

        html += "</div>";
        return html;
      }

      function renderCalendario(lista = postsDisponiveis) {
        const ativo = document.querySelector(".month-btn.active");
        let referenciaMes = hoje.slice(0, 7);

        if (ativo && ativo.dataset.mes && ativo.dataset.mes !== "all") {
          referenciaMes = ativo.dataset.mes;
        }

        const [ano, mes] = referenciaMes.split("-").map(Number);
        const indiceMesAtual = mesesComPosts.indexOf(referenciaMes);
        const mesAnterior =
          indiceMesAtual > 0 ? mesesComPosts[indiceMesAtual - 1] : "";
        const proximoMes =
          indiceMesAtual >= 0 && indiceMesAtual < mesesComPosts.length - 1
            ? mesesComPosts[indiceMesAtual + 1]
            : "";

        calendario.innerHTML = "";
        calendario.insertAdjacentHTML(
          "beforeend",
          `
            <div class="calendar-widget">
              <div>
                <h3 class="sidebar-title mb-1"><i class="bi bi-calendar-month"></i> Calendário de Posts</h3>
                <p class="calendar-caption">Passe o mouse sobre os dias dourados para ver o título completo.</p>
              </div>
              <div class="calendar-month-bar">
                <button
                  class="calendar-nav-btn"
                  type="button"
                  data-calendar-nav="prev"
                  data-target-month="${mesAnterior}"
                  aria-label="Ver mês anterior"
                  ${mesAnterior ? "" : "disabled"}
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <div class="calendar-month-label">${schedule.MONTHS_PT[mes - 1]} ${ano}</div>
                <button
                  class="calendar-nav-btn"
                  type="button"
                  data-calendar-nav="next"
                  data-target-month="${proximoMes}"
                  aria-label="Ver próximo mês"
                  ${proximoMes ? "" : "disabled"}
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
              ${gerarCalendario(mes, ano, lista)}
            </div>
          `,
        );

        ativarTooltips();
      }

      botaoFiltros.forEach((btn) => {
        btn.addEventListener("click", () => {
          botaoFiltros.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          filtrarPosts();
        });
      });

      buscaInput.addEventListener("input", filtrarPosts);

      calendario.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-calendar-nav]");

        if (!botao || !botao.dataset.targetMonth) {
          return;
        }

        setMesAtivo(botao.dataset.targetMonth);
      });

      function bindNewsletterForm({ formId, inputId, msgId, successClass }) {
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);
        const msg = document.getElementById(msgId);

        if (!form || !input || !msg) {
          return;
        }

        form.addEventListener("submit", (evento) => {
          evento.preventDefault();
          const email = input.value.trim();

          if (!email) {
            msg.className = "small mt-2 text-danger";
            msg.textContent =
              "Digite um e-mail válido para receber as previsões.";
            return;
          }

          msg.className = `small mt-2 ${successClass}`;
          msg.textContent = "Inscrição realizada com sucesso! 💫";
          input.value = "";
        });
      }

      bindNewsletterForm({
        formId: "form-newsletter",
        inputId: "email-news",
        msgId: "msg-news",
        successClass: "text-success",
      });

      function aplicarFiltroPadrao() {
        const mesPadrao =
          botaoFiltros &&
          [...botaoFiltros].find((btn) => btn.dataset.mes === hoje.slice(0, 7));
        if (mesPadrao && !mesPadrao.classList.contains("active")) {
          botaoFiltros.forEach((btn) => btn.classList.remove("active"));
          mesPadrao.classList.add("active");
        }
      }

      function verificarDuplicatas() {
        const arquivos = todosPosts.map((post) => post.arquivo);
        const duplicatas = arquivos.filter(
          (item, index) => arquivos.indexOf(item) !== index,
        );

        if (duplicatas.length) {
          console.warn("⚠️ Posts duplicados encontrados:", [
            ...new Set(duplicatas),
          ]);
        }
      }

      verificarDuplicatas();
      renderFeatured();
      aplicarFiltroPadrao();
      filtrarPosts();
      inicializarPrevisoesSignos();

      // Ativar link da home no mesmo layout
      const caminhoAtual = window.location.pathname;
      const menu = document.querySelectorAll(".nav-link-cosmic");
      menu.forEach((link) => {
        if (
          link.getAttribute("href") === caminhoAtual ||
          (caminhoAtual === "/" && link.textContent.includes("Início"))
        ) {
          link.classList.add("active");
        }
      });

      // ===== COOKIE CONSENT - LGPD =====
      function initCookieConsent() {
        const cookieConsent = document.getElementById("cookieConsent");
        const cookiePreferencias = localStorage.getItem("cookieConsent");

        // Verificar se já aceitou antes
        if (!cookiePreferencias) {
          // Mostrar aviso após 1 segundo
          setTimeout(() => {
            cookieConsent.style.display = "block";
          }, 1000);
        } else {
          // Aplicar preferências salvas
          aplicarPreferenciasCookies(JSON.parse(cookiePreferencias));
        }
      }

      function aceitarTodosCookies() {
        const preferencias = {
          necessarios: true,
          analytics: true,
          funcionais: true,
          data: new Date().toISOString(),
        };

        // Salvar no localStorage
        localStorage.setItem("cookieConsent", JSON.stringify(preferencias));

        // Esconder aviso
        document.getElementById("cookieConsent").style.display = "none";

        // Aplicar configurações
        aplicarPreferenciasCookies(preferencias);

        // Mostrar mensagem de sucesso
        mostrarMensagemCookies("✅ Preferências salvas com sucesso!");
      }

      function mostrarConfigCookies() {
        const configPanel = document.getElementById("cookieConfigPanel");
        const overlay = document.getElementById("cookieOverlay");

        // Carregar preferências atuais se existirem
        const cookiePreferencias = localStorage.getItem("cookieConsent");
        if (cookiePreferencias) {
          const prefs = JSON.parse(cookiePreferencias);
          document.getElementById("cookiesAnalytics").checked = prefs.analytics;
          document.getElementById("cookiesFuncionais").checked = prefs.funcionais;
        }

        configPanel.style.display = "block";
        overlay.style.display = "block";
        document.getElementById("cookieConsent").style.display = "none";
      }

      function fecharConfigCookies() {
        document.getElementById("cookieConfigPanel").style.display = "none";
        document.getElementById("cookieOverlay").style.display = "none";

        // Se não tinha preferências antes, mostrar o aviso novamente
        if (!localStorage.getItem("cookieConsent")) {
          document.getElementById("cookieConsent").style.display = "block";
        }
      }

      function salvarConfigCookies() {
        const preferencias = {
          necessarios: true, // Sempre true
          analytics: document.getElementById("cookiesAnalytics").checked,
          funcionais: document.getElementById("cookiesFuncionais").checked,
          data: new Date().toISOString(),
        };

        // Salvar no localStorage
        localStorage.setItem("cookieConsent", JSON.stringify(preferencias));

        // Fechar painel
        fecharConfigCookies();

        // Aplicar configurações
        aplicarPreferenciasCookies(preferencias);

        // Mostrar mensagem de sucesso
        mostrarMensagemCookies("⚙️ Preferências de cookies salvas!");
      }

      function aplicarPreferenciasCookies(prefs) {
        // Controle do Google Analytics baseado na preferência
        if (prefs.analytics) {
          // Ativar Google Analytics (se já estava desativado)
          if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
              analytics_storage: "granted",
            });
          }
          console.log("✅ Analytics ativado");
        } else {
          // Desativar Google Analytics
          if (typeof gtag !== "undefined") {
            gtag("consent", "update", {
              analytics_storage: "denied",
            });
          }
          console.log("🔴 Analytics desativado");
        }

        // Controle do chat (funcionais)
        const chat = document.querySelector(".kodassauro");
        if (chat && prefs.funcionais) {
          chat.style.display = "block";
        } else if (chat) {
          chat.style.display = "block"; // Chat pode funcionar sem cookies? Ajuste conforme necessário
        }
      }

      function mostrarMensagemCookies(texto) {
        // Criar toast temporário
        const toast = document.createElement("div");
        toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--midnight-blue);
    color: var(--soft-gold);
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-size: 0.9rem;
    z-index: 100001;
    border: 1px solid var(--soft-gold);
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease-out;
  `;
        toast.textContent = texto;
        document.body.appendChild(toast);

        // Remover após 3 segundos
        setTimeout(() => {
          toast.style.animation = "slideUp 0.3s reverse ease-out";
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
      }

      // Inicializar quando a página carregar
      document.addEventListener("DOMContentLoaded", initCookieConsent);

      // Se usar Google Analytics, adicionar consentimento inicial
      if (typeof gtag !== "undefined") {
        gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted", // Sempre necessário
        });
      }

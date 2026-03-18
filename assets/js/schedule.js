(function attachAuroraSchedule(window) {
    const BLOG_TIMEZONE = 'America/Sao_Paulo';
    const MONTHS_PT = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    function getDateParts(date = new Date(), timeZone = BLOG_TIMEZONE) {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const parts = formatter.formatToParts(date).reduce((acc, part) => {
            if (part.type !== 'literal') {
                acc[part.type] = part.value;
            }

            return acc;
        }, {});

        return {
            year: parts.year,
            month: parts.month,
            day: parts.day,
            iso: `${parts.year}-${parts.month}-${parts.day}`
        };
    }

    function getTodayISO(timeZone = BLOG_TIMEZONE) {
        return getDateParts(new Date(), timeZone).iso;
    }

    function isPostAvailable(postDateISO, todayISO = getTodayISO(BLOG_TIMEZONE)) {
        return String(postDateISO) <= String(todayISO);
    }

    function formatDateLong(dateISO) {
        if (!dateISO) {
            return '';
        }

        const [year, month, day] = dateISO.split('-').map(Number);

        if (!year || !month || !day) {
            return dateISO;
        }

        return `${day} de ${MONTHS_PT[month - 1]} de ${year}`;
    }

    function getDaysUntil(postDateISO, timeZone = BLOG_TIMEZONE) {
        if (!postDateISO) {
            return null;
        }

        const todayParts = getDateParts(new Date(), timeZone);
        const [year, month, day] = postDateISO.split('-').map(Number);
        const todayUtc = Date.UTC(Number(todayParts.year), Number(todayParts.month) - 1, Number(todayParts.day));
        const postUtc = Date.UTC(year, month - 1, day);

        return Math.ceil((postUtc - todayUtc) / 86400000);
    }

    function getCountdownLabel(postDateISO, timeZone = BLOG_TIMEZONE) {
        const daysUntil = getDaysUntil(postDateISO, timeZone);

        if (daysUntil === null) {
            return '';
        }

        if (daysUntil <= 0) {
            return 'Disponível agora';
        }

        if (daysUntil === 1) {
            return 'Liberação amanhã';
        }

        return `Liberação em ${daysUntil} dias`;
    }

    function redirectIfFuturePost(postDateISO, redirectPath = 'futuro.html', timeZone = BLOG_TIMEZONE) {
        const todayISO = getTodayISO(timeZone);

        if (String(postDateISO) > String(todayISO)) {
            window.location.replace(`${redirectPath}?data=${encodeURIComponent(postDateISO)}`);
            return true;
        }

        return false;
    }

    window.AuroraSchedule = {
        BLOG_TIMEZONE,
        MONTHS_PT,
        getDateParts,
        getTodayISO,
        isPostAvailable,
        formatDateLong,
        getDaysUntil,
        getCountdownLabel,
        redirectIfFuturePost
    };
})(window);

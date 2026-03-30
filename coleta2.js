// Cole este código no console do navegador (F12) enquanto estiver logado no Facebook

(function collectFacebookCookies() {
    // Método 1: Obtém cookies via document.cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    
    // Método 2: Extrai cookies específicos
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };
    
    // Cookies essenciais do Facebook
    const essentialCookies = {
        c_user: getCookie('c_user'),
        xs: getCookie('xs'),
        fr: getCookie('fr'),
        datr: getCookie('datr'),
        sb: getCookie('sb'),
        locale: getCookie('locale')
    };
    
    // Formata para string de header
    const cookieString = cookies.join('; ');
    
    // Extrai informações da sessão
    const sessionInfo = {
        userId: essentialCookies.c_user,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    // Resultado completo
    const result = {
        ...sessionInfo,
        essentialCookies,
        allCookies: cookies,
        cookieHeader: cookieString
    };
    
    // Exibe no console
    console.log('🍪 COOKIES DO FACEBOOK COLETADOS:');
    console.log('================================');
    console.log('User ID:', essentialCookies.c_user);
    console.log('XS Token:', essentialCookies.xs);
    console.log('FR:', essentialCookies.fr);
    console.log('DATR:', essentialCookies.datr);
    console.log('\nCookie String para usar em requisições:');
    console.log(cookieString);
    
    // Copia para clipboard automaticamente
    navigator.clipboard.writeText(cookieString)
        .then(() => console.log('\n✅ Cookie string copiada para a área de transferência!'))
        .catch(() => console.log('\n⚠️ Copie manualmente a string acima'));
    
    // Salva como objeto para uso posterior
    window.__facebookCookies = result;
    console.log('\n💾 Cookies disponíveis em window.__facebookCookies');
    
    return result;
})();
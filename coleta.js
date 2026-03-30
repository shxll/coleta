// Requer acesso à API Graph do Facebook
async function generateCookiesFromToken(accessToken) {
    try {
        // Obtém ID do app
        const appResponse = await fetch(`https://graph.facebook.com/app?access_token=${accessToken}`);
        const appData = await appResponse.json();
        const appId = appData.id;
        
        // Obtém session cookies
        const sessionResponse = await fetch(
            `https://api.facebook.com/method/auth.getSessionforApp?` +
            `access_token=${accessToken}&format=json&new_app_id=${appId}&generate_session_cookies=1`
        );
        const sessionData = await sessionResponse.json();
        
        if (sessionData.session_cookies) {
            const cookies = {};
            sessionData.session_cookies.forEach(cookie => {
                cookies[cookie.name] = cookie.value;
            });
            
            // Formata cookie string
            const cookieString = Object.entries(cookies)
                .map(([k, v]) => `${k}=${v}`)
                .join('; ');
            
            console.log('✅ Cookies gerados com sucesso!');
            console.log('Cookie String:', cookieString);
            return cookies;
        }
    } catch (error) {
        console.error('❌ Erro ao gerar cookies:', error.message);
        return null;
    }
}

// Uso
// generateCookiesFromToken('SEU_ACCESS_TOKEN_AQUI');
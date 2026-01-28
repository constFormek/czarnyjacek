export const generateRandomToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let randomToken = "";
    for (let i = 0; i < 64; i++) {
        randomToken += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomToken;
}

export const authenticateUser = () => {
    const userToken = localStorage.getItem("token")
    if (userToken) {
        return userToken;
    };
    const randomToken = generateRandomToken();
    localStorage.setItem("token", randomToken);
    return randomToken;
}
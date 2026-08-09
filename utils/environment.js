function requireEnvironmentVariable(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}. Copy .env.example to .env and provide a value.`);
    }

    return value;
}

export function getMainUser() {
    return {
        username: requireEnvironmentVariable('MAIN_USER'),
        password: requireEnvironmentVariable('MAIN_PASSWORD'),
    };
}

export function getLockedUser() {
    return {
        username: requireEnvironmentVariable('LOCKED_USER'),
        password: requireEnvironmentVariable('LOCKED_PASSWORD'),
    };
}

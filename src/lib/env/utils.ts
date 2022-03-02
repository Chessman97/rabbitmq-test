import { join } from 'path';

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function getPath(path: string): string {
    return (process.env.NODE_ENV === 'production')
        ? join(process.cwd(), path.replace('src/', 'build/').slice(0, -3) + '.js')
        : join(process.cwd(), path);
}

export function getPaths(paths: string[]): string[] {
    return paths.map(p => getPath(p));
}

export function getOsPath(key: string): string {
    return getPath(getOsEnv(key));
}

export function getOsPaths(key: string): string[] {
    return getPaths(getOsEnvArray(key));
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] {
    return process.env[key] && process.env[key].split(delimiter) || [];
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function asHost(value: string): string { // not a localhost. use 127.0.0.1
    const regexp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
    if (value.match(regexp) === null || value.match(regexp)[0] !== value) { throw Error(`${value} is not host`); }
    return value;
}

export function asPort(value: string): number {
    const portNumber = parseInt(value, 10);
    if (portNumber < 0 && portNumber > 65536) { throw Error(`${value} is not port`); }
    return portNumber;
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}

export function urlParse(input: string) {
    const object = new URL(input);
    const searchParamsMap: Record<string, string> = {};
    const params = object.searchParams;
    params.forEach((value, key) => {
        searchParamsMap[key] = value
    })
    const matches = object.hash.match(/#(?<path>\/[^\?]*)/);
    const matches2 = object.hash.match(/#.*(?<search>\?.*)/);
    console.log(matches2)
    return JSON.stringify({
        href: object.href,
        protocol: object.protocol,
        host: object.host,
        hostname: object.hostname,
        port: object.port,
        pathname: object.pathname,
        search: object.search,
        searchParams: searchParamsMap,
        hash: object.hash,
        hashPath: matches?.groups?.path,
        hashSearch: matches2?.groups?.search
    }, null, 2);
}

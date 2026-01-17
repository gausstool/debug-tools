export class NginxLogParser {
    directives: Record<string, number> = {};
    parser: string | RegExp = '';

    constructor(format: string) {

        const prefix = format.match(/^[^\$]*/);
        if (prefix) {
            format = this.escape(prefix[0]) + format.slice(prefix[0].length);
        }

        this.parser = format;

        const directive = /\$([a-z_]+)(.)?([^\$]+)?/g;
        let match, regex, boundary, i = 1;

        while ((match = directive.exec(format))) {
            this.directives[match[1]] = i++;
            if (match[2]) {
                boundary = this.escape(match[2]);
                regex = '([^' + boundary + ']*?)' + boundary;
                if (match[3]) {
                    regex += this.escape(match[3]);
                }
            } else {
                regex = '(.+)$';
            }
            this.parser = this.parser.replace(match[0], regex);
        }

        this.parser = new RegExp(this.parser);
    }

    escape(str: string) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    parse(line: string) {
        if (!(this.parser instanceof RegExp)) {
            return {}
        }
        const match = this.parser.exec(line);
        if (!match) {
            return null;
        }

        const result: Record<string, string> = {};
        for (const [directive, index] of Object.entries(this.directives)) {
            result[directive] = match[index] || '';
        }

        return result;
    }
}

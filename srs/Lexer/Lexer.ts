import {
    Token,
    TokenType,
    makeToken,
} from "./Tokens.ts";

import {
    error,
    makePosition,
} from "../Errors/Errors.ts";

const DIGITS = '0987654321';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export class Lexer {
    filename: string;
    source: string;

    splitSource: string[];

    cur: number;
    line: number;

    errors: error[] = [];
    tokens: Token[];

    constructor(filename: string, source: string) {
        this.filename = filename;
        this.source = source;
    
        this.cur = 0;
        this.line = 1;

        this.splitSource = [...source];

        this.tokens = this.lexme();
    };

    eat = (): string =>
    {
        if (this.splitSource.length === 0) {
            return 'EOF';
        }
        else {
            return this.splitSource.shift() as string;
        }
    }
    
    at = (): string =>
    {
        if (this.splitSource.at(0) === undefined) {
            return 'EOF';
        }
        else {
            return this.splitSource.at(0) as string;
        }
    }

    peek = (): string =>
    {
        if (this.splitSource.at(1) == undefined)
        {
            return 'EOF';
        };

        return this.splitSource[1] as string;
    };

    advance = (steps: number, curAdv: boolean = true): string => {
        let value: string = '';

        for (let i = 0; i < steps; i++) {
            value += this.eat();

            if (curAdv) this.cur++;
        };

        return value;
    }

    lexme = (): Token[] => {
        const tokens: Token[] = [];

        while (this.splitSource.length > 0) {
            const start = this.cur;
            const peek = this.peek();
            
            
            if (this.at() == '\\' && peek == '\\')
            {
                this.advance(2);

                while (this.splitSource.length > 0 && this.at() != '\n') {
                    this.advance(1);
                }
            }

            if (this.at() == '\n')
            {
                this.advance(1);
                this.line++;
                this.cur = 0;
            }

            else if (['\t', '\v', '\r', '\f', ' '].includes(this.at()))
            {
                this.advance(1, false);
            }

            else if (DIGITS.includes(this.at()))
            {
                this.handleDigits(tokens, start);
            }

            else if (this.at() == '"')
            {
                this.handleString(tokens, start, '"');
            }
            else if (this.at() == "'")
            {
                this.handleString(tokens, start, "'");
            }
        }

        return tokens;
    };

    handleDigits = (tokens: Token[], start: number): void =>
    {
        let number: string = this.advance(1);
        let dotSeen = false;
        
        while (DIGITS.includes(this.at()) || this.at() == '_' || this.at() == '.')
        {
            if (this.at() == '_')
            {
                this.advance(1);
                continue;
            }

            if (this.at() == '.')
            {
                if (dotSeen) {
                    this.errors.push(new error(
                        "Lexical Error",
                        "Multiple dots in number",
                        makePosition(this.filename, this.line, this.cur, this.cur + 1),
                        this.source,
                    ));

                    while (this.splitSource.length > 0 && this.at() != '\n')
                    {
                        number += this.advance(1);
                    }

                    tokens.push(makeToken(TokenType.errorToken, number, makePosition(this.filename, this.line, start, this.cur)))

                    return;
                }

                dotSeen = true;
                number += this.advance(1);
            }

            if (DIGITS.includes(this.at())) number += this.advance(1);
        }

        if (dotSeen) tokens.push(makeToken(TokenType.float, number, makePosition(this.filename, this.line, start, this.cur)));
        else tokens.push(makeToken(TokenType.int, number, makePosition(this.filename, this.line, start, this.cur)));

        return;
    };

    handleString = (tokens: Token[], start: number, quote: string): void =>
    {
        this.advance(1);

        let stringContent: string = '';

        while (this.splitSource.length > 0 && this.at() != quote)
        {
            if (this.at() == '\n')
            {
                this.errors.push(new error(
                    "Lexical Error",
                    "Unterminated string literal",
                    makePosition(this.filename, this.line, start, start + 1),
                    this.source,
                ));

                tokens.push(makeToken(TokenType.errorToken, stringContent, makePosition(this.filename, this.line, start, this.cur)));
                return;
            };

            stringContent += this.advance(1);
        }

        if (this.at() != quote)
        {
            this.errors.push(new error(
                "Lexical Error",
                "Unterminated string literal",
                makePosition(this.filename, this.line, start, start+1),
                this.source,
            ));

            tokens.push(makeToken(TokenType.errorToken, stringContent, makePosition(this.filename, this.line, start, this.cur)));
            return;
        };
        
        this.advance(1);

        tokens.push(makeToken(TokenType.str, stringContent, makePosition(this.filename, this.line, start, this.cur)));
        return;
    }
};
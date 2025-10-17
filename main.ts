import {
    Lexer,
} from "./srs/Lexer/Lexer.ts";

import {
    Parser,
} from './srs/Parser/Parser.ts';

import {
    ErrorHandler,
} from "./srs/Errors/Errors.ts";

export const enum ExitCode
{
    LEX_ERR,
    PAR_ERR,
    TYPE_ERR,
    EXIT,
};

interface flags {
    stages: boolean;
}

const shell = (flags: flags): ExitCode =>
{
    const errorHandler = new ErrorHandler('stdin');

    while (true) {
        const stream = prompt('> ', '') as string;

        const lexer = new Lexer('stdin', stream);
        const parser = new Parser(lexer.tokens);

        if (lexer.errors.length > 0) {
            console.log(`Detected ${lexer.errors.length} error(s) during the Lexical Stage:`);

            for (const err of lexer.errors) {
                console.log(errorHandler.generateErrorMessage(stream, err));
            }

            continue;
        }
        if (flags.stages) console.log(lexer.tokens); console.log(parser.program)
    }
}

shell({ stages: true });
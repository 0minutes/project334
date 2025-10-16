import {
    Lexer,
} from "./srs/Lexer/Lexer.ts";

export const enum ExitCode
{
    LEX_ERR,
    PAR_ERR,
    TYPE_ERR,
    EXIT,
};


const shell = (): ExitCode =>
{
    const lexer = new Lexer('test.srs', '"abc\n123.123.4\n"abc\n');

    console.log(lexer.tokens);
    
    if (lexer.errors.length > 0)
    {
        console.log(`Detected ${lexer.errors.length} error(s) during the Lexical Stage:`);
        for (const err of lexer.errors)
        {
            console.log(err.errorMessage);
        }
    }
    
    return ExitCode.EXIT;
}

shell();
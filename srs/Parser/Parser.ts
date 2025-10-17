import {
    Token,
} from '../Lexer/Tokens.ts';

import {
    makePosition,
    Error,
} from '../Errors/Errors.ts';

import {
    Program,
    type Statement
} from './Nodes/StatementNodes.ts';


export class Parser {
    tokens: Token[];

    program: Program;

    errors: Error[] = [];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.errors = [];
        this.program = this.parseProgram();
    }

    eat = (): Token => {
        return this.tokens.shift()!;
    }

    at = (): Token => {
        return this.tokens[0];
    }

    parseStatement = (): Statement => {
        
        return {} as Statement;
    }

    parseProgram = (): Program => {
        const programNode: Program = {
            type: 'Program',
            body: [],
            where: makePosition(this.tokens[this.tokens.length-1].where.line, this.tokens[0].where.start, this.tokens[this.tokens.length-1].where.end),
        };

        while (this.tokens.length > 0) {
            const statement: Statement = this.parseStatement();

            programNode.body.push(statement);
        };

        return programNode;
    }
}
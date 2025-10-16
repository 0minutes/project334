import {
    Position,
} from "../Errors/Errors.ts";

export const enum TokenType {
    int,
    float,
    str,

    errorToken,

    EOF,
};

export interface Token {
    type: TokenType;
    value: string;
    position: Position;
}

export const makeToken = (type: TokenType, value: string, position: Position): Token =>
{
    return {
        type,
        value,
        position
    } as Token;
};
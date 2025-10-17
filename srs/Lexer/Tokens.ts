import {
    Position,
} from "../Errors/Errors.ts";

export const enum TokenType {
    int = '<int>',
    float = '<float>',
    str = '<str>',
    bool = '<bool>',

    identifier = '<identifier>',

    ifKW = '<if>',
    elifKW = '<elif>',
    elseKW = '<else>',

    oparand = '<oparand>',
    AssignmentOperator = '<AssignmentOperator>',
    ReAssignmentOperator = '<ReAssignmentOperator>',

    colon = '<colon>',
    semicolon = '<semicolon>',

    comma = '<comma>',
    leftParenthesis = '<leftParenthesis>',
    rightParenthesis = '<rightParenthesis>',

    leftBrace = '<leftBrace>',
    rightBrace = '<rightBrace>',

    leftBracket = '<leftBracket>',
    rightBracket = '<rightBracket>',
    dot = '<dot>',
};

export const keywords: Record<string, TokenType> = {
    'if': TokenType.ifKW,
    'elif': TokenType.elifKW,
    'else': TokenType.elseKW,

    'TRUE': TokenType.bool,
    'FALSE': TokenType.bool,
};

export const specialCharacters: Record<string, TokenType> = {
    '+': TokenType.oparand,
    '-': TokenType.oparand,
    '*': TokenType.oparand,
    '/': TokenType.oparand,
    '**': TokenType.oparand,

    '==': TokenType.oparand,
    '!=': TokenType.oparand,
    '>': TokenType.oparand,
    '<': TokenType.oparand,
    '>=': TokenType.oparand,
    '<=': TokenType.oparand,
    '&&': TokenType.oparand,
    '||': TokenType.oparand,
    '!': TokenType.oparand,
    '<>': TokenType.oparand,
    '&': TokenType.oparand,
    '|': TokenType.oparand,
    '^': TokenType.oparand,
    '~': TokenType.oparand,
    '++': TokenType.oparand,
    '--': TokenType.oparand,

    '=': TokenType.AssignmentOperator,

    '+=': TokenType.ReAssignmentOperator,
    '-=': TokenType.ReAssignmentOperator,
    '*=': TokenType.ReAssignmentOperator,
    '/=': TokenType.ReAssignmentOperator,
    '%': TokenType.oparand,
    '<<': TokenType.oparand,
    '>>': TokenType.oparand,
    '%=': TokenType.ReAssignmentOperator,
    '<<=': TokenType.ReAssignmentOperator,
    '>>=': TokenType.ReAssignmentOperator,
    '&=': TokenType.ReAssignmentOperator,
    '|=': TokenType.ReAssignmentOperator,
    '^=': TokenType.ReAssignmentOperator,

    '?': TokenType.oparand,
    ':': TokenType.colon,
    ';': TokenType.semicolon,
    ',': TokenType.comma,
    '(': TokenType.leftParenthesis,
    ')': TokenType.rightParenthesis,
    '{': TokenType.leftBrace,
    '}': TokenType.rightBrace,
    '[': TokenType.leftBracket,
    ']': TokenType.rightBracket,
    '.': TokenType.dot,
};

export interface Token {
    type: TokenType;
    value: string;
    where: Position;
}

export const makeToken = (type: TokenType, value: string, where: Position): Token => {
    return {
        type,
        value,
        where
    } as Token;
};
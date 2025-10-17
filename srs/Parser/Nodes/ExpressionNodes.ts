import {
    Position
} from "../../Errors/Errors.ts";

export type Expression = BinaryExpression | IntegerLiteral | FloatLiteral | StringLiteral | identifier;

export interface BinaryExpression {
    type: 'BinaryExpression';
    left: Expression;
    operator: {
        type: string;
        where: Position;
    };
    right: Expression;
    where: Position;
}

export interface IntegerLiteral {
    type: 'IntegerLiteral';
    value: string;
    where: Position;
}

export interface FloatLiteral {
    type: 'FloatLiteral';
    value: string;
    where: Position;
}

export interface StringLiteral {
    type: 'StringLiteral';
    value: string;
    where: Position;
}

export interface identifier {
    type: 'identifier';
    value: string;
    where: Position;
}
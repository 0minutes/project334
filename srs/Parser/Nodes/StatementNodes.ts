import {
    Position,
} from '../../Errors/Errors.ts';

import {
    Expression,
} from './ExpressionNodes.ts';

export type Statement = IfStatement;

export interface Program {
    type: 'Program';
    body: Statement[];
    where: Position;
}

export interface IfStatement {
    type: 'IfStatement';
    condition: Expression;
    body: Statement[];
    alternate: IfStatement[] | elseStatement | undefined;
    where: Position;
}

export interface elseStatement {
    type: 'elseStatement';
    body: Statement[];
    where: Position;
}
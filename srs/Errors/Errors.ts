/*
<error type>:<message>
--> <file>:<line>:<start>
1 | <line>
  |     ^
*/

export interface Position {
    line: number;
    start: number;
    end: number;
}

export interface Error {
    type: string;
    message: string;
    where: Position;
}

export const makePosition = (line: number, start: number, end: number): Position => {
    return {
        line,
        end,
        start
    } as Position;
};

export class ErrorHandler {
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    generateErrorMessage = (source: string, error: Error): string => {
        const lines = source.split('\n');
        const linesWidth = String(lines.length).length;

        const firstLine = `${error.type}: ${error.message}`;
        const secondLine = `--> ${this.filename}:${error.where.line}:${error.where.start}`;

        const thirdline = error.where.line.toString() + (' '.repeat(linesWidth - error.where.line.toString().length)) + ' | ' + lines[error.where.line - 1];
        
        const carrotLine = ' '.repeat(linesWidth) + ' | ' + ' '.repeat(error.where.start) + '^'.repeat(error.where.end - error.where.start);

        return [firstLine, secondLine, thirdline, carrotLine].join('\n');
    }
}
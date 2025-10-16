

export interface Position {
    filename: string;
    line: number;
    start: number;
    end: number;
}

export const makePosition = (filename: string, line: number, start: number, end: number): Position =>
{
    return {
        filename,
        line,
        end,
        start
    } as Position;
};

export class error {
    type: string;
    message: string;
    position: Position;
    source: string;
    lines: string[];

    errorMessage: string;

    constructor(type: string, message: string, position: Position, source: string) {
        this.type = type;
        this.message = message;
        this.position = position;
        this.source = source;
        this.lines = this.source.split('\n');

        this.errorMessage = this.generateErrorMessage();
    }
/*
<error type>:<message>
--> <file>:<line>:<start>
1 | <line>
  |     ^
*/

    generateErrorMessage = (): string =>
    {
        const linesWidth = String(this.lines.length).length;

        const firstLine = `${this.type}: ${this.message}`;
        const secondLine = `--> ${this.position.filename}:${this.position.line}:${this.position.start}`;

        const thirdline = this.position.line.toString() + (' '.repeat(linesWidth - this.position.line.toString().length)) + ' | ' + this.lines[this.position.line - 1];
        
        const carrotLine = ' '.repeat(linesWidth) + ' | ' + ' '.repeat(this.position.start) + '^'.repeat(this.position.end - this.position.start);

        return [firstLine, secondLine, thirdline, carrotLine].join('\n');
    }
}
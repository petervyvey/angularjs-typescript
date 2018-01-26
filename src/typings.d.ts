
/* tslint:disable-next-line:variable-name */
declare function require(string): string;

declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.html' {
    const content: string;
    export default content;
}

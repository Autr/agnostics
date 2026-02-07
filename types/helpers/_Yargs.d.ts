export function GetYargsType(type: any): "number" | "string" | "boolean";
export function GetParsedYargsOptions(agOptions: any, aliasStore?: any[]): {};
export function ConvertYargsProperty(def: any, override?: {}): {
    array: any;
    describe: any;
    type: string;
    coerce: any;
    default: any;
    accept: any[];
};
export function YargsProcessWorkaround(): void;
export class YargsCommand {
    constructor({ positionals, options, description, version }: {
        positionals: any;
        options?: {};
        description?: string;
        version?: string;
    });
    command: string;
    description: string;
    version: string;
    positionals: {};
    options: {};
    $positionals: {};
    $options: {};
    $aliasStore: any[];
    run(runCallback?: (yargsData: any) => Promise<void>): Promise<any>;
}
export class YargsCLI {
    constructor({ commands, options, description, version }: {
        commands: any;
        options?: {};
        description?: string;
        version?: string;
    });
    options: any;
    description: string;
    version: string;
    $aliasStore: any[];
    $options: {};
    $commands: {};
    run(runCallback?: (cmdKey: any, yargsData: any) => Promise<void>): Promise<any>;
}
//# sourceMappingURL=_Yargs.d.ts.map
const schedulerInputParser: (input: string) => Array<{task: string, dependencies: string[]}> = (input) => {
    const nonEmptyLines = input.split(`\r\n`).map(line => line.trim()).filter(line => line != ``);
    return nonEmptyLines.map(line => {
        const matches = /(.*)=>(.*)/.exec(line);
        const task = matches[1].trim();
        const dependencies = matches[2].trim().split(``);
        return {
            task,
            dependencies
        };
    });
};

const scheduler: (input: string) => string[] = (input) => {
    // simple case first
    if (input.length == 0) return [];

    let dependency = schedulerInputParser(input);
    let result: string[] = [];
    // TODO Implement the method
    return result;
}

export default scheduler;

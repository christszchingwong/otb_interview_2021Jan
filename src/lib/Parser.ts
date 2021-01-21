export default abstract class Parser<T> {
    Parse: (input: string) => T[];
}

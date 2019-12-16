import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "transcription"
})
export class TranscriptionPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    let exp,
      rounded,
      suffixes = ["mil", "mi", "bi", "tri", "qua", "qui"];

    if (input === "unknown") return "?";

    if (Number.isNaN(input)) return null;

    if (input < 1000) return input;

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (
      (input / Math.pow(1000, exp)).toFixed(args) + " " + suffixes[exp - 1]
    );
  }
}

export function TextHelper(text: string) {
  return new _TextHelper(text);
}

class _TextHelper {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  removeSpecialChars() {
    this.text = this.text.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
    return this;
  }

  capitalize() {
    this.text = this.text.charAt(0).toUpperCase() + this.text.slice(1);
    return this;
  }

  getText() {
    return this.text;
  }

  truncate(length: number, ellipsis: string = "...") {
    if (this.text.length <= length) return this;

    const allowedLength = length - ellipsis.length;
    this.text = this.text.slice(0, Math.max(0, allowedLength)) + ellipsis;

    return this;
  }
}

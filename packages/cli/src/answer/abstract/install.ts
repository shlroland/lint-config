export class Installer extends Set<string> {
  get pendingPackages(): string[] {
    return Array.from(this.values())
  }
}

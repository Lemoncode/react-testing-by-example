/*
Just a temporary file for quick test setup. Remove and use
a component
*/

export class Rocket {
  public isInSpace: boolean = false;
  public boostersLanded: boolean = true;

  public launch() {
    this.isInSpace = true;
    this.boostersLanded = true;
  }
}

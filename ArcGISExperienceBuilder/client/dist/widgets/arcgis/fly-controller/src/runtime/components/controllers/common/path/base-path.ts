//TODO
export default abstract class BasePath {
  points: any;
  length: number;
  esriMathUtils: any;

  abstract getPoint(len, at?);
  abstract getLength();
}
class BodySerializer {
  private decompressed = "";
  constructor(private body: string) {
    this.decompressed = this.decompress();
  }
  decompress() {
    const { body } = this;
    console.log("post body data should be compressed & decompressed");
    return body;
  }
  text() {
    return this.decompressed;
  }
}

export default BodySerializer;

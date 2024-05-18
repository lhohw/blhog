import { describe, test, expect } from "bun:test";
import { slugToStr, strToSlug, toPascalCase } from "@/lib/utils/string";

describe("string", () => {
  describe("to pascal case", () => {
    test("pascal-case", () => {
      const str = "pascal-case";
      const actual = toPascalCase(str, "-");
      const expected = "PascalCase";

      expect(actual).toBe(expected);
    });
    test("pascal.case", () => {
      const str = "pascal.case";
      const actual = toPascalCase(str, ".");
      const expected = "PascalCase";

      expect(actual).toBe(expected);
    });
    test("pascal case", () => {
      const str = "pascal case";
      const actual = toPascalCase(str, " ");
      const expected = "PascalCase";

      expect(actual).toBe(expected);
    });
    test("p", () => {
      const str = "p";
      const actual = toPascalCase(str);
      const expected = "P";

      expect(actual).toBe(expected);
    });
    test("--", () => {
      const str = "--";
      const actual = toPascalCase(str);
      const expected = "";

      expect(actual).toBe(expected);
    });
    test("computer-science", () => {
      const str = "computer-science";
      const actual = toPascalCase(str, "-", " ");
      const expected = "Computer Science";

      expect(actual).toBe(expected);
    });
  });

  describe("slug to str", () => {
    test("s-l-u-g", () => {
      const str = "s-l-u-g";
      const actual = slugToStr(str);
      const expected = "s l u g";

      expect(actual).toBe(expected);
    });
    test("s-l-u-g / _", () => {
      const str = "s-l-u-g";
      const actual = slugToStr(str, "_");
      const expected = "s_l_u_g";

      expect(actual).toBe(expected);
    });
    test("slug", () => {
      const str = "slug";
      const actual = slugToStr(str);
      const expected = "slug";

      expect(actual).toBe(expected);
    });
  });

  describe("str to slug", () => {
    test("str", () => {
      const str = "str";
      const actual = strToSlug(str);
      const expected = "str";

      expect(actual).toBe(expected);
    });
    test("s t r", () => {
      const str = "s t r";
      const actual = strToSlug(str);
      const expected = "s-t-r";

      expect(actual).toBe(expected);
    });
    test("s/t/r", () => {
      const str = "s/t/r";
      const actual = strToSlug(str, "/");
      const expected = "s-t-r";

      expect(actual).toBe(expected);
    });
  });
});

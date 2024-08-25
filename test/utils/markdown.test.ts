import { describe, test, expect } from "bun:test";
import { handleHeadingStr } from "@/lib/utils/markdown";

describe("handleHeadingStr", () => {
  test("string headings", () => {
    const headings = { children: "str" };

    const actual = handleHeadingStr(headings);
    const expected = "str";

    expect(actual).toBe(expected);
  });

  test("string array heading", () => {
    const headings = { children: ["string", "array"] };

    const actual = handleHeadingStr(headings);
    const expected = "stringarray";

    expect(actual).toBe(expected);
  });

  test("object heading", () => {
    const headings = {
      children: {
        $$typeof: Symbol("react.element"),
        type: "[Function: a]",
        key: null,
        ref: null,
        props: {
          href: "href",
          children: "Scheduler",
        },
        _owner: null,
        _store: {},
      },
    };

    const actual = handleHeadingStr(headings);
    const expected = "Scheduler";

    expect(actual).toBe(expected);
  });

  test("complex array heading", () => {
    const headings = {
      children: [
        "1. vue, angular는 ",
        {
          $$typeof: "Symbol(react.element)",
          type: "code",
          key: null,
          ref: null,
          props: { children: "프레임워크" },
          _owner: null,
          _store: {},
        },
        "다.",
      ],
    };

    const actual = handleHeadingStr(headings);
    const expected = "1. vue, angular는 프레임워크다.";

    expect(actual).toBe(expected);
  });
});

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FOLDED_SIDEBAR_SIZE_UNDER_MD } from "@/const/size";
import { debouncing } from "@/lib/utils/performance";
import useDom from "@/hooks/react/useDom";

export type useScrollSynchronizerCallback<T extends HTMLElement> = (props: {
  observerUl?: HTMLUListElement;
  subjects?: T[];
  isPass?: boolean[];
}) => void;
export type useScrollSynchronizerProps<T extends HTMLElement> = {
  initialSubjects?: any[];
  scrollMargin?: number;
  defaultIdx?: number;
  observerUlSelector: () => HTMLUListElement;
  subjectItemsSelector: () => T[];
  initializeCallback?: useScrollSynchronizerCallback<T>;
  resizeCallback?: useScrollSynchronizerCallback<T>;
  scrollCallback?: useScrollSynchronizerCallback<T>;
};
export default function useScrollSynchronizer<T extends HTMLElement>({
  initialSubjects,
  scrollMargin = FOLDED_SIDEBAR_SIZE_UNDER_MD,
  defaultIdx = 0,
  observerUlSelector,
  subjectItemsSelector,
  initializeCallback = () => {},
  resizeCallback = () => {},
  scrollCallback = () => {},
}: useScrollSynchronizerProps<T>) {
  const _getObserverUl = useDom(observerUlSelector);
  const _getSubjectItems = useDom(subjectItemsSelector);

  const [subjects, setSubjects] = useState<T[]>(initialSubjects ?? []);
  const [isPass, setIsPass] = useState<boolean[]>([]);

  const getCallbackProps = useCallback(
    () => ({
      observerUl: _getObserverUl(),
      subjects: _getSubjectItems(),
      isPass,
    }),
    [_getObserverUl, _getSubjectItems, isPass],
  );

  const initialize = useCallback(() => {
    const subjectItems = _getSubjectItems() || [];
    setSubjects(subjectItems);

    initializeCallback(getCallbackProps());
    setTimeout(onScroll, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _isPassed = useCallback(
    (offsetTop: number) => {
      return offsetTop - scrollMargin <= window.scrollY;
    },
    [scrollMargin],
  );

  const _syncScroll = useCallback(
    (lastIsReadIdx: number) => {
      if (lastIsReadIdx < 0) return;

      const ul = _getObserverUl();
      const lastReadLi = ul.children[lastIsReadIdx] as HTMLLIElement;
      if (!lastReadLi) return;

      ul.scrollTo({ top: lastReadLi.offsetTop, behavior: "smooth" });
    },
    [_getObserverUl],
  );

  const onScroll = useCallback(() => {
    const nextIsPass = [...isPass];
    let lastIsPassIdx = defaultIdx;

    const list = _getSubjectItems();
    if (!list) return;

    for (let i = 0; i < list.length; i++) {
      nextIsPass[i] = _isPassed(list[i].offsetTop);
      if (nextIsPass[i]) lastIsPassIdx = i;
    }

    setIsPass(nextIsPass);
    _syncScroll(lastIsPassIdx);
  }, [isPass, defaultIdx, _getSubjectItems, _syncScroll, _isPassed]);

  const onListClick = useCallback<React.MouseEventHandler>(
    (e) => {
      e.preventDefault();

      const target = e.target as HTMLElement;
      const ul = _getObserverUl();
      const li = target.closest("li");
      if (!ul || !li) return;

      const idx = Array.from(ul.children).findIndex((e) => e === li);
      if (idx === -1) return;

      const top = subjects[idx].offsetTop - scrollMargin;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [_getObserverUl, scrollMargin, subjects],
  );

  // --- effect ---
  const _debouncedOnScroll = useMemo(
    () => debouncing(onScroll, 500, 2000),
    [onScroll],
  );
  const _debouncedOnScrollForResize = useMemo(
    () => debouncing(onScroll, 500),
    [onScroll],
  );

  useEffect(function init() {
    initialize();

    const resizeListener = () => {
      _debouncedOnScrollForResize();
      resizeCallback(getCallbackProps());
    };

    const scrollListener = () => {
      _debouncedOnScroll();
      scrollCallback(getCallbackProps());
    };

    window.addEventListener("resize", resizeListener);
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("scroll", scrollListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    subjects,
    isPass,
    initialize,
    onScroll,
    onListClick,
  };
}

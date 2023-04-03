const intersectionObserver = (element: Element, fn: Function): void => {
  const options: IntersectionObserverInit = {
    // root: document.querySelector('#scrollArea'),
    // root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callback = function (entries: any[], observer: any) {
    entries.forEach(({ isIntersecting }: { isIntersecting: boolean }): void => {
      if (isIntersecting) {
        fn();
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  const target = element;

  if (!target) {
    return;
  }

  observer.observe(target);
};

export { intersectionObserver };

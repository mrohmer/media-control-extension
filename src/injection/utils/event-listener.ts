type ListenerCb<T extends HTMLElement, K extends keyof HTMLElementEventMap> = (this: T, ev: HTMLElementEventMap[K]) => any
export const eventListener = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
  target: T,
  event: K|K[],
  listener: ListenerCb<T, K>,
  options?: boolean | AddEventListenerOptions,
  ) => {
  if (Array.isArray(event)) {
    const unsubscribers = event.map(e => eventListener(
      target,
      e,
      listener,
      options,
    ));
    return () => unsubscribers.forEach(u => u());
  }

  target.addEventListener(event, listener, options);

  return () => target.removeEventListener(event, listener);
}

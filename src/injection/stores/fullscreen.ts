import type {Subscriber} from 'svelte/store';
import {writable} from 'svelte/store';

export const fullscreenStore = (element: HTMLElement) => {
  let state = writable(false);
  return {
    toggle: () => {
      if (!!document.fullscreenElement && document.fullscreenElement === element) {
        document.exitFullscreen();
      } else {
        if (!!document.fullscreenElement) {
          document.exitFullscreen();
        }
        element.requestFullscreen();
      }
    },
    subscribe: (subscriber: Subscriber<boolean>) => {
      const handler = () => state.set(document.fullscreenElement === element);
      document.addEventListener('fullscreenchange', handler);
      document.addEventListener('fullscreenerror', handler);

      const unsubscriber = state.subscribe(subscriber);

      return () => {
        unsubscriber();
        document.removeEventListener('fullscreenchange', handler);
        document.removeEventListener('fullscreenerror', handler);
      }
    }
  }
}

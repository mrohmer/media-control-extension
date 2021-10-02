import Injection from './Injection.svelte';

const media = document.querySelector('video, audio');

const el = document.createElement('div');
document.body.appendChild(el);

const app = new Injection({
  target: el,
  props: {
    media,
  },
});

export default app;

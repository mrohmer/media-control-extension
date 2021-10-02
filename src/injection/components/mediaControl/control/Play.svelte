<script lang="ts">
  import Button from "../helper/Button.svelte";
  import {getContext, onMount} from "svelte";
  import Icon from "../../Icon.svelte";
  import {eventListener} from "../../../utils/event-listener";
  import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay.js';
  import {faPause} from '@fortawesome/free-solid-svg-icons/faPause.js';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let playing = false;

  const toggle = () => media.paused ? media.play() : media.pause();

  const onTogglePlay = () => {
    console.log(!media.paused);
    playing = !media.paused;
  }

  onMount(() => {
    const unsubscribe = eventListener(
      media,
      ['play', 'pause'],
      onTogglePlay,
    );

    onTogglePlay();

    return unsubscribe;
  })
</script>
<Button class="btn btn--play" on:click={toggle}>
    <Icon icon={playing ? faPause : faPlay}/>
</Button>

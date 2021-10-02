<script lang="ts">
  import {getContext, onMount} from 'svelte';
  import ProgressBar from "./ProgressBar.svelte";
  import prettyMilliseconds from 'pretty-ms';
  import Play from "./control/Play.svelte";
  import Volume from "./control/Volume.svelte";
  import Loop from "./control/Loop.svelte";
  import Flip from "./control/Flip.svelte";
  import PlaybackRate from "./control/PlaybackRate.svelte";
  import Fullscreen from "./control/Fullscreen.svelte";
  import TimeBar from "./control/TimeBar.svelte";
  import Time from "./control/Time.svelte";

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  export let fullscreen = false;
  export let isAudio = false;
</script>

<style lang="scss">
  :global(.mcr-flipped) {
    transform: scaleX(-1);
    transform-origin: center;
  }

  .controls {
    display: flex;
    align-items: center;
    position: relative;
    color: white;

    .space {
      width: 10px;
    }

    .progress {
      flex: 1;
    }
  }
</style>

<div class="controls">
    <Play/>
    <div class="space"></div>
    <div class="progress">
        <TimeBar />
    </div>
    <div class="space"></div>
    <Time />
    <div class="space"></div>
    <Volume />
    <Loop />
    {#if !isAudio}
        <Flip />
    {/if}
    <PlaybackRate />
    {#if !isAudio}
        <Fullscreen {fullscreen} on:toggleFullscreen />
    {/if}
</div>

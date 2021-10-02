<script lang="ts">
  import {onMount, setContext} from 'svelte';
  import MediaControl from "./components/mediaControl/MediaControl.svelte";
  import {fullscreenStore} from './stores/fullscreen';
  import {between} from './utils/between';
  import {faMusic} from '@fortawesome/free-solid-svg-icons/faMusic.js';
  import Icon from "./components/Icon.svelte";

  export let media: HTMLAudioElement | HTMLVideoElement;
  const fullscreen = fullscreenStore(document.body);

  setContext('media', {
    getMedia: () => media,
  });

  const toggle = () => media.paused ? media.play() : media.pause();
  const shift = (delta: number) => {
    console.log(media.currentTime);
    media.currentTime = between(media.currentTime + delta, 0, media.duration);
  }

  const initMedia = () => {
    media.controls = false;
    media.autoplay = false;

    if (!media.paused) {
      media.pause();
    }

    media.addEventListener('click', toggle);
  }
  const initEvents = () => {
    document.body.addEventListener('keydown', e => {
      const prevent = () => {
        e.preventDefault();
        e.stopPropagation();
      }
      switch (e.code.toLowerCase()) {
        case 'space':
          prevent();
          toggle();
          break;
        case 'arrowleft':
          prevent();
          shift(-10); // jump 10 seconds in the past
          break;
        case 'arrowright':
          prevent();
          shift(10); // jump 10 seconds in the future
          break;
      }
    })
  }

  onMount(() => {
    console.log(['injection is', media ? '' : 'not', 'running'].filter(i => !!i).join(' '))
    media && initMedia();
    initEvents();
  });

  $: isAudio = media && (media instanceof HTMLAudioElement || !!media.querySelector('source[type*="audio"]'));
</script>

<style lang="scss">
  :global(.mcr-media-controls *) {
    position: relative;
    box-sizing: border-box;
    color: white;
  }

  .mcr {
    &-audio-placeholder {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      &__icon {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        $size: 100px;
        position: fixed;
        margin: auto;
        width: $size;
        height: $size;
        font-size: $size;
        line-height: $size;
        color: white;
      }
    }

    &-media-controls {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 5px 10px;
      z-index: 1;

      &:before {
        content: '\00a0';
        background-image: linear-gradient(0deg, black, transparent 100%);
        background-size: 100%;
        background-repeat: no-repeat;
        width: 100%;
        height: 140%;
        position: absolute;
        left: 0;
        bottom: -20%;
        pointer-events: none;
        z-index: 0;
      }
    }
  }
</style>

{#if media}
    {#if isAudio}
        <div class="mcr-audio-placeholder" on:click={toggle}>
            <div class="mcr-audio-placeholder__icon">
                <Icon icon={faMusic}/>
            </div>
        </div>
    {/if}
    <div class="mcr-media-controls">
        <MediaControl fullscreen={$fullscreen}
                      {isAudio}
                      on:toggleFullscreen={() => fullscreen.toggle()}
        />
    </div>
{/if}

<script lang="ts">
  import Button from "../helper/Button.svelte";
  import Icon from "../../Icon.svelte";
  import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo.js';
  import {faSlash} from '@fortawesome/free-solid-svg-icons/faSlash.js';
  import {getContext, onMount} from 'svelte';
  import {eventListener} from '../../../utils/event-listener';
  import {faSync} from "@fortawesome/free-solid-svg-icons/faSync.js";

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let flipped = false;

  const onFlipClick = () => {
    flipped = !flipped;

    if (flipped) {
      media.classList.add('mcr-flipped');
    } else {
      media.classList.remove('mcr-flipped');
    }
  }
</script>

<Button condensed={!flipped} on:click={onFlipClick}>
    <Icon icon={faSync} />
</Button>

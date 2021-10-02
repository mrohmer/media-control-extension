<script lang="ts">
  import Button from "../helper/Button.svelte";
  import {createEventDispatcher, getContext} from "svelte";
  import Icon from "../../Icon.svelte";
  import {faCompress} from "@fortawesome/free-solid-svg-icons/faCompress.js";
  import {faExpand} from "@fortawesome/free-solid-svg-icons/faExpand.js";

  const dispatch = createEventDispatcher();
  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  export let fullscreen = false;

  const onFullscreenClick = () => {
    dispatch('toggleFullscreen', {fullscreen: !fullscreen});
  }

</script>

<Button on:click={onFullscreenClick}>
    <Icon icon={fullscreen ? faCompress : faExpand}/>
</Button>

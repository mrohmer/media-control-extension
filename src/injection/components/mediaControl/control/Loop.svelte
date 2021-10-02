<script lang="ts">
  import Button from "../helper/Button.svelte";
  import Icon from "../../Icon.svelte";
  import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo.js';
  import {faSlash} from '@fortawesome/free-solid-svg-icons/faSlash.js';
  import {getContext, onMount} from 'svelte';
  import {eventListener} from '../../../utils/event-listener';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let loop = false;

  const onLoopChange = () => loop = media.loop;

  const onLoopClick = () => {
    media.loop = !media.loop;
    onLoopChange();
  }

  onMount(() => onLoopChange());
</script>

<Button condensed={!loop} on:click={onLoopClick}>
    <Icon icon={faUndo}>
        {#if !loop}
            <Icon icon={faSlash} stacked={true}/>
        {/if}
    </Icon>
</Button>

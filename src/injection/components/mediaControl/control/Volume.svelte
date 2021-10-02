<script lang="ts">
  import Container from "../helper/Container.svelte";
  import VerticalBar from "../helper/VerticalBar.svelte";
  import Button from "../helper/Button.svelte";
  import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp.js';
  import {faVolumeDown} from '@fortawesome/free-solid-svg-icons/faVolumeDown.js';
  import {faVolumeOff} from '@fortawesome/free-solid-svg-icons/faVolumeOff.js';
  import {faVolumeMute} from '@fortawesome/free-solid-svg-icons/faVolumeMute.js';
  import Icon from "../../Icon.svelte";
  import VerticalProgressBar from "../VerticalProgressBar.svelte";
  import {getContext, onMount} from 'svelte';
  import {eventListener} from '../../../utils/event-listener';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();


  let shown = false;
  let muted = false;
  let volume = 1;

  const onVolumeChange = () => {
    muted = media.muted;
    if (!muted) {
      volume = media.volume;
    }
  }
  const onChangeVolume = (value: number) => {
    if (value > 0) {
      media.muted = false;
    }
    media.volume = value;
  }
  const onVolumeClick = () => {
    media.muted = !media.muted;
  }

  onMount(() => {
    const unsubscribe = eventListener(
      media,
      'volumechange',
      onVolumeChange
    );

    onVolumeChange();

    return unsubscribe;
  })
</script>

<Container on:hover={({detail}) => shown = detail.state}>
    <Button on:click={onVolumeClick}>
        {#if muted}
            <Icon icon={faVolumeMute}/>
        {:else if volume > 0.6}
            <Icon icon={faVolumeUp}/>
        {:else if volume > 0.2}
            <Icon icon={faVolumeDown}/>
        {:else}
            <Icon icon={faVolumeOff}/>
        {/if}
    </Button>
    <VerticalBar {shown}>
        <span slot="value">
            {muted ? 'mute' : `${(volume * 100).toFixed(0)} %`}
        </span>
        <VerticalProgressBar percentage={volume}
                             on:changePosition={({detail: {value}}) => onChangeVolume(value)}/>
    </VerticalBar>
</Container>

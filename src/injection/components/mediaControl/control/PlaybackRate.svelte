<script lang="ts">
  import Container from "../helper/Container.svelte";
  import Button from "../helper/Button.svelte";
  import Icon from "../../Icon.svelte";
  import {faTachometerAlt} from "@fortawesome/free-solid-svg-icons/faTachometerAlt.js";
  import VerticalBar from "../helper/VerticalBar.svelte";
  import VerticalProgressBar from "../VerticalProgressBar.svelte";
  import {getContext, onMount} from 'svelte';
  import {eventListener} from '../../../utils/event-listener';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let shown = false;
  let playbackRate = 1;

  const onPlaybackRateChange = () => playbackRate = media.playbackRate;

  const onChangePlaybackRate = (value: number) => {
    media.playbackRate = value;
  }
  const onPlaybackRateClick = () => {
    media.playbackRate = 1;
  }

  onMount(() => {
    const unsubscribe = eventListener(
      media,
      'ratechange',
      onPlaybackRateChange,
    );
    onPlaybackRateChange();
    return unsubscribe;
  });
</script>

<Container on:hover={({detail}) => shown = detail.state}>
    <Button on:click={onPlaybackRateClick}>
        <Icon icon={faTachometerAlt}/>
    </Button>
    <VerticalBar {shown}>
        <span slot="value">
                {(playbackRate * 100).toFixed(0)} %
        </span>
        <VerticalProgressBar percentage={playbackRate / 2}
                             on:changePosition={({detail: {value}}) => onChangePlaybackRate(value * 2)}/>
    </VerticalBar>
</Container>

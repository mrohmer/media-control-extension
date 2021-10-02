<script lang="ts">
  import ProgressBar from "../ProgressBar.svelte";
  import Container from "../helper/Container.svelte";
  import {getContext, onMount} from 'svelte';
  import {eventListener} from '../../../utils/event-listener';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let playing = false;
  let timePercentage = 0;
  let duration = 0;
  let currentTime = 0;

  const smoothCurrentTimeChangeEnhancer = () => requestAnimationFrame(() => {
    onTimeUpdate();
    playing && smoothCurrentTimeChangeEnhancer();
  });

  const onDurationUpdate = () => {
    duration = media.duration * 1000;
    currentTime = media.currentTime * 1000;
  };
  const onTimeUpdate = () => {
    duration = media.duration * 1000;
    currentTime = media.currentTime * 1000;
  };

  const onChangePosition = (value: number) => {
    media.currentTime = value * media.duration;
    smoothCurrentTimeChangeEnhancer();
  }

  onMount(() => {
    const unsubscribeTime = eventListener(
      media,
      'timeupdate',
      onTimeUpdate,
    );
    const unsubscribeDuration = eventListener(
      media,
      'durationchange',
      onDurationUpdate,
    );

    onTimeUpdate();
    onDurationUpdate();

    return () => {
      unsubscribeDuration();
      unsubscribeTime();
    }
  });

  $: timePercentage = currentTime / duration;
</script>

<style lang="scss">
  .progress {
    height: 6px;
  }
</style>

<Container>
    <div class="progress">
        <ProgressBar percentage={timePercentage} on:changePosition={({detail}) => onChangePosition(detail.value)}/>
    </div>

</Container>

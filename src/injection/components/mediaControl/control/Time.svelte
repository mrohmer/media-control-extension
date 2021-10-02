<script lang="ts">
  import Container from "../helper/Container.svelte";
  import {getContext, onMount} from 'svelte';
  import prettyMilliseconds from 'pretty-ms';
  import {eventListener} from '../../../utils/event-listener';

  const {getMedia} = getContext('media');
  const media: HTMLVideoElement | HTMLAudioElement = getMedia();

  let duration = 0;
  let currentTime = 0;

  const onDurationUpdate = () => {
    duration = media.duration * 1000;
    currentTime = media.currentTime * 1000;
  };
  const onTimeUpdate = () => {
    duration = media.duration * 1000;
    currentTime = media.currentTime * 1000;
  };

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

  $: prettyCurrentTime = prettyMilliseconds(currentTime, {colonNotation: true, secondsDecimalDigits: 0});
  $: prettyDuration = prettyMilliseconds(duration, {colonNotation: true, secondsDecimalDigits: 0});
</script>

<Container>
    {prettyCurrentTime} / {prettyDuration}
</Container>

<script lang="ts">
  import ProgressBar from './ProgressBar.svelte';

  export let percentage: number = 0;
  let width = 0;
  let height = 0;
</script>

<style lang="scss">
  .outer {
    height: 100%;
    width: 100%;
  }

  .inner {
    transform: rotate(-90deg);
    transform-origin: center;
    position: absolute;
    left: -1000px;
    right: -1000px;
    bottom: 0;
    top: 0;
    margin: auto;
  }
</style>

<div class="outer" bind:clientWidth={width} bind:clientHeight={height}>
    <div class="inner" style="height: {width}px; width: {height}px">
        <ProgressBar {percentage} on:changePosition/>
    </div>
</div>

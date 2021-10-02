<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let percentage: number = 0;

    const rangeMultiplicator = 1000;



    const handleChange = ({target}) => {
      const {value} = target;

      dispatch('changePosition', {value: value / rangeMultiplicator});
    }

    $: sanitizedPercentage = Math.max(Math.min(percentage, 1), 0);
</script>

<style lang="scss">
    .progress {
      position: relative;
      height: 100%;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;

      &__track, &__indicator, &__input {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      &__track {
        background: #ffffff77;
      }
      &__indicator {
        background: #ffffffaa;
      }
      &__input {
        $thumbSize: 8px;
        margin: 0;
        opacity: 0;
        height: 140%;
        top: -20%;
        left: -$thumbSize;
        width: calc(100% + ($thumbSize * 2));
        cursor: pointer;
      }
    }
</style>

<div class="progress">
    <div class="progress__track"></div>
    <div class="progress__indicator" style="width: {sanitizedPercentage * 100}%"></div>
    <input class="progress__input"
           type="range"
           value={sanitizedPercentage * rangeMultiplicator}
           min="0"
           max="1000"
           on:input={handleChange}
    />
</div>

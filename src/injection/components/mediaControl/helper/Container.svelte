<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  const onHoverChange = (state: boolean) => {
    dispatch('hover', {state})
  }
</script>

<div class="container"
     on:mouseenter={() => onHoverChange(true)}
     on:mouseleave={() => onHoverChange(false)}>
    <slot/>
</div>

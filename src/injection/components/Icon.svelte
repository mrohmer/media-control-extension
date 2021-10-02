<script lang="ts">
  import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';

  export let icon: IconDefinition;
  export let stacked = false;
  $: viewBox = `0 0 ${icon?.icon[0] ?? 0} ${icon?.icon[1] ?? 0}`;
  $: path = icon?.icon[4] ?? [];
</script>

<style>
    .icon {
        width: 1em;
        height: 1em;
        overflow: visible;
        display: inline-block;
    }
</style>

{#if stacked}
    <path fill="currentColor" d="{path}"/>
    <slot/>
{:else}
    <svg
            aria-hidden="true"
            class="icon"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="{viewBox}"
    >
        <path fill="currentColor" d="{path}"/>
        <slot/>
    </svg>
{/if}

<script lang="ts">
    export let condensed = false;
</script>
<style lang="scss">
  .btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 10px;
    outline: 0;

    transition: opacity 0.2s;

    &--condensed {
      opacity: 0.8;
    }

    &:hover {
      background: #ffffff22;
    }
  }
</style>

<button class="btn" class:btn--condensed={condensed} on:click>
    <slot />
</button>

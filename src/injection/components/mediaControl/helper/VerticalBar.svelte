<script lang="ts">
  export let shown = false;
  export let condensed = false;
</script>

<style lang="scss">
  .vertical-bar {
    $this: &;

    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 120px;

    background: #000000aa;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;

    &__value {
      white-space: nowrap;
      font-size: 12px;
      padding: 3px;
      text-align: right;
    }
    &__inner {
      width: 6px;
      margin: 5px auto;
      transition: opacity 0.2s;
      flex: 1;

      &--condensed {
        opacity: 0.7;
      }
    }

    &--shown {
      opacity: 1;
      pointer-events: all;
    }
  }
</style>

<div class="vertical-bar" class:vertical-bar--shown={shown}>
    {#if $$slots.value}
        <div class="vertical-bar__value">
            <slot name="value"/>
        </div>
    {/if}
    <div class="vertical-bar__inner" class:vertical-bar__inner--condensed={condensed}>
        <slot/>
    </div>
</div>

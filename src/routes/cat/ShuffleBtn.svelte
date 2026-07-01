<script lang="ts">
  interface Props {
    loading: boolean;
    disabled: boolean;
    onclick: () => void;
  }

  let { loading = false, disabled = false, onclick }: Props = $props();
</script>

<button type="button" {disabled} {onclick}>
  {loading ? 'Shuffling...' : 'New random cat'}
</button>

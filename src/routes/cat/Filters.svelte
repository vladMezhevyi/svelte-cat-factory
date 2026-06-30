<script lang="ts">
  import { CatType, type CatFilters } from '$lib/types/cat';

  interface Props {
    type?: string | null;
    disabled: boolean;
    onFiltersChange: (filters: CatFilters) => void;
  }

  const { type, disabled, onFiltersChange }: Props = $props();

  const types = Object.values(CatType);

  const onTypeChange = (target: HTMLSelectElement): void => {
    onFiltersChange({ type: (target.value || null) as CatType | null });
  };
</script>

<form>
  <select {disabled} value={type} onchange={(e) => onTypeChange(e.currentTarget)}>
    <option value={null}></option>
    {#each types as type (type)}
      <option value={type}>{type}</option>
    {/each}
  </select>
</form>

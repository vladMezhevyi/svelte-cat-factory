<script lang="ts">
  import { catFilters, catTypes } from '$lib/constants/cat.constants';
  import { CatFilter, CatType, type CatFilters } from '$lib/types/cat.types';

  interface Props {
    type?: CatType | null;
    filter?: CatFilter | null;
    disabled: boolean;
    onFiltersChange: (filters: CatFilters) => void;
  }

  const { type, filter, disabled, onFiltersChange }: Props = $props();

  const onTypeChange = (target: HTMLSelectElement): void => {
    onFiltersChange({ type: (target.value || null) as CatType | null });
  };

  const onFilterChange = (target: HTMLSelectElement): void => {
    onFiltersChange({ filter: (target.value || null) as CatFilter | null });
  };
</script>

<form>
  <select {disabled} value={type} onchange={(e) => onTypeChange(e.currentTarget)}>
    <option value={null}></option>
    {#each catTypes as type (type)}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <select {disabled} value={filter} onchange={(e) => onFilterChange(e.currentTarget)}>
    <option value={null}></option>
    {#each catFilters as filter (filter)}
      <option value={filter}>{filter}</option>
    {/each}
  </select>
</form>

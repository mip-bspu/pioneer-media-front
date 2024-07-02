<script setup>
defineProps({
  headers: Array,
  rows: Array,
  headerSticky: {type: Boolean, default: false}
})
const emit = defineEmits(['update:select'])

const getStyle = (head)=>{
  return {
    textAlign: head.align || "left"
  }
}
</script>

<template>
<q-markup-table>
  <thead :class="{'header-sticky': headerSticky}">
    <tr>
      <th v-for="header in headers" :style="getStyle(header)">
        {{ header.label }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows" @click="emit('update:select', row)">
      <td v-for="header in headers" :style="getStyle(header)">
        <slot :name="`item.${header.field}`" :item="row">
          {{ row[header.field] }}
        </slot>
      </td>
    </tr>
  </tbody>
</q-markup-table>
</template>

<style scoped lang="scss">
.header-sticky{
  tr th{
    position: sticky;
    z-index: 1;
    background-color: white;
  }

  tr > *{
    top: 0;
  }
}

thead th{
  font-weight: 600;
  font-size: 0.88em;
}
</style>
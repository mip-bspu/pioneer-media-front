<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {type: String, default: ""},
  mask: {type: String, default: "YYYY-MM-DD"}
})
// TODO: mask
</script>

<template>
<q-input 
  :modelValue="modelValue" 
  @update:model-value="(event)=>emit('update:modelValue', event)"
  :mask="mask?.replace(/[a-zA-Z]/g, '#') || ''"
>
  <template v-slot:append>
    <q-btn icon="mdi-calendar-today" size="md" round flat color="primary">
      <q-popup-proxy>
        <q-date 
          :modelValue="modelValue"
          @update:model-value="(event)=>emit('update:modelValue', event)"
          today-btn
          :mask="mask"
        >
          <div class="row justify-end">
            <q-btn label="Закрыть" color="primary" flat v-close-popup/>
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </template>
</q-input>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {type: String, default: ""},
  mask: {type: String, default: "DD.MM.YYYY"}
})
// TODO: mask
// TODO: date utils default today
</script>

<template>
<q-input :modelValue="modelValue" @update:model-value="(event)=>emit('update:modelValue', event)">
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
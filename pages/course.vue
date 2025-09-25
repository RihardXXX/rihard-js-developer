<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

export default defineComponent({
  name: 'Course',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  layout: 'course',
});
</script>
<template>
  <div>
    <br />
    <br />
    <Subtitle>для кого этот курс</Subtitle>
    <Description>описание</Description>
    <CodeBlock>
      <template #default> const greet = (name) => 'Hello, ${name}!' </template>
    </CodeBlock>
  </div>
</template>

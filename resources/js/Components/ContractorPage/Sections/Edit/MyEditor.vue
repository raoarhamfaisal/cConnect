<template>
  <div>
    <!-- Bind the CKEditor component to a model. -->
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Use the Classic Editor build.
const editor = ClassicEditor;

// Editor content.
const editorData = ref("<p>Hello from CKEditor 5!</p>");

// Editor configuration.
const editorConfig = ref({
  // Add your configuration here.
  // For example, the toolbar setting:
  //   toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
});
</script>

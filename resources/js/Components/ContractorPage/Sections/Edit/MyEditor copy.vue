<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
  ></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import { ref } from "vue";

export default {
  setup() {
    const editor = ClassicEditor;
    const editorData = ref("");
    const editorConfig = {
      plugins: [Essentials, Paragraph, Bold, Italic],
      toolbar: ["bold", "italic"],
    };

    return {
      editor,
      editorData,
      editorConfig,
    };
  },
};
</script>

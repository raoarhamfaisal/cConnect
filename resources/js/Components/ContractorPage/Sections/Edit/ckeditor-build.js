// ckeditor-build.js

import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [Essentials, Bold, Italic, Link, Paragraph];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: ["bold", "italic", "link"],
};

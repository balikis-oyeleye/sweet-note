import { useEditor } from "@tiptap/react";
import { RichTextEditor as MantineRichTextEditor, Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Highlight,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    autofocus: false,
    injectCSS: true,
    editable: true,
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <MantineRichTextEditor
        editor={editor}
        style={{ border: "none", background: "transparent" }}
      >
        <MantineRichTextEditor.Toolbar
          sticky
          stickyOffset={60}
          className="p-4 md:p-5 border-b border-gray-200"
          style={{
            borderRadius: "0.75rem 0.75rem 0 0 !important",
            overflowX: "auto",
            background: "var(--color-light)",
          }}
        >
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.H1 />
            <MantineRichTextEditor.H2 />
            <MantineRichTextEditor.H3 />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Bold />
            <MantineRichTextEditor.Italic />
            <MantineRichTextEditor.Underline />
            <MantineRichTextEditor.Strikethrough />
            <MantineRichTextEditor.Highlight />
            <MantineRichTextEditor.Code />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.AlignLeft />
            <MantineRichTextEditor.AlignCenter />
            <MantineRichTextEditor.AlignJustify />
            <MantineRichTextEditor.AlignRight />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.BulletList />
            <MantineRichTextEditor.OrderedList />
            <MantineRichTextEditor.Blockquote />
            <MantineRichTextEditor.Hr />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ColorPicker
            colors={[
              "#000",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fff",
            ]}
          />

          <MantineRichTextEditor.ClearFormatting />

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
        </MantineRichTextEditor.Toolbar>

        <MantineRichTextEditor.Content />
      </MantineRichTextEditor>
    </div>
  );
};

export default RichTextEditor;

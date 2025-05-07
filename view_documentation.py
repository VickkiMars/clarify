import sys
from markdown import Markdown
from PyQt5.QtWidgets import QApplication, QTextEdit
from PyQt5.QtGui import QFont

def view_markdown():
    """
    Opens a markdown file and displays it in a simle PyQt window.

    Args:
        filename (str): The path to the markdown file
    """
    filename = r"README.md"
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            markdown_text = f.read()
    except FileNotFoundError:
        print(f"Error: File not foung: {filename}")
        sys.exit(1)

    app = QApplication(sys.argv)
    text_edit = QTextEdit()
    font = QFont("Poppins", 18)
    text_edit.setFont(font)

    stylesheet = """
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #2429e;
        background-color: #f6f8fa;
        padding: 20px;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #22863a;
        font-weight: bold;
        line-height: 1.2;
        margin-top: 1em;
        margin-bottom: 0.5em;
    }
    code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        font-size: 14px;
        background-color: #f6f8fa;
        border: 1px solid #d1d5da;
        padding: 0.2em 0.4em;
        border-radius: 3px;
    }
    pre {
        background-color: #f6f8fa;
        border: 1px solid #d1d5da;
        padding: 1em;
        border-radius: 3px;
        overflow: auto;
    }
    blockquote {
        color: #6a737d;
        border-left: 0.25em solid #dfe2e5;
        padding-left: 0.5em;
        margin: 1em 0
    }
    """
    md = Markdown(extensions=['fenced_code'])
    html_body = md.convert(markdown_text)
    html = f"""
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8">
            <title>{filename}</title>
            <style>{stylesheet}<style>
            </head>
            <body>{html_body}</body>
        </html>
    """

    text_edit.setHtml(html)
    text_edit.setWindowTitle(filename)
    text_edit.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    view_markdown()
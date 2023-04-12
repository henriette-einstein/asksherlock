import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

export function useMarkdown()  {

  async function markdownToHtml(markdownText: string) {
    const result = await unified()
      .use(markdown)
      .use(remarkGfm)
      .use(remark2rehype)
      .use(html)
      .process(markdownText);
    return result.toString();
  }

  return {
    markdownToHtml,
  };

}

import { FileItemChunk } from "@/types"
import { encode } from "gpt-tokenizer"
import { RecursiveCharacterTextSplitter,TextSplitter } from "langchain/text_splitter"
import { CHUNK_OVERLAP, CHUNK_SIZE } from "."

export class RecursiveCharacterTextSplitter implements TextSplitter {
  constructor(private options: { chunkSize: number; chunkOverlap: number }) { }

  async createDocuments(text: string): Promise<{ pageContent: string }[]> {
    // 这里应该包含实际的文本拆分逻辑，下面仅是一个示例
    let position = 0;
    const documents: { pageContent: string }[] = [];

    while (position < text.length) {
      const endPosition = Math.min(position + this.options.chunkSize, text.length);
      const chunk = text.substring(position, endPosition);
      documents.push({ pageContent: chunk });
      position += this.options.chunkSize - this.options.chunkOverlap; // 处理重叠
    }

    return documents;
  }
}

export const processDocX = async (text: string): Promise<FileItemChunk[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP
  });

  const splitDocs = await splitter.createDocuments(text);
  
  // 使用map而不是循环来创建Promise数组
  const chunkPromises: Promise<FileItemChunk>[] = splitDocs.map(async doc => {
    const tokensCount: number = encode(doc.pageContent).length;
    return {
      content: doc.pageContent,
      tokens: tokensCount,
    };
  });

  // 并行处理所有文档块
  const chunks: FileItemChunk[] = await Promise.all(chunkPromises);
  return chunks;
}
import { FileItemChunk } from "@/types"
import { encode } from "gpt-tokenizer"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { CHUNK_OVERLAP, CHUNK_SIZE } from "."

export const processDocX = async (text: string): Promise<FileItemChunk[]> => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP
  })
  const splitDocs = await splitter.createDocuments([text])

  // 使用Promise.all来并行处理chunks的生成
  const chunkPromises = splitDocs.map(async (doc) => {
    return {
      content: doc.pageContent,
      tokens: encode(doc.pageContent).length
    };
  });

  const chunks: FileItemChunk[] = await Promise.all(chunkPromises);
  return chunks;
}
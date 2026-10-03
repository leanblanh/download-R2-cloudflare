
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

export async function promptUser(question) {
  const rl = readline.createInterface({ input, output });
  console.log("--- DOWNLOADER CLOUDFLARE R2 ---");

  // Pergunta o mês no terminal
  if (!question) {
    console.error("Erro: A pergunta não foi fornecida.");
    rl.close();
    return null;
  }
  
  const result = await rl.question(question);
  rl.close();


  return result.trim();
}
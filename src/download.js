import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";


export async function downloadFiles(bucketName, localFolder, s3Client, month) {
  try {

    if (!month) {
      console.error("Erro: O mês não foi fornecido.");  
      return;
    }

    const actualYear = new Date().getFullYear();

    const prefixPath= `${actualYear}/${month}/prod`;

    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefixPath,
    });

    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents) {
      console.log("Nenhum arquivo encontrado com o prefixo especificado.");
      return;
    }

    for (const item of listResponse.Contents) {
      const keyR2 = item.Key;
      if (keyR2.endsWith("/")) continue;

      const localFinalPath = path.join("out",localFolder, keyR2);

      // Cria a pasta local se não existir
      fs.mkdirSync(path.dirname(localFinalPath), { recursive: true });

      console.log(`Baixando ${keyR2} para ${localFinalPath}...`);

      const downloadCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: keyR2,
      });

      const { Body } = await s3Client.send(downloadCommand);

      // Salva o arquivo localmente
      await pipeline(Body, fs.createWriteStream(localFinalPath));
    }
    console.log("Download concluído com sucesso!");
    } catch (error) {
    console.error("Erro ao baixar arquivos:", error);
  }
}
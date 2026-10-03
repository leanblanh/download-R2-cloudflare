import { S3Client} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { promptUser } from "./src/prompt.js";
import { downloadFiles } from "./src/download.js";

dotenv.config();

const accountId = process.env.ACCOUNT_ID;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
let localFolder = process.env.PASTA_DESTINO_LOCAL;

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

const month = await promptUser("Digite o número do mês que deseja baixar (ex: 01, 05, 10): ");
const promptedLocalFolder = await promptUser("Digite a pasta de destino local: ");

if (promptedLocalFolder) {
  localFolder = promptedLocalFolder;
} else {
  localFolder = process.env.PASTA_DESTINO_LOCAL || ".";
  console.log(`Pasta de destino local não fornecida. Seguindo com a pasta padrão: 
    ${localFolder}`);
}

downloadFiles(bucketName, localFolder, s3Client, month);
    
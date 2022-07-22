import fs from 'fs';
import path from 'path';

export default async function ErrorRecorder(error: Error): Promise<void> {
  const currentDate = new Date().toISOString().split('T')[0];

  const logFolder = path.resolve(__dirname, 'logs');
  const filename = path.resolve(logFolder, `${currentDate}.txt`);

  const errorMsg = `Error happened at ${new Date().toLocaleString(
    'pt-BR',
  )}\n${error} - ${error.message}\n\n`;

  await fs.promises.writeFile(filename, errorMsg, { flag: 'a' });
}

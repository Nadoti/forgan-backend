import fs from "fs"

export const deleteFile = async(filename: string) => {
  // stat verifica se um arquivo exist ou nao na nosso diretorio
  try {
    await fs.promises.stat(filename)
  } catch {
    return;
  }
  await fs.promises.unlink(filename)
}
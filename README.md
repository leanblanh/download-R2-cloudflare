# Cloudflare R2 Downloader

A Node.js command-line application for downloading NFSe XML files from a Cloudflare R2 storage bucket.

## How It Works

The application prompts for a month and, optionally, a destination folder. It then searches the bucket using this prefix:

```text
<current-year>/<month>/prod/
```

The year comes from the system date of the computer running the application. Files are saved locally under `out/`, preserving the structure of their R2 object keys.

## Requirements

- Node.js 20 or later
- A Cloudflare R2 account with read access to the bucket
- The account ID, bucket name, and R2 access credentials

## Installation

Download or clone this repository, open the project directory, and install the dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with your account details:

```dotenv
ACCOUNT_ID=your_account_id
ACCESS_KEY=your_access_key
SECRET_KEY=your_secret_key
BUCKET_NAME=your_bucket_name
PASTA_DESTINO_LOCAL=.
```

`PASTA_DESTINO_LOCAL` is optional. It specifies a subfolder under `out/` and can be set to `.`. The folder entered at the runtime prompt takes precedence. If the prompt is left empty, the application uses the `.env` value or defaults to `.`.

Do not share or publish your `.env` file. This project's `.gitignore` ignores `.env*` files; keep credentials out of logs, screenshots, and public examples as well.

## Usage

```bash
npm start
```

Enter the month using two digits, such as `09`, then enter the desired local folder. Press Enter at the folder prompt to use the default.

With `PASTA_DESTINO_LOCAL=.` and month `09`, an object with the key `2026/09/prod/document.xml` will be saved to:

```text
out/2026/09/prod/document.xml
```

If the destination folder is `nfse`, the file will be saved to:

```text
out/nfse/2026/09/prod/document.xml
```

## Project Structure

```text
index.js        Initializes the R2 client, prompts for parameters, and starts the download
src/prompt.js   Reads input from the terminal
src/download.js Lists objects and saves files locally
out/            Output directory created during the download
```

## Notes

- The application searches the current system year; the current interface does not let you specify a different year.
- Listing currently uses a single `ListObjectsV2` request. Since this operation returns up to 1,000 objects per request, prefixes containing more files may not be fully downloaded in this version.
- If no files are found, check the month, year, and `prod/` prefix in the bucket.

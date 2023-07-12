# jpostcoder CLI

Create sqlite3 of postal data (utf_all.csv) provided by [JapanPost](https://www.post.japanpost.jp/zipcode/download.html).

## One-liner
```console
$ make up
```

## Usage

```console
$ node dist/main.js --help
Usage: jpostcoder [options] [command]

jpostcoder CLI

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  download [options]  download japan postcodes csv (utf_all.csv)
  create              create table
  insert              insert japan postcodes into table
  drop                drop table
  debug               debug for command
  help [command]      display help for command
```
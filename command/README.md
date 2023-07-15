# jpostcoder CLI

Create sqlite3 of postal data (utf_all.csv) provided by
[JapanPost](https://www.post.japanpost.jp/zipcode/download.html).

## Installation

### using Deno

> **Note**<br>
> version: deno 1.35.1 (release, x86_64-unknown-linux-gnu)

```console
$ deno compile --allow-all --unstable https://raw.githubusercontent.com/ddddddO/jpostcoder/main/command/jpostcoder.ts
```

### download binary from [here](https://github.com/ddddddO/jpostcoder/releases).


## Setup with one-liner

```console
$ ./jpostcoder download && ./jpostcoder create && ./jpostcoder insert
```


## Usage

```console
$ ./jpostcoder --help

Usage:   jpostcoder
Version: 0.0.1     

Description:

  jpostcoder CLI

Options:

  -h, --help     - Show this help.                            
  -V, --version  - Show the version number for this program.  

Commands:

  download  - download japan postcodes csv (utf_all.csv)
  create    - create table                              
  insert    - insert japan postcodes into table         
  drop      - drop table                                
  debug     - debug for command
```

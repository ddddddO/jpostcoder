# jpostcoder CLI

Create sqlite3 of postal data (utf_all.csv) provided by
[Japan Post](https://www.post.japanpost.jp/zipcode/download.html).

## Installation

### using Deno

> **Note**<br> version: deno 1.35.1 (release, x86_64-unknown-linux-gnu)

```console
$ deno compile --allow-all --unstable https://raw.githubusercontent.com/ddddddO/jpostcoder/main/command/jpostcoder.ts
```

### download binary from [here](https://github.com/ddddddO/jpostcoder/releases).

## Setup with one-liner

```console
$ ./jpostcoder download && ./jpostcoder drop && ./jpostcoder create && ./jpostcoder insert
```

### Cheack database

```console
$ sqlite3 postcode.db -header -line
SQLite version 3.42.0 2023-05-16 12:36:15
Enter ".help" for usage hints.
sqlite> .tables
postcodes
sqlite> select * from postcodes limit 1;
                 id = 1
               code = 01101
       postcode_old = "060  "
           postcode = "0600000"
           ken_kana = "ホッカイドウ"
municipalities_kana = "サッポロシチュウオウク"
          area_kana = "イカニケイサイガナイバアイ"
                ken = "北海道"
     municipalities = "札幌市中央区"
               area = "以下に掲載がない場合"
              flg_a = 0
              flg_b = 0
              flg_c = 0
              flg_d = 0
              flg_e = 0
              flg_f = 0
sqlite>
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

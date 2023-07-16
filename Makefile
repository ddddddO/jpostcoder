# csv headerについて
# https://www.post.japanpost.jp/zipcode/dl/readme.html 「郵便番号データファイルの形式等」
# ※ utf_all.csvは「全角となっている町域部分の文字数が38文字を越える場合、また半角となっているフリガナ部分の文字数が76文字を越える場合は、複数レコードに分割しています。」ではなくなっている。
fetch:
	curl -o data/raw/utf_all/`date '+%Y%m%d'.csv` https://www.post.japanpost.jp/zipcode/utf_all.csv

create_table:
	sqlite3 postcode.db < schema.sql

conn_db:
	sqlite3 postcode.db -header -line

#create_app:
#	yarn create vite app --template=react-ts

# create_command:
# 	npm init
# 	npm install typescript tslint @types/node
# 	./node_modules/.bin/tsc --init

lint:
	deno lint

fmt:
	deno fmt

clean:
	rm postcode.db utf_all.csv

up: build download drop create insert

build:
	deno compile --allow-all --unstable -o jpostcoder jpostcoder.ts

download:
	./jpostcoder download

create:
	./jpostcoder create

insert:
	./jpostcoder insert

drop:
	./jpostcoder drop

debug:
	./jpostcoder debug

help:
	./jpostcoder --help

.PHONY: release
release:
	deno compile --target x86_64-unknown-linux-gnu --allow-all --unstable -o release/jpostcoder_x86_64-unknown-linux-gnu jpostcoder.ts
	deno compile --target x86_64-pc-windows-msvc --allow-all --unstable -o release/jpostcoder_x86_64-pc-windows-msvc jpostcoder.ts
	deno compile --target x86_64-apple-darwin --allow-all --unstable -o release/jpostcoder_x86_64-apple-darwin jpostcoder.ts
	deno compile --target aarch64-apple-darwin --allow-all --unstable -o release/jpostcoder_aarch64-apple-darwin jpostcoder.ts

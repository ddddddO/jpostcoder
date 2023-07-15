lint:
	deno lint

fmt:
	deno fmt

clean:
	rm postcode.db utf_all.csv

up: build download create insert

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

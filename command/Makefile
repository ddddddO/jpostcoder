build:
	tsc

up: build download create insert

clean:
	rm postcode.db utf_all.csv

download:
	node dist/main.js download

create:
	node dist/main.js create

insert:
	node dist/main.js insert

drop:
	node dist/main.js drop

debug:
	node dist/main.js debug

help:
	node dist/main.js --help

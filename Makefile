install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npm eslint

test:
	npm jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
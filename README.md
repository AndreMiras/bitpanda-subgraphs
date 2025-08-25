# Bitpanda Subgraphs

[![Tests](https://github.com/AndreMiras/bitpanda-subgraphs/actions/workflows/tests.yml/badge.svg)](https://github.com/AndreMiras/bitpanda-subgraphs/actions/workflows/tests.yml)

Unofficial Bitpanda.com Subgraphs

## Subgraph URLs

- [Vision VSN](https://thegraph.com/explorer/subgraphs/9m6ouChjPuv6ShsK9Q3rRkj5tWThz2P3LjKr3JihuR6n)
- [Vision sVSN](https://thegraph.com/explorer/subgraphs/AFHGugzAJbgBSRvNnjEx4c1Wya5M4oMAWa5RsNnjQCrs)

## Install

```sh
npm ci
```

## Build

We're using custom build commands to generate the `schema.graphql` and simplify
the graph build.

```sh
npm run build
```

## Deploy

VSN:

```sh
cd vsn && npx graph deploy vision-vsn
```

sVSN:

```sh
cd svsn && npx graph deploy vision-svsn
```

## Development

Note that we try to keep most of the scaffolded files untouched. This make it
easier to regenerate them as needed e.g. on contract update. This is why we use
`svsn/src/index.ts` and `svsn/src/snapshot.ts` to extend `svsn/src/s-vsn.ts` and
`svsn/snapshot-schema.graphql` to extend `svsn/schema.graphql`.

## Tests

```sh
npm test
```

Or within Docker if the platform is not supported:

```sh
npm test:docker
```

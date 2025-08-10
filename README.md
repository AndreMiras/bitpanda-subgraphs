# Bitpanda Subgraphs

Unofficial Bitpanda.com Subgraphs

## Subgraph URLs

- https://thegraph.com/explorer/subgraphs/AFHGugzAJbgBSRvNnjEx4c1Wya5M4oMAWa5RsNnjQCrs

## Install

```sh
npm ci
```

## Build

We're using custom build commands to generate the `schema.graphql` and simplify
the graph build.

```sh
npm run build:schema
npm run build:graph
```

## Deploy

```sh
cd svsn && npx graph deploy vision-svsn
```

## Development

Note that we try to keep most of the scaffolded files untouched. This make it
easier to regenerate them as needed e.g. on contract update. This is why we use
`svsn/src/index.ts` and `svsn/src/snapshot.ts` to extend `svsn/src/s-vsn.ts` and
`svsn/snapshot-schema.graphql` to extend `svsn/schema.graphql`.

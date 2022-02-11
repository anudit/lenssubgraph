# Lens Protcol Subgraph

Build completed: `QmWMyewHGhMYiDEDigrPJvSbZHziitfakKufZDBUwbdQYV`

Deployed to https://thegraph.com/explorer/subgraph/anudit/lens-protocol

Subgraph endpoints:
Queries (HTTP):     https://api.thegraph.com/subgraphs/name/anudit/lens-protocol

Subscriptions (WS): wss://api.thegraph.com/subgraphs/name/anudit/lens-protocol

Example Query
```graphql
{
  profiles(first: 10) {
    id
    profileId
    pubCount
    owner
    handle
  }
  socialGraphs(first: 10){
    id
    following{
      id
      handle
    }
  }
}
```

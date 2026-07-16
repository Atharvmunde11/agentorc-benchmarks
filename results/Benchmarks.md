# Wolbarg Benchmarks (v0.2)

Generated **2026-07-15T13:59:16.872Z** · suite v2.0.0 · mode `mock` · scale `quick` · backends `sqlite, postgres`

## Methodology

Primary stress and push-to-failure concurrency use a local mock OpenAI-compatible embedding/LLM server. Live OpenAI was not used for failure ramps because API rate limits and quota errors would dominate long before SQLite or PostgreSQL contention, masking true Wolbarg/storage breaking points. A separate LIVE spot suite reports real-network latency for representative insert/search/ingest/compress paths.

A concurrency level fails when errorRate > 1% OR p95 latency > 5s OR a hard integrity/exception failure occurs. Reports record lastHealthyLevel and breakingLevel.

## Environment

| Key | Value |
| --- | --- |
| Node | v24.13.1 |
| Platform | win32/arm64 |
| CPUs | 8 |
| Host RAM | 15.61 GB |
| SDK | wolbarg@0.2.0 |
| Organization | demo-org |
| Embedding mode | local-mock-openai-compatible |
| Embedding model | mock-embed |
| LLM model | mock-llm |
| Embedding dims | 384 |
| Wall clock | 34.87 s |
| Result rows | 92 |

## Summary

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Startup | Cold | sqlite | 7.91 ms |
| Startup | Warm | sqlite | 4.33 ms |
| Compression | 50 | sqlite | 98.00% |
| Compression | 200 | sqlite | 99.50% |
| Concurrency | 2 writers | sqlite | 1.70k ops/sec |
| Concurrency | 4 writers | sqlite | 1.60k ops/sec |
| Concurrency | 8 writers | sqlite | 1.58k ops/sec |
| Concurrency | 16 writers | sqlite | 907.05 ops/sec |
| Memory Usage | baseline (pre-init) | sqlite | heap 28.36 MB / rss 114.89 MB |
| Memory Usage | after init | sqlite | heap 28.42 MB / rss 114.93 MB |
| Memory Usage | after 100 inserts | sqlite | heap 17.16 MB / rss 114.19 MB |
| Memory Usage | after 1000 inserts | sqlite | heap 26.82 MB / rss 105.88 MB |
| Memory Usage | after recall | sqlite | heap 16.86 MB / rss 111.35 MB |
| Memory Usage | after close | sqlite | heap 16.87 MB / rss 111.36 MB |
| Database Size | 100 | sqlite | 376.00 KB |
| Database Size | 1000 | sqlite | 2.98 MB |
| Search | 100 | sqlite | 893.1 µs |
| Search | 1000 | sqlite | 2.02 ms |
| Retrieval top-5 | 1000 | sqlite | 2.16 ms |
| Retrieval top-10 | 1000 | sqlite | 1.56 ms |
| Retrieval top-20 | 1000 | sqlite | 1.84 ms |
| Insert | 100 | sqlite | 1.85k ops/sec |
| Insert | 1000 | sqlite | 1.72k ops/sec |
| Hybrid · semantic | 1000 | sqlite | 2.30 ms |
| Hybrid · hybrid-default | 1000 | sqlite | 2.81 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | sqlite | 2.22 ms |
| Filter · unfiltered | 1000 | sqlite | 2.26 ms |
| Filter · agent-filter | 1000 | sqlite | 1.41 ms |
| Filter · meta.eq | 1000 | sqlite | 2.60 ms |
| Filter · meta.and/or | 1000 | sqlite | 1.53 ms |
| MMR/Rerank · baseline | 1000 | sqlite | 5.10 ms |
| MMR/Rerank · mmr | 1000 | sqlite | 2.33 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | sqlite | 2.78 ms |
| MMR/Rerank · rerank-flag | 1000 | sqlite | 1.66 ms |
| Ingest · inline-markdown | 3 chunks | sqlite | 3.77 ms |
| Ingest · inline-json | 5 chunks | sqlite | 9.73 ms |
| Ingest · sample.md | 1 chunks | sqlite | 2.67 ms |
| Ingest · sample.txt | 1 chunks | sqlite | 1.48 ms |
| Ingest · sample.pdf | 1 chunks | sqlite | 230.35 ms |
| Ingest · sample.docx | 1 chunks | sqlite | 218.55 ms |
| Chunking · fixed | fixed-doc | sqlite | 2.43 ms |
| Chunking · sentence | fixed-doc | sqlite | 2.92 ms |
| Chunking · markdown | fixed-doc | sqlite | 2.62 ms |
| Forget · by id batch | 50 ids | sqlite | 31.89 ms |
| Forget · by agent | engineering | sqlite | 5.06 ms |
| Clear · organization | 200 | sqlite | 18.55 ms |
| Startup | Cold | postgres | 52.95 ms |
| Startup | Warm | postgres | 63.64 ms |
| Compression | 50 | postgres | 98.00% |
| Compression | 200 | postgres | 99.50% |
| Concurrency | 2 writers | postgres | 295.88 ops/sec |
| Concurrency | 4 writers | postgres | 438.97 ops/sec |
| Concurrency | 8 writers | postgres | 554.12 ops/sec |
| Concurrency | 16 writers | postgres | 1.12k ops/sec |
| Memory Usage | baseline (pre-init) | postgres | heap 31.47 MB / rss 145.62 MB |
| Memory Usage | after init | postgres | heap 31.75 MB / rss 145.65 MB |
| Memory Usage | after 100 inserts | postgres | heap 40.18 MB / rss 146.79 MB |
| Memory Usage | after 1000 inserts | postgres | heap 39.20 MB / rss 147.60 MB |
| Memory Usage | after recall | postgres | heap 39.37 MB / rss 147.68 MB |
| Memory Usage | after close | postgres | heap 39.38 MB / rss 147.71 MB |
| Database Size | 100 | postgres | 33.83 MB |
| Database Size | 1000 | postgres | 37.51 MB |
| Search | 100 | postgres | 5.97 ms |
| Search | 1000 | postgres | 4.70 ms |
| Retrieval top-5 | 1000 | postgres | 4.47 ms |
| Retrieval top-10 | 1000 | postgres | 5.41 ms |
| Retrieval top-20 | 1000 | postgres | 7.49 ms |
| Insert | 100 | postgres | 258.16 ops/sec |
| Insert | 1000 | postgres | 288.52 ops/sec |
| Hybrid · semantic | 1000 | postgres | 4.66 ms |
| Hybrid · hybrid-default | 1000 | postgres | 17.97 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | postgres | 10.31 ms |
| Filter · unfiltered | 1000 | postgres | 4.50 ms |
| Filter · agent-filter | 1000 | postgres | 2.54 ms |
| Filter · meta.eq | 1000 | postgres | 4.20 ms |
| Filter · meta.and/or | 1000 | postgres | 4.26 ms |
| MMR/Rerank · baseline | 1000 | postgres | 4.64 ms |
| MMR/Rerank · mmr | 1000 | postgres | 3.30 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | postgres | 3.19 ms |
| MMR/Rerank · rerank-flag | 1000 | postgres | 3.36 ms |
| Ingest · inline-markdown | 3 chunks | postgres | 14.06 ms |
| Ingest · inline-json | 5 chunks | postgres | 18.36 ms |
| Ingest · sample.md | 1 chunks | postgres | 9.86 ms |
| Ingest · sample.txt | 1 chunks | postgres | 9.19 ms |
| Ingest · sample.pdf | 1 chunks | postgres | 22.31 ms |
| Ingest · sample.docx | 1 chunks | postgres | 14.68 ms |
| Chunking · fixed | fixed-doc | postgres | 24.10 ms |
| Chunking · sentence | fixed-doc | postgres | 21.95 ms |
| Chunking · markdown | fixed-doc | postgres | 15.82 ms |
| Forget · by id batch | 50 ids | postgres | 200.35 ms |
| Forget · by agent | engineering | postgres | 35.13 ms |
| Clear · organization | 200 | postgres | 230.46 ms |

## Detailed Results

### sqlite · Startup Benchmark

Measures cold vs warm Wolbarg.ready() time (storage open, schema, embedding/LLM health probes).

_Section duration: 605.66 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Startup | Cold | sqlite | 7.91 ms |
| Startup | Warm | sqlite | 4.33 ms |

#### Metrics

##### Startup — Cold (sqlite)

| Metric | Value |
| --- | --- |
| avgInitMs | 7.91 ms |
| minMs | 7.40 ms |
| maxMs | 8.26 ms |
| iterations | 3 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "samplesMs": [
    7.399699999999939,
    8.08159999999998,
    8.25590000000011
  ],
  "definition": "New Wolbarg + ready() against a freshly cleaned storage namespace each iteration"
}
```

</details>

##### Startup — Warm (sqlite)

| Metric | Value |
| --- | --- |
| avgInitMs | 4.33 ms |
| minMs | 3.42 ms |
| maxMs | 5.96 ms |
| iterations | 3 |
| tinybenchHz | 278.21 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "samplesMs": [
    3.42049999999972,
    3.621099999999842,
    5.959200000000237
  ],
  "definition": "Reopen existing populated organization / DB file"
}
```

</details>


#### Startup methodology

- Backend: **sqlite**
- **Cold**: cleaned storage + migrations + provider probes.
- **Warm**: reopen existing populated memory store.

### sqlite · Compression Benchmark

Measures Wolbarg.compress() duration, active-set reduction, and storage delta.

_Section duration: 227.57 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Compression | 50 | sqlite | 98.00% |
| Compression | 200 | sqlite | 99.50% |

#### Metrics

##### Compression — 50 (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 10.31 ms |
| beforeActive | 50 |
| afterActive | 1 |
| afterArchived | 50 |
| beforeTotal | 50 |
| afterTotal | 51 |
| reduction | 98.00% |
| limit | 50 |
| beforeBytes | 3.17 MB |
| afterBytes | 3.36 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "agent": "engineering",
  "compressResult": {
    "summary": {
      "id": "61a1f692-1540-49a5-9ce8-f3511603c3ba",
      "organization": "demo-org-sqlite-compression-50",
      "agent": "engineering",
      "content": {
        "text": "Compressed agent memory summary covering related operational notes. Key themes extracted from 2 messages: billing, meetings, deployments, and follow-ups. Source snippet: You are a memory compression engine for multi-agent systems.\nGiven related memories from a single agent, produce ONE concise summary that preserves:\n- Key facts and decisions\n- Imp"
      },
      "metadata": {
        "compressed": true,
        "sourceCount": 50,
        "sourceIds": [
          "5296b177-1b9b-4941-8bff-56a7205b848c",
          "1a7b54bc-48b2-427d-8c2e-1a15f4f615a3",
          "cc3aea07-1cea-4176-90a1-fdcb9f79b80c",
          "643a61e4-4def-4a7f-b73a-c83512529550",
          "cf953f26-a139-43a3-9396-0d0c61df0a12",
          "ee39dc7b-942e-4ec5-873d-4940ec9dd6f0",
          "d6a657bf-6575-4f9f-a8db-d4788fd6e7a9",
          "eba14148-b39a-4327-ae82-bed2932d4b64",
          "ff13fb4e-8c48-4dc7-b468-60fa55839c21",
          "d3f74d34-11a8-4e99-8192-930ef1a97bfe",
          "59df36f0-752f-4ac8-a08b-df5e415ca63f",
          "62978c2b-55c3-4d41-ae2a-45edd757892f",
          "3f66a323-6699-4913-b34d-f7ba164afdd8",
          "c694a64a-96f8-4a15-9d5b-68952f5b557c",
          "f44c55b6-fccf-44f8-bc63-7661993ecd19",
          "5f096ef6-a1e1-46d5-9ae4-08cd173c01f8",
          "77729348-0301-4b9c-9386-2b308045cf33",
          "9c7b418c-5f44-4a15-b33f-06c3722ac81d",
          "6b5e12fe-d4f0-49a7-8f0b-2c481872f6f4",
          "2b3d34bf-3c8a-4cd5-a698-9260ec773dba",
          "945852bd-3017-45a4-a429-1f01e037be1c",
          "461bd63b-01c4-4ef5-9d4f-8e28ba1b3759",
          "42ca791d-cd9b-4207-9557-4c109ae61e48",
          "527e7e17-02e5-4f8c-b3eb-e5edfca89673",
          "7e749050-a26f-4fa7-910f-ca847b021b42",
          "c590d9f6-9fe5-44b5-8074-addbfbf7f91d",
          "4cc95022-ec0d-4c7b-941c-359d1fe15d2c",
          "966f0e0e-c730-4cb7-9649-44ad9881149d",
          "ef9d68a3-698b-46d7-bbea-a5ebb0f394fc",
          "2874140f-6f01-486a-8058-0525f9fd7def",
          "ee889d81-b653-468d-b036-4fb41ffd2103",
          "5350f6a2-37b5-414e-885a-e44aa38fa9f4",
          "32d58d0b-f108-47a1-b6a6-609456c000fb",
          "3aa4a336-a9e0-45a3-a714-7eb39cefcc08",
          "aeb47d58-fe4d-4058-82a4-bbbd38751600",
          "82b8aded-013a-4e9d-a948-b93c6d177d9b",
          "83f763d6-335d-43c5-a5d9-5d55f33667ef",
          "e6eabc8d-2eb5-49a2-97f6-f7c7ef4e66cd",
          "ce15aedf-4007-467c-8925-b4872c21994b",
          "74b0e9d4-bb19-4c35-a7e9-fe2016d909ea",
          "f6abcae6-a831-4651-b328-573f35c12388",
          "073d6ab5-30f8-4241-9a95-bb9eb22f45c6",
          "1c575acc-b8db-44f7-9c4d-f013bedef474",
          "f05c7063-a948-4c48-a70a-eb12c16e2071",
          "0437afb9-416c-4d65-bc1e-c20d3e625fd1",
          "a329f095-2c7a-41d9-9a77-cb8f0ec57283",
          "0e564dd3-04ab-4c4c-85c3-d772dd76e188",
          "95372ea8-85fe-4e04-bd17-32bdb0f8aa47",
          "6ef65104-8da8-475f-894a-37a4e24547a2",
          "722d0498-285d-4570-8ac6-df5e9e71b08e"
        ]
      },
      "archived": false,
      "compressedInto": null,
      "createdAt": "2026-07-15T13:58:44.808Z",
      "updatedAt": "2026-07-15T13:58:44.808Z"
    },
    "archivedIds": [
      "5296b177-1b9b-4941-8bff-56a7205b848c",
      "1a7b54bc-48b2-427d-8c2e-1a15f4f615a3",
      "cc3aea07-1cea-4176-90a1-fdcb9f79b80c",
      "643a61e4-4def-4a7f-b73a-c83512529550",
      "cf953f26-a139-43a3-9396-0d0c61df0a12",
      "ee39dc7b-942e-4ec5-873d-4940ec9dd6f0",
      "d6a657bf-6575-4f9f-a8db-d4788fd6e7a9",
      "eba14148-b39a-4327-ae82-bed2932d4b64",
      "ff13fb4e-8c48-4dc7-b468-60fa55839c21",
      "d3f74d34-11a8-4e99-8192-930ef1a97bfe",
      "59df36f0-752f-4ac8-a08b-df5e415ca63f",
      "62978c2b-55c3-4d41-ae2a-45edd757892f",
      "3f66a323-6699-4913-b34d-f7ba164afdd8",
      "c694a64a-96f8-4a15-9d5b-68952f5b557c",
      "f44c55b6-fccf-44f8-bc63-7661993ecd19",
      "5f096ef6-a1e1-46d5-9ae4-08cd173c01f8",
      "77729348-0301-4b9c-9386-2b308045cf33",
      "9c7b418c-5f44-4a15-b33f-06c3722ac81d",
      "6b5e12fe-d4f0-49a7-8f0b-2c481872f6f4",
      "2b3d34bf-3c8a-4cd5-a698-9260ec773dba",
      "945852bd-3017-45a4-a429-1f01e037be1c",
      "461bd63b-01c4-4ef5-9d4f-8e28ba1b3759",
      "42ca791d-cd9b-4207-9557-4c109ae61e48",
      "527e7e17-02e5-4f8c-b3eb-e5edfca89673",
      "7e749050-a26f-4fa7-910f-ca847b021b42",
      "c590d9f6-9fe5-44b5-8074-addbfbf7f91d",
      "4cc95022-ec0d-4c7b-941c-359d1fe15d2c",
      "966f0e0e-c730-4cb7-9649-44ad9881149d",
      "ef9d68a3-698b-46d7-bbea-a5ebb0f394fc",
      "2874140f-6f01-486a-8058-0525f9fd7def",
      "ee889d81-b653-468d-b036-4fb41ffd2103",
      "5350f6a2-37b5-414e-885a-e44aa38fa9f4",
      "32d58d0b-f108-47a1-b6a6-609456c000fb",
      "3aa4a336-a9e0-45a3-a714-7eb39cefcc08",
      "aeb47d58-fe4d-4058-82a4-bbbd38751600",
      "82b8aded-013a-4e9d-a948-b93c6d177d9b",
      "83f763d6-335d-43c5-a5d9-5d55f33667ef",
      "e6eabc8d-2eb5-49a2-97f6-f7c7ef4e66cd",
      "ce15aedf-4007-467c-8925-b4872c21994b",
      "74b0e9d4-bb19-4c35-a7e9-fe2016d909ea",
      "f6abcae6-a831-4651-b328-573f35c12388",
      "073d6ab5-30f8-4241-9a95-bb9eb22f45c6",
      "1c575acc-b8db-44f7-9c4d-f013bedef474",
      "f05c7063-a948-4c48-a70a-eb12c16e2071",
      "0437afb9-416c-4d65-bc1e-c20d3e625fd1",
      "a329f095-2c7a-41d9-9a77-cb8f0ec57283",
      "0e564dd3-04ab-4c4c-85c3-d772dd76e188",
      "95372ea8-85fe-4e04-bd17-32bdb0f8aa47",
      "6ef65104-8da8-475f-894a-37a4e24547a2",
      "722d0498-285d-4570-8ac6-df5e9e71b08e"
    ]
  },
  "note": "Percent is active memory-count reduction (archived rows retained for lineage). Disk reclaim requires VACUUM / dead-tuple cleanup."
}
```

</details>

##### Compression — 200 (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 24.61 ms |
| beforeActive | 200 |
| afterActive | 1 |
| afterArchived | 200 |
| beforeTotal | 200 |
| afterTotal | 201 |
| reduction | 99.50% |
| limit | 200 |
| beforeBytes | 4.64 MB |
| afterBytes | 4.64 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "agent": "engineering",
  "compressResult": {
    "summary": {
      "id": "e9261e0c-f87e-40ba-b555-90088c01af63",
      "organization": "demo-org-sqlite-compression-200",
      "agent": "engineering",
      "content": {
        "text": "Compressed agent memory summary covering related operational notes. Key themes extracted from 2 messages: billing, meetings, deployments, and follow-ups. Source snippet: You are a memory compression engine for multi-agent systems.\nGiven related memories from a single agent, produce ONE concise summary that preserves:\n- Key facts and decisions\n- Imp"
      },
      "metadata": {
        "compressed": true,
        "sourceCount": 200,
        "sourceIds": [
          "db534c8f-e810-4169-a46f-575aa9969c7e",
          "59d8e696-dd45-4d30-b389-a4c04b74f35f",
          "36052f86-d991-420c-aa01-6b5a7942198e",
          "870139d7-db7c-4141-aa3a-b956b767ebc6",
          "c22efa64-1fd2-4956-9324-8a423532e743",
          "f6aaa42a-6194-4d31-8860-dc31832ce4be",
          "8b66a876-adc9-40ad-8002-02f92ab77f94",
          "92673de4-d9ac-45c7-95ec-4a3d7c283ffd",
          "e9ae72dc-2df2-461f-9935-33dc8c6c5caf",
          "9bb40472-3326-4ec9-aa30-ecec895da706",
          "1615c69c-293b-44d8-9b87-8dfb84aaea2c",
          "80136048-7b36-4792-86c6-c01d9c0eed6b",
          "ec323086-2cbc-4216-9d0a-f1602ea64b46",
          "e5c395fc-c889-474e-9c6f-f7a79be96e49",
          "d1a62168-5221-400d-9a90-1aaf33eaff08",
          "8d1525eb-4663-4730-86cf-4db6db873436",
          "6ad2af9f-06d4-454a-bc6f-f18f54276c50",
          "16337353-04bc-45f3-b12b-91d739bc0d33",
          "2b6f7ddf-0323-4976-bac3-0be4d79b7ef9",
          "14ee73fe-ba0c-41f7-8187-2c0f9f7f1c1f",
          "ce0b1fba-bb2c-4aed-9602-996ac6f3728f",
          "9091f221-93b1-4dbc-bb1d-83fad42a59f1",
          "349a6afa-f4cf-44ad-aad9-7dcae03d0ebc",
          "e3330ae5-bfe5-44b8-b680-86742648dadd",
          "0f0ba490-9ad6-4c6e-bcc3-08538601ad84",
          "521cb0a4-b3f0-4d6b-9f11-a1c4bafe11d1",
          "0bbb5026-5835-40b9-835f-49a2a10b9fd2",
          "2b6f6004-421b-49c3-a2fe-b00814d2e025",
          "222ec056-ceb5-4029-9010-4a8ae2b4f291",
          "26631c52-714b-40d4-860c-eb1e46b5ad0b",
          "1f382ba5-4953-401d-ab15-d55b0a8f87f5",
          "bb6b2249-2f72-44a6-850a-6026fcd62e32",
          "a1ec6b54-edcd-4047-8dbf-bfe9d786105e",
          "ed68248b-8efa-452f-bc31-a396463cd7ce",
          "f3384ef1-cd12-4c15-9d49-a6b3d17523bf",
          "1d0f32a2-12d1-4cec-9d70-6d67f94619b4",
          "6088371a-78bc-402d-907f-59ba5d19aab9",
          "585c44e2-ead0-4589-8459-07cf6e035d9f",
          "8e27fcc7-ecb2-4c60-9f79-4ccdc318c3f5",
          "558e481c-fa43-4660-a1fc-56854e617441",
          "da7666f8-16f2-4a28-8a32-cd47166e5362",
          "f8181787-e08c-424e-91ce-f702ee73311e",
          "4c029412-5566-4a46-ad9c-2e3d87c56121",
          "8eb50e46-0006-485b-b3d4-55b26ad18fa7",
          "2954810a-4ad2-4f02-a0dd-86431b564fe6",
          "c650f0aa-ced2-47c6-97e8-4463c970f2bc",
          "715c9558-315d-487c-a9b6-7ee48aeba674",
          "8055961b-7b81-4b41-ae27-43bfa770dca7",
          "0336d393-2d3a-4331-bfa5-624511888871",
          "fa44d610-a556-4a67-8e2b-202dafc4d991",
          "4324a113-054f-4159-bbba-0cfc76ce7d13",
          "0d3712ec-caaf-4e3c-91eb-0f32c8715d62",
          "78064616-0ea1-40b3-874b-7cd800de82b3",
          "3da6bbe4-f4a6-4a4b-be94-774dc6f03a2e",
          "bd153005-6ed6-4713-90f3-4a069d347e01",
          "5610a48c-1afa-4225-8b5c-7c676dd110f0",
          "bd14c393-ea0e-43c5-94b9-2a7472e01c1a",
          "8bb17e45-dd6b-4581-8711-d004acadd3b1",
          "13bbdcab-9165-4042-ab05-1315175acadb",
          "f9f07d6f-7a9c-41ef-87ce-032b77ac7cb7",
          "622d07ab-3415-4978-97d8-a55e8feb1eef",
          "4250bb44-df08-4904-a601-3c643230626a",
          "a224cccd-27c3-4902-9c58-7127501164ed",
          "4905c89c-0710-4b20-87e2-f4fff07d92c9",
          "b502ef59-aa43-4de8-864b-c6c767c19cc0",
          "b345734a-d29f-49a7-8a32-d8fda3350f00",
          "aa695aed-3e56-4573-a458-83cb699ff186",
          "6777a8a7-3ebb-4c05-a10f-5cfa4c4a4643",
          "adf734d9-a876-4b1f-9e9e-5d81ff56842f",
          "11d1badc-752e-4c1e-a7c6-abeec97a9f44",
          "732affe8-a094-4c11-95a7-cdf332c9a446",
          "c28ce834-dcb8-4a2b-8430-c491623044ed",
          "a7d2e273-c91f-4bdd-aa9b-2d35adb3ad9a",
          "c4c1ecd2-d0b2-471c-8341-d15cb1174da2",
          "32bdaed4-4890-4fd7-ad98-08557f871fcb",
          "1c69df46-0ccb-4c3c-b084-af8a0e640b2c",
          "9ce9bcca-15df-4b03-8999-9da6f65d7743",
          "0db0dd48-3724-429a-8db3-3322cd14454f",
          "b43ddbf3-fc49-4313-acc3-bbad37169f91",
          "f735546b-5acc-40c6-92ce-e8857a1f0c5c",
          "fab5fc76-0c1f-474f-8890-89a258f0b6f9",
          "649c8c3b-b5ca-4565-a8e7-4b9af146f4b3",
          "4ad23683-355e-4ffe-95c4-b346f632a4bc",
          "8896b3ce-2460-49fe-a135-2e142cb018e9",
          "23622204-d04d-4b35-b4c9-cbdb0c0e1fd0",
          "14de10e3-6dc2-4502-b876-b9522725b287",
          "295882da-7e63-4d77-b41c-7276eb646496",
          "47a43555-d419-4f1b-b5f0-9cad079d781f",
          "93ed0dd7-7b28-434b-9ff5-e1f294fb306d",
          "480ed390-2419-41e0-9db2-934127c1cf84",
          "c456962e-7f6c-4d9c-84fb-7c5dd9c64f4d",
          "2629dadb-643e-44ec-99ea-59e642f9cf1c",
          "2a5c7fa4-b150-44dd-866c-ca0ff24e5bea",
          "518eb271-1188-49ea-95d1-b34a98e2ff69",
          "bb8303ce-37bb-4b5c-b356-d60b5fb9e04e",
          "020e4d6b-8c5c-421c-b02a-d3c2c5cc4925",
          "34e585d8-50d5-4718-b675-1cd8ad0a5d61",
          "8999e9bf-d903-4c53-88b5-540730afb26d",
          "2b698c33-6707-4510-89b6-fae5b1a00a2c",
          "c7124579-8e27-45c3-a722-99afed665db4",
          "c56e7729-a992-4cb4-bf8b-255f071a952f",
          "f6c07d9f-84ed-4330-9bf8-c8f4905b4cbc",
          "f652e679-fd8f-48d4-ae65-decd629ae960",
          "26c9573c-010f-4135-aaf3-0d727efc0ea1",
          "75fd9559-4546-45ad-9938-0df68fc5f3e5",
          "0c3a394d-0f6a-4a15-a9be-68372641a7df",
          "f2f5dfa2-4d04-472d-8abe-c467fc6494ae",
          "0e92ac06-1226-46f2-a92b-c74e47dd3840",
          "1dcbe256-6ad7-4983-9abe-56e0a264601b",
          "98bb25ff-d7a0-4071-99a8-32e3ad253dfd",
          "7aeef3d6-fe15-4b87-911f-8127592a28dc",
          "19e58a79-8c0f-45c0-acfd-a1127fd33528",
          "daf51ae7-8ebe-464e-8072-63b82fd57e39",
          "039be77f-5810-4524-a096-8b7489808d1b",
          "f89ea93c-7f87-48d5-b18f-b0ddb1f39f6e",
          "71bb7e41-e957-492a-8627-44e4a03ccddf",
          "2925151e-1a33-4573-9213-efca56c8f65e",
          "f602a9d6-0cc4-4d5a-9e10-215ae6930c3a",
          "f4a6e687-c354-4b24-ac67-3cfef2b2fd4c",
          "b6a1d4e8-a0d7-4435-a1ea-625491819d71",
          "7954a4a5-fcfb-4c16-bd29-7585e80aa1d2",
          "48e28fef-fbac-4b60-ac71-cea7575c03c7",
          "941c0d8f-8446-4a66-89d6-a581a8abdcb2",
          "e9c4a60a-a64c-4022-99c2-203ef654aa44",
          "aafaea11-570b-4a1c-b174-dae2ce01913b",
          "a1eeb195-5ab3-4ab9-ba8f-a47b58200dbf",
          "030d5926-93ce-420f-844b-c241970c9645",
          "ac9d9dee-c839-47b9-a1b8-f21029ce511f",
          "232de5fc-b855-4e86-a9a3-9e5e8e743897",
          "31d24c9c-e786-4789-a38f-900dcfe9423a",
          "dcc749ed-33ad-4da1-acfb-c812ebef91dd",
          "9e15460d-a4aa-493c-8732-c6057a32e740",
          "bb592fb4-0aba-4235-837e-c93579a61356",
          "e77bc69b-b4c9-4592-928c-6ebd9dd5c79e",
          "c60a2a16-dffc-48e7-b702-afa3f8b24935",
          "68ee102e-78bf-45aa-a781-81f52e64c0e4",
          "e68d82a0-2067-478a-810b-dd292892e0be",
          "b8c0511c-7766-464a-b466-e24256586f92",
          "0bc0402f-d79d-442e-91a0-26b97ca25c27",
          "8744ee56-1101-45b0-b106-754ed2df9dc5",
          "235083a6-493f-4e50-929d-eddb9ad90c0e",
          "eb3ff889-7c76-4674-8e75-e35e2e78ca03",
          "151fae52-4521-4969-af33-9ef3151a7112",
          "70812687-f11b-42aa-a7f6-bf3a2c2930a3",
          "587cdde9-077b-4e83-ab54-4123c6356957",
          "c2584e90-19ba-4637-b3e9-23075c20c0a1",
          "8c0cc500-38ba-4da7-b5b1-ccf799ed73cf",
          "bae2f859-5913-4ee1-9afa-1df2e4da54fe",
          "e1317b01-af57-4b01-82da-0305e061a4cb",
          "01b74e5e-eca3-448b-b082-c669eb497597",
          "e3904e60-f07c-4dd5-b73d-30c6644c7653",
          "462281a6-0e66-4404-a001-09661b5eb6d6",
          "20bbba49-92ea-41ca-9f27-4bd62f22fb06",
          "b0abad13-a7a7-41ed-9372-711d8da50804",
          "968eba4b-3530-4975-a6ea-cd940f653cc8",
          "e6c7dbf4-ad2a-4124-a298-237023ebc438",
          "25b2d27f-ae13-4126-a1df-81663e004b9f",
          "bfcc2722-bfd2-425f-8d0e-276d59d4bee1",
          "ce6a6f18-ae0c-43af-954b-a872158cef80",
          "0ccfe44b-468c-4577-b25a-4f39d3c24ce4",
          "d6ccddbe-ef64-498b-8104-72ec615d227b",
          "6047ddcc-f211-4d8d-b781-dd46ccd8074c",
          "591c9d93-13a0-4a7f-900e-f801b3c6a453",
          "df36d481-8008-4719-a8cd-8de2f81beb37",
          "c7c24f66-2d07-4b2b-bf0d-14229e7c2011",
          "839f9a58-b05f-4bba-a673-ef42f516d711",
          "2300b41f-f3c2-44cf-a349-8d83f2840da8",
          "4674ee28-f87e-45fd-90c2-5b3454497317",
          "eaf02093-4fcd-479f-8246-0276fe6dfb92",
          "e041a2db-af5f-4fc8-ab88-7ddeaf3ad01a",
          "bf89aab0-7e59-43c4-9eef-56a7d55bff0d",
          "7308a9ad-9bba-4651-aeff-a9fe01a1f977",
          "33d82c3c-f00f-4c4a-849e-8c133d3dfd07",
          "be9f3ba6-5cb4-4620-8686-df0527ebb7f7",
          "e5b8bcce-14e2-4f85-bc34-4e8e2464c618",
          "18dd7749-b1b0-44c3-9a01-3392e1f736c6",
          "23e44cc5-9622-4759-bce5-7df6a9f945e7",
          "126c2615-d9fb-436f-805c-a64d7d2ccbb2",
          "6f9ec815-0171-4148-bc95-39058fa68dc2",
          "ea109ff8-181e-4666-8919-39519588f9f0",
          "9b6b7e4d-b01c-43a9-92f6-f0d0e1fb5e5d",
          "2b229438-5056-400b-abe3-184e31e8a08c",
          "d66724a3-b980-433c-85d3-06361b684e9c",
          "ee3aad84-b527-4d87-994f-b71db52abb5d",
          "56904d38-7fe2-4b7b-a8aa-318b6c6ce57f",
          "d6622f8a-f2d0-4f12-976f-6b053d399daa",
          "bf469340-b790-46ca-a457-ee3cc978e42c",
          "074cfeba-d547-4b81-ab0e-c09f98dbc700",
          "9cb54252-b646-4bc5-9605-d24522a0a099",
          "964eced5-bbd8-419c-8cdb-df6e1b88b43f",
          "7ef14c65-2dbc-4f3a-8b8a-6064a02621a8",
          "61f5e416-a9b5-497d-ac6b-2fe1b6b4e8e8",
          "52ed0df6-b593-460f-8c4c-0e02db5b25fb",
          "b5453f28-9c36-4302-b853-429a28aa797e",
          "d0d14fd7-08d5-4dc0-b77f-6bf4e62ac374",
          "c8fc620b-3e04-4268-a7f7-057d998afb38",
          "8cf16461-4f1c-4661-b865-de7211c9551d",
          "0458ffd3-267e-4580-9bf8-9981828d2d4a",
          "ad0f8122-0682-49d5-807d-cb63acc827aa",
          "45b107ab-1104-44da-ae63-a6c35b5392ed"
        ]
      },
      "archived": false,
      "compressedInto": null,
      "createdAt": "2026-07-15T13:58:44.962Z",
      "updatedAt": "2026-07-15T13:58:44.962Z"
    },
    "archivedIds": [
      "db534c8f-e810-4169-a46f-575aa9969c7e",
      "59d8e696-dd45-4d30-b389-a4c04b74f35f",
      "36052f86-d991-420c-aa01-6b5a7942198e",
      "870139d7-db7c-4141-aa3a-b956b767ebc6",
      "c22efa64-1fd2-4956-9324-8a423532e743",
      "f6aaa42a-6194-4d31-8860-dc31832ce4be",
      "8b66a876-adc9-40ad-8002-02f92ab77f94",
      "92673de4-d9ac-45c7-95ec-4a3d7c283ffd",
      "e9ae72dc-2df2-461f-9935-33dc8c6c5caf",
      "9bb40472-3326-4ec9-aa30-ecec895da706",
      "1615c69c-293b-44d8-9b87-8dfb84aaea2c",
      "80136048-7b36-4792-86c6-c01d9c0eed6b",
      "ec323086-2cbc-4216-9d0a-f1602ea64b46",
      "e5c395fc-c889-474e-9c6f-f7a79be96e49",
      "d1a62168-5221-400d-9a90-1aaf33eaff08",
      "8d1525eb-4663-4730-86cf-4db6db873436",
      "6ad2af9f-06d4-454a-bc6f-f18f54276c50",
      "16337353-04bc-45f3-b12b-91d739bc0d33",
      "2b6f7ddf-0323-4976-bac3-0be4d79b7ef9",
      "14ee73fe-ba0c-41f7-8187-2c0f9f7f1c1f",
      "ce0b1fba-bb2c-4aed-9602-996ac6f3728f",
      "9091f221-93b1-4dbc-bb1d-83fad42a59f1",
      "349a6afa-f4cf-44ad-aad9-7dcae03d0ebc",
      "e3330ae5-bfe5-44b8-b680-86742648dadd",
      "0f0ba490-9ad6-4c6e-bcc3-08538601ad84",
      "521cb0a4-b3f0-4d6b-9f11-a1c4bafe11d1",
      "0bbb5026-5835-40b9-835f-49a2a10b9fd2",
      "2b6f6004-421b-49c3-a2fe-b00814d2e025",
      "222ec056-ceb5-4029-9010-4a8ae2b4f291",
      "26631c52-714b-40d4-860c-eb1e46b5ad0b",
      "1f382ba5-4953-401d-ab15-d55b0a8f87f5",
      "bb6b2249-2f72-44a6-850a-6026fcd62e32",
      "a1ec6b54-edcd-4047-8dbf-bfe9d786105e",
      "ed68248b-8efa-452f-bc31-a396463cd7ce",
      "f3384ef1-cd12-4c15-9d49-a6b3d17523bf",
      "1d0f32a2-12d1-4cec-9d70-6d67f94619b4",
      "6088371a-78bc-402d-907f-59ba5d19aab9",
      "585c44e2-ead0-4589-8459-07cf6e035d9f",
      "8e27fcc7-ecb2-4c60-9f79-4ccdc318c3f5",
      "558e481c-fa43-4660-a1fc-56854e617441",
      "da7666f8-16f2-4a28-8a32-cd47166e5362",
      "f8181787-e08c-424e-91ce-f702ee73311e",
      "4c029412-5566-4a46-ad9c-2e3d87c56121",
      "8eb50e46-0006-485b-b3d4-55b26ad18fa7",
      "2954810a-4ad2-4f02-a0dd-86431b564fe6",
      "c650f0aa-ced2-47c6-97e8-4463c970f2bc",
      "715c9558-315d-487c-a9b6-7ee48aeba674",
      "8055961b-7b81-4b41-ae27-43bfa770dca7",
      "0336d393-2d3a-4331-bfa5-624511888871",
      "fa44d610-a556-4a67-8e2b-202dafc4d991",
      "4324a113-054f-4159-bbba-0cfc76ce7d13",
      "0d3712ec-caaf-4e3c-91eb-0f32c8715d62",
      "78064616-0ea1-40b3-874b-7cd800de82b3",
      "3da6bbe4-f4a6-4a4b-be94-774dc6f03a2e",
      "bd153005-6ed6-4713-90f3-4a069d347e01",
      "5610a48c-1afa-4225-8b5c-7c676dd110f0",
      "bd14c393-ea0e-43c5-94b9-2a7472e01c1a",
      "8bb17e45-dd6b-4581-8711-d004acadd3b1",
      "13bbdcab-9165-4042-ab05-1315175acadb",
      "f9f07d6f-7a9c-41ef-87ce-032b77ac7cb7",
      "622d07ab-3415-4978-97d8-a55e8feb1eef",
      "4250bb44-df08-4904-a601-3c643230626a",
      "a224cccd-27c3-4902-9c58-7127501164ed",
      "4905c89c-0710-4b20-87e2-f4fff07d92c9",
      "b502ef59-aa43-4de8-864b-c6c767c19cc0",
      "b345734a-d29f-49a7-8a32-d8fda3350f00",
      "aa695aed-3e56-4573-a458-83cb699ff186",
      "6777a8a7-3ebb-4c05-a10f-5cfa4c4a4643",
      "adf734d9-a876-4b1f-9e9e-5d81ff56842f",
      "11d1badc-752e-4c1e-a7c6-abeec97a9f44",
      "732affe8-a094-4c11-95a7-cdf332c9a446",
      "c28ce834-dcb8-4a2b-8430-c491623044ed",
      "a7d2e273-c91f-4bdd-aa9b-2d35adb3ad9a",
      "c4c1ecd2-d0b2-471c-8341-d15cb1174da2",
      "32bdaed4-4890-4fd7-ad98-08557f871fcb",
      "1c69df46-0ccb-4c3c-b084-af8a0e640b2c",
      "9ce9bcca-15df-4b03-8999-9da6f65d7743",
      "0db0dd48-3724-429a-8db3-3322cd14454f",
      "b43ddbf3-fc49-4313-acc3-bbad37169f91",
      "f735546b-5acc-40c6-92ce-e8857a1f0c5c",
      "fab5fc76-0c1f-474f-8890-89a258f0b6f9",
      "649c8c3b-b5ca-4565-a8e7-4b9af146f4b3",
      "4ad23683-355e-4ffe-95c4-b346f632a4bc",
      "8896b3ce-2460-49fe-a135-2e142cb018e9",
      "23622204-d04d-4b35-b4c9-cbdb0c0e1fd0",
      "14de10e3-6dc2-4502-b876-b9522725b287",
      "295882da-7e63-4d77-b41c-7276eb646496",
      "47a43555-d419-4f1b-b5f0-9cad079d781f",
      "93ed0dd7-7b28-434b-9ff5-e1f294fb306d",
      "480ed390-2419-41e0-9db2-934127c1cf84",
      "c456962e-7f6c-4d9c-84fb-7c5dd9c64f4d",
      "2629dadb-643e-44ec-99ea-59e642f9cf1c",
      "2a5c7fa4-b150-44dd-866c-ca0ff24e5bea",
      "518eb271-1188-49ea-95d1-b34a98e2ff69",
      "bb8303ce-37bb-4b5c-b356-d60b5fb9e04e",
      "020e4d6b-8c5c-421c-b02a-d3c2c5cc4925",
      "34e585d8-50d5-4718-b675-1cd8ad0a5d61",
      "8999e9bf-d903-4c53-88b5-540730afb26d",
      "2b698c33-6707-4510-89b6-fae5b1a00a2c",
      "c7124579-8e27-45c3-a722-99afed665db4",
      "c56e7729-a992-4cb4-bf8b-255f071a952f",
      "f6c07d9f-84ed-4330-9bf8-c8f4905b4cbc",
      "f652e679-fd8f-48d4-ae65-decd629ae960",
      "26c9573c-010f-4135-aaf3-0d727efc0ea1",
      "75fd9559-4546-45ad-9938-0df68fc5f3e5",
      "0c3a394d-0f6a-4a15-a9be-68372641a7df",
      "f2f5dfa2-4d04-472d-8abe-c467fc6494ae",
      "0e92ac06-1226-46f2-a92b-c74e47dd3840",
      "1dcbe256-6ad7-4983-9abe-56e0a264601b",
      "98bb25ff-d7a0-4071-99a8-32e3ad253dfd",
      "7aeef3d6-fe15-4b87-911f-8127592a28dc",
      "19e58a79-8c0f-45c0-acfd-a1127fd33528",
      "daf51ae7-8ebe-464e-8072-63b82fd57e39",
      "039be77f-5810-4524-a096-8b7489808d1b",
      "f89ea93c-7f87-48d5-b18f-b0ddb1f39f6e",
      "71bb7e41-e957-492a-8627-44e4a03ccddf",
      "2925151e-1a33-4573-9213-efca56c8f65e",
      "f602a9d6-0cc4-4d5a-9e10-215ae6930c3a",
      "f4a6e687-c354-4b24-ac67-3cfef2b2fd4c",
      "b6a1d4e8-a0d7-4435-a1ea-625491819d71",
      "7954a4a5-fcfb-4c16-bd29-7585e80aa1d2",
      "48e28fef-fbac-4b60-ac71-cea7575c03c7",
      "941c0d8f-8446-4a66-89d6-a581a8abdcb2",
      "e9c4a60a-a64c-4022-99c2-203ef654aa44",
      "aafaea11-570b-4a1c-b174-dae2ce01913b",
      "a1eeb195-5ab3-4ab9-ba8f-a47b58200dbf",
      "030d5926-93ce-420f-844b-c241970c9645",
      "ac9d9dee-c839-47b9-a1b8-f21029ce511f",
      "232de5fc-b855-4e86-a9a3-9e5e8e743897",
      "31d24c9c-e786-4789-a38f-900dcfe9423a",
      "dcc749ed-33ad-4da1-acfb-c812ebef91dd",
      "9e15460d-a4aa-493c-8732-c6057a32e740",
      "bb592fb4-0aba-4235-837e-c93579a61356",
      "e77bc69b-b4c9-4592-928c-6ebd9dd5c79e",
      "c60a2a16-dffc-48e7-b702-afa3f8b24935",
      "68ee102e-78bf-45aa-a781-81f52e64c0e4",
      "e68d82a0-2067-478a-810b-dd292892e0be",
      "b8c0511c-7766-464a-b466-e24256586f92",
      "0bc0402f-d79d-442e-91a0-26b97ca25c27",
      "8744ee56-1101-45b0-b106-754ed2df9dc5",
      "235083a6-493f-4e50-929d-eddb9ad90c0e",
      "eb3ff889-7c76-4674-8e75-e35e2e78ca03",
      "151fae52-4521-4969-af33-9ef3151a7112",
      "70812687-f11b-42aa-a7f6-bf3a2c2930a3",
      "587cdde9-077b-4e83-ab54-4123c6356957",
      "c2584e90-19ba-4637-b3e9-23075c20c0a1",
      "8c0cc500-38ba-4da7-b5b1-ccf799ed73cf",
      "bae2f859-5913-4ee1-9afa-1df2e4da54fe",
      "e1317b01-af57-4b01-82da-0305e061a4cb",
      "01b74e5e-eca3-448b-b082-c669eb497597",
      "e3904e60-f07c-4dd5-b73d-30c6644c7653",
      "462281a6-0e66-4404-a001-09661b5eb6d6",
      "20bbba49-92ea-41ca-9f27-4bd62f22fb06",
      "b0abad13-a7a7-41ed-9372-711d8da50804",
      "968eba4b-3530-4975-a6ea-cd940f653cc8",
      "e6c7dbf4-ad2a-4124-a298-237023ebc438",
      "25b2d27f-ae13-4126-a1df-81663e004b9f",
      "bfcc2722-bfd2-425f-8d0e-276d59d4bee1",
      "ce6a6f18-ae0c-43af-954b-a872158cef80",
      "0ccfe44b-468c-4577-b25a-4f39d3c24ce4",
      "d6ccddbe-ef64-498b-8104-72ec615d227b",
      "6047ddcc-f211-4d8d-b781-dd46ccd8074c",
      "591c9d93-13a0-4a7f-900e-f801b3c6a453",
      "df36d481-8008-4719-a8cd-8de2f81beb37",
      "c7c24f66-2d07-4b2b-bf0d-14229e7c2011",
      "839f9a58-b05f-4bba-a673-ef42f516d711",
      "2300b41f-f3c2-44cf-a349-8d83f2840da8",
      "4674ee28-f87e-45fd-90c2-5b3454497317",
      "eaf02093-4fcd-479f-8246-0276fe6dfb92",
      "e041a2db-af5f-4fc8-ab88-7ddeaf3ad01a",
      "bf89aab0-7e59-43c4-9eef-56a7d55bff0d",
      "7308a9ad-9bba-4651-aeff-a9fe01a1f977",
      "33d82c3c-f00f-4c4a-849e-8c133d3dfd07",
      "be9f3ba6-5cb4-4620-8686-df0527ebb7f7",
      "e5b8bcce-14e2-4f85-bc34-4e8e2464c618",
      "18dd7749-b1b0-44c3-9a01-3392e1f736c6",
      "23e44cc5-9622-4759-bce5-7df6a9f945e7",
      "126c2615-d9fb-436f-805c-a64d7d2ccbb2",
      "6f9ec815-0171-4148-bc95-39058fa68dc2",
      "ea109ff8-181e-4666-8919-39519588f9f0",
      "9b6b7e4d-b01c-43a9-92f6-f0d0e1fb5e5d",
      "2b229438-5056-400b-abe3-184e31e8a08c",
      "d66724a3-b980-433c-85d3-06361b684e9c",
      "ee3aad84-b527-4d87-994f-b71db52abb5d",
      "56904d38-7fe2-4b7b-a8aa-318b6c6ce57f",
      "d6622f8a-f2d0-4f12-976f-6b053d399daa",
      "bf469340-b790-46ca-a457-ee3cc978e42c",
      "074cfeba-d547-4b81-ab0e-c09f98dbc700",
      "9cb54252-b646-4bc5-9605-d24522a0a099",
      "964eced5-bbd8-419c-8cdb-df6e1b88b43f",
      "7ef14c65-2dbc-4f3a-8b8a-6064a02621a8",
      "61f5e416-a9b5-497d-ac6b-2fe1b6b4e8e8",
      "52ed0df6-b593-460f-8c4c-0e02db5b25fb",
      "b5453f28-9c36-4302-b853-429a28aa797e",
      "d0d14fd7-08d5-4dc0-b77f-6bf4e62ac374",
      "c8fc620b-3e04-4268-a7f7-057d998afb38",
      "8cf16461-4f1c-4661-b865-de7211c9551d",
      "0458ffd3-267e-4580-9bf8-9981828d2d4a",
      "ad0f8122-0682-49d5-807d-cb63acc827aa",
      "45b107ab-1104-44da-ae63-a6c35b5392ed"
    ]
  },
  "note": "Percent is active memory-count reduction (archived rows retained for lineage). Disk reclaim requires VACUUM / dead-tuple cleanup."
}
```

</details>


#### Compression methodology

- Backend: **sqlite**
- Metric: **active-set reduction** = `(active_before − active_after) / active_before`.
- Archived sources remain in storage for history/lineage; `totalMemories` may rise by 1 (summary row).
- Live mode caps `limit` at 40 to control LLM cost.

### sqlite · Concurrency Baseline

Fixed N concurrent Wolbarg.remember() writers on one client (AsyncMutex queueing).

_Section duration: 458.03 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Concurrency | 2 writers | sqlite | 1.70k ops/sec |
| Concurrency | 4 writers | sqlite | 1.60k ops/sec |
| Concurrency | 8 writers | sqlite | 1.58k ops/sec |
| Concurrency | 16 writers | sqlite | 907.05 ops/sec |

#### Metrics

##### Concurrency — 2 writers (sqlite)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 1.70k ops/sec |
| failures | 0 |
| successes | 30 |
| avgLatencyMs | 1.15 ms |
| p95Ms | 1.31 ms |
| p99Ms | 1.37 ms |
| writers | 2 |
| storedMemories | 30 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 4 writers (sqlite)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 1.60k ops/sec |
| failures | 0 |
| successes | 60 |
| avgLatencyMs | 2.47 ms |
| p95Ms | 4.35 ms |
| p99Ms | 4.83 ms |
| writers | 4 |
| storedMemories | 60 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 8 writers (sqlite)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 1.58k ops/sec |
| failures | 0 |
| successes | 120 |
| avgLatencyMs | 4.98 ms |
| p95Ms | 10.07 ms |
| p99Ms | 10.47 ms |
| writers | 8 |
| storedMemories | 120 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 16 writers (sqlite)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 907.05 ops/sec |
| failures | 0 |
| successes | 240 |
| avgLatencyMs | 17.15 ms |
| p95Ms | 84.68 ms |
| p99Ms | 140.72 ms |
| writers | 16 |
| storedMemories | 240 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>


#### Concurrency baseline methodology

- Backend: **sqlite** · levels 2, 4, 8, 16 × 15 writes.
- For push-to-failure ramps see Breaking Concurrency section.

### sqlite · Memory Usage Benchmark

Heap/RSS snapshots before init, after inserts, after recall, and after close.

_Section duration: 708.75 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Memory Usage | baseline (pre-init) | sqlite | heap 28.36 MB / rss 114.89 MB |
| Memory Usage | after init | sqlite | heap 28.42 MB / rss 114.93 MB |
| Memory Usage | after 100 inserts | sqlite | heap 17.16 MB / rss 114.19 MB |
| Memory Usage | after 1000 inserts | sqlite | heap 26.82 MB / rss 105.88 MB |
| Memory Usage | after recall | sqlite | heap 16.86 MB / rss 111.35 MB |
| Memory Usage | after close | sqlite | heap 16.87 MB / rss 111.36 MB |

#### Metrics

##### Memory Usage — baseline (pre-init) (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 28.36 MB |
| rss | 114.89 MB |
| heapTotal | 48.11 MB |
| external | 11.91 MB |

##### Memory Usage — after init (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 28.42 MB |
| rss | 114.93 MB |
| heapTotal | 48.11 MB |
| external | 12.67 MB |

##### Memory Usage — after 100 inserts (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 17.16 MB |
| rss | 114.19 MB |
| heapTotal | 48.11 MB |
| external | 9.99 MB |

##### Memory Usage — after 1000 inserts (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 26.82 MB |
| rss | 105.88 MB |
| heapTotal | 48.11 MB |
| external | 11.19 MB |

##### Memory Usage — after recall (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 16.86 MB |
| rss | 111.35 MB |
| heapTotal | 48.11 MB |
| external | 15.28 MB |

##### Memory Usage — after close (sqlite)

| Metric | Value |
| --- | --- |
| heapUsed | 16.87 MB |
| rss | 111.36 MB |
| heapTotal | 48.11 MB |
| external | 15.28 MB |


#### Memory methodology

- Backend: **sqlite** · process.memoryUsage() only (not DB RSS on remote Postgres).

### sqlite · Database Size Benchmark

Measures storage growth after inserting 100 / 1k / 10k / 100k memories.

_Section duration: 789.41 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Database Size | 100 | sqlite | 376.00 KB |
| Database Size | 1000 | sqlite | 2.98 MB |

#### Metrics

##### Database Size — 100 (sqlite)

| Metric | Value |
| --- | --- |
| bytes | 376.00 KB |
| bytesPerMemory | 3.76 KB |
| statsDatabaseSizeBytes | 408.00 KB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "corpus-100",
  "includesWalShm": true
}
```

</details>

##### Database Size — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| bytes | 2.98 MB |
| bytesPerMemory | 3.05 KB |
| statsDatabaseSizeBytes | 3.01 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "corpus-1000",
  "includesWalShm": true
}
```

</details>


#### Database size methodology

- Backend: **sqlite**
- Size includes main `.db` plus `-wal` / `-shm` if present.

### sqlite · Search Benchmark

Populates shared corpus, then benchmarks Wolbarg.recall() (avg / p95 / p99).

_Section duration: 849.17 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Search | 100 | sqlite | 893.1 µs |
| Search | 1000 | sqlite | 2.02 ms |

#### Metrics

##### Search — 100 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 893.1 µs |
| p50Ms | 689.6 µs |
| p95Ms | 1.70 ms |
| p99Ms | 1.85 ms |
| tinybenchHz | 3186.50 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "iterations": 8,
  "queries": [
    "Which invoices were paid recently?",
    "Meetings scheduled with OpenAI",
    "PostgreSQL adapter fixes",
    "LangChain integration research",
    "Customer refund requests",
    "Production deployment plans"
  ],
  "samplesMs": [
    0.5376999999998588,
    0.592000000000553,
    0.5945999999994456,
    0.6385999999993146,
    0.7406000000000859,
    0.8016999999999825,
    1.35320000000047,
    1.8866000000007261
  ]
}
```

</details>

##### Search — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.02 ms |
| p50Ms | 1.34 ms |
| p95Ms | 5.06 ms |
| p99Ms | 6.52 ms |
| tinybenchHz | 846.10 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "iterations": 8,
  "queries": [
    "Which invoices were paid recently?",
    "Meetings scheduled with OpenAI",
    "PostgreSQL adapter fixes",
    "LangChain integration research",
    "Customer refund requests",
    "Production deployment plans"
  ],
  "samplesMs": [
    1.1548000000002503,
    1.194300000000112,
    1.2107999999998356,
    1.3344000000006417,
    1.3524999999999636,
    1.3545999999996639,
    1.6642000000001644,
    6.885000000000218
  ]
}
```

</details>


#### Search methodology

- Backend: **sqlite** · semantic recall topK=5

### sqlite · Retrieval Benchmark

Benchmarks top-5 / top-10 / top-20 recall against shared corpora.

_Section duration: 804.67 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Retrieval top-5 | 1000 | sqlite | 2.16 ms |
| Retrieval top-10 | 1000 | sqlite | 1.56 ms |
| Retrieval top-20 | 1000 | sqlite | 1.84 ms |

#### Metrics

##### Retrieval top-5 — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.16 ms |
| p95Ms | 5.11 ms |
| p99Ms | 5.92 ms |
| tinybenchHz | 858.78 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 5,
  "iterations": 6,
  "samplesMs": [
    1.0862999999999374,
    1.1253999999998996,
    1.2346999999999753,
    1.3497999999999593,
    2.0666000000001077,
    6.119699999999284
  ]
}
```

</details>

##### Retrieval top-10 — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 1.56 ms |
| p95Ms | 2.47 ms |
| p99Ms | 2.68 ms |
| tinybenchHz | 798.54 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 10,
  "iterations": 6,
  "samplesMs": [
    1.1728000000002794,
    1.2249999999994543,
    1.268500000000131,
    1.2776000000003478,
    1.6882999999997992,
    2.733100000000377
  ]
}
```

</details>

##### Retrieval top-20 — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 1.84 ms |
| p95Ms | 2.41 ms |
| p99Ms | 2.53 ms |
| tinybenchHz | 578.07 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 20,
  "iterations": 6,
  "samplesMs": [
    1.5185999999994237,
    1.6177999999999884,
    1.6784999999999854,
    1.707499999999527,
    1.9323000000003958,
    2.5657000000001062
  ]
}
```

</details>


#### Retrieval methodology

- Backend: **sqlite**

### sqlite · Insert Benchmark

Measures Wolbarg.remember() throughput and latency (embed → persist → index).

_Section duration: 1.18 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Insert | 100 | sqlite | 1.85k ops/sec |
| Insert | 1000 | sqlite | 1.72k ops/sec |

#### Metrics

##### Insert — 100 (sqlite)

| Metric | Value |
| --- | --- |
| totalTimeMs | 54.18 ms |
| opsPerSec | 1.85k ops/sec |
| avgLatencyMs | 541.8 µs |
| embedAvgMs | 114.0 µs |
| storeAvgMs | 413.5 µs |
| p95Ms | 977.8 µs |
| p99Ms | 1.55 ms |
| rss | 116240384 |
| cpuUserMs | 47.00 ms |
| tinybenchHz | 2.41k ops/sec |
| memoriesStored | 554 |
| storageBytes | 1773568 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "insert-100",
  "stageSummary": {
    "embedAvgMs": 0.11400000000000006,
    "storeAvgMs": 0.4135,
    "totalAvgMs": 0.5395,
    "embedShare": 0.21130676552363312,
    "storeShare": 0.7664504170528267,
    "hostCpus": 8
  },
  "profile": {
    "cpuUserMs": 47,
    "cpuSystemMs": 16,
    "heapUsed": 34597424,
    "rss": 116240384
  },
  "note": "embed vs store split from WOLBARG_PROFILE samples (n≤20)"
}
```

</details>

##### Insert — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| totalTimeMs | 581.96 ms |
| opsPerSec | 1.72k ops/sec |
| avgLatencyMs | 582.0 µs |
| embedAvgMs | 79.0 µs |
| storeAvgMs | 386.5 µs |
| p95Ms | 724.2 µs |
| p99Ms | 820.7 µs |
| rss | 117895168 |
| cpuUserMs | 188.00 ms |
| tinybenchHz | 2.40k ops/sec |
| memoriesStored | 1396 |
| storageBytes | 4345856 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "insert-1000",
  "stageSummary": {
    "embedAvgMs": 0.07900000000000003,
    "storeAvgMs": 0.3865,
    "totalAvgMs": 0.46849999999999997,
    "embedShare": 0.168623265741729,
    "storeShare": 0.8249733191035219,
    "hostCpus": 8
  },
  "profile": {
    "cpuUserMs": 188,
    "cpuSystemMs": 328,
    "heapUsed": 20899240,
    "rss": 117895168
  },
  "note": "embed vs store split from WOLBARG_PROFILE samples (n≤20)"
}
```

</details>


#### Insert methodology

- Backend: **sqlite**
- Stage timings: embedding generation vs storage write (mutex + SQL + index).
- Identical mock embeddings and datasets across backends.

### sqlite · Hybrid Search Benchmark

Compares semantic-only vs hybrid BM25 fusion latency on shared corpora.

_Section duration: 56.83 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Hybrid · semantic | 1000 | sqlite | 2.30 ms |
| Hybrid · hybrid-default | 1000 | sqlite | 2.81 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | sqlite | 2.22 ms |

#### Metrics

##### Hybrid · semantic — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.30 ms |
| p95Ms | 5.95 ms |
| p99Ms | 7.07 ms |

##### Hybrid · hybrid-default — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.81 ms |
| p95Ms | 4.09 ms |
| p99Ms | 4.17 ms |

##### Hybrid · hybrid-0.5/0.5 — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.22 ms |
| p95Ms | 2.74 ms |
| p99Ms | 2.82 ms |


#### Hybrid methodology

- Backend: **sqlite** · BM25 keyword index warm from shared corpus.

### sqlite · Metadata Filter Benchmark

Recall latency with agent filters and meta.eq / and / or / gte selectivity.

_Section duration: 638.85 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Filter · unfiltered | 1000 | sqlite | 2.26 ms |
| Filter · agent-filter | 1000 | sqlite | 1.41 ms |
| Filter · meta.eq | 1000 | sqlite | 2.60 ms |
| Filter · meta.and/or | 1000 | sqlite | 1.53 ms |

#### Metrics

##### Filter · unfiltered — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.26 ms |
| p95Ms | 5.59 ms |
| lastHitCount | 10 |

##### Filter · agent-filter — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 1.41 ms |
| p95Ms | 1.63 ms |
| lastHitCount | 0 |

##### Filter · meta.eq — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.60 ms |
| p95Ms | 5.15 ms |
| lastHitCount | 10 |

##### Filter · meta.and/or — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 1.53 ms |
| p95Ms | 1.69 ms |
| lastHitCount | 2 |


#### Filter methodology

- Backend: **sqlite** · corpus 1000

### sqlite · MMR / Rerank Benchmark

Latency impact of MMR on/off. Rerank flag exercises graceful no-op without a configured reranker in mock mode.

_Section duration: 86.29 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| MMR/Rerank · baseline | 1000 | sqlite | 5.10 ms |
| MMR/Rerank · mmr | 1000 | sqlite | 2.33 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | sqlite | 2.78 ms |
| MMR/Rerank · rerank-flag | 1000 | sqlite | 1.66 ms |

#### Metrics

##### MMR/Rerank · baseline — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 5.10 ms |
| p95Ms | 12.06 ms |

##### MMR/Rerank · mmr — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.33 ms |
| p95Ms | 4.11 ms |

##### MMR/Rerank · mmr-lambda-0.7 — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.78 ms |
| p95Ms | 4.91 ms |

##### MMR/Rerank · rerank-flag — 1000 (sqlite)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 1.66 ms |
| p95Ms | 2.72 ms |


#### MMR / rerank methodology

- Backend: **sqlite**
- Mock mode has no reranker provider — `rerank: true` measures graceful skip overhead only.

### sqlite · Ingest Benchmark

Ingest throughput for markdown/text/json/PDF/DOCX fixtures (when present).

_Section duration: 574.82 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Ingest · inline-markdown | 3 chunks | sqlite | 3.77 ms |
| Ingest · inline-json | 5 chunks | sqlite | 9.73 ms |
| Ingest · sample.md | 1 chunks | sqlite | 2.67 ms |
| Ingest · sample.txt | 1 chunks | sqlite | 1.48 ms |
| Ingest · sample.pdf | 1 chunks | sqlite | 230.35 ms |
| Ingest · sample.docx | 1 chunks | sqlite | 218.55 ms |

#### Metrics

##### Ingest · inline-markdown — 3 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 3.77 ms |
| chunkCount | 3 |
| chunksPerSec | 795.44 ops/sec |
| heapDelta | 310744 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "a8ac228a-988b-40e0-b99b-94d88a484f65",
        "organization": "demo-org-sqlite-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "# Spec\n\nWolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embedd"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 3,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.601Z",
        "updatedAt": "2026-07-15T13:58:50.601Z"
      },
      {
        "id": "fe893260-9e62-427e-85b9-17ec3950e0db",
        "organization": "demo-org-sqlite-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "ries with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memori"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 1,
          "chunkCount": 3,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.601Z",
        "updatedAt": "2026-07-15T13:58:50.601Z"
      },
      {
        "id": "35b68c4e-b687-45a4-8061-77ca4c991283",
        "organization": "demo-org-sqlite-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "rc stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 2,
          "chunkCount": 3,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.601Z",
        "updatedAt": "2026-07-15T13:58:50.601Z"
      }
    ],
    "extractedChars": 1728,
    "chunkCount": 3,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · inline-json — 5 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 9.73 ms |
| chunkCount | 5 |
| chunksPerSec | 513.93 ops/sec |
| heapDelta | -19325288 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "8f479b9b-231a-406f-b99a-ca999a5bb4bb",
        "organization": "demo-org-sqlite-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "{\n  \"title\": \"bench\",\n  \"items\": [\n    {\n      \"id\": 0,\n      \"note\": \"fact 0 about widgets\"\n    },\n    {\n      \"id\": 1,\n      \"note\": \"fact 1 about widgets\"\n    },\n    {\n      \"id\": 2,\n      \"note\": \"fact 2 about widgets\"\n    },\n    {\n      \"id\": 3,\n      \"note\": \"fact 3 about widgets\"\n    },\n    {\n      \"id\": 4,\n      \"note\": \"fact 4 about widgets\"\n    },\n    {\n      \"id\": 5,\n      \"note\": \"fact 5 about widgets\"\n    },\n    {\n      \"id\": 6,\n      \"note\": \"fact 6 about widgets\"\n    },\n    {\n      \"id\": 7,\n      \"note\": \"fact 7 about widgets\"\n    },\n    {\n      \"id\": 8,\n      \"note\": \"fact 8 about widgets\"\n    },\n    {\n      \"id\": 9,\n      \"note\": \"fact 9 about widgets\"\n    },\n    {\n      \"id\": 10,\n      \"note\": \"fact 10 about widgets\"\n    },\n    {\n      \"id\": 11,\n      \"note\": \"fact 11 abo"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 5,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.628Z",
        "updatedAt": "2026-07-15T13:58:50.628Z"
      },
      {
        "id": "7d9e004b-e012-4dfc-acf8-0c729aa4871a",
        "organization": "demo-org-sqlite-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "\": 10,\n      \"note\": \"fact 10 about widgets\"\n    },\n    {\n      \"id\": 11,\n      \"note\": \"fact 11 about widgets\"\n    },\n    {\n      \"id\": 12,\n      \"note\": \"fact 12 about widgets\"\n    },\n    {\n      \"id\": 13,\n      \"note\": \"fact 13 about widgets\"\n    },\n    {\n      \"id\": 14,\n      \"note\": \"fact 14 about widgets\"\n    },\n    {\n      \"id\": 15,\n      \"note\": \"fact 15 about widgets\"\n    },\n    {\n      \"id\": 16,\n      \"note\": \"fact 16 about widgets\"\n    },\n    {\n      \"id\": 17,\n      \"note\": \"fact 17 about widgets\"\n    },\n    {\n      \"id\": 18,\n      \"note\": \"fact 18 about widgets\"\n    },\n    {\n      \"id\": 19,\n      \"note\": \"fact 19 about widgets\"\n    },\n    {\n      \"id\": 20,\n      \"note\": \"fact 20 about widgets\"\n    },\n    {\n      \"id\": 21,\n      \"note\": \"fact 21 about widgets\"\n    },\n    {"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 1,
          "chunkCount": 5,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.628Z",
        "updatedAt": "2026-07-15T13:58:50.628Z"
      },
      {
        "id": "73e7fa81-fe65-468e-8ff5-b7aae52ffee1",
        "organization": "demo-org-sqlite-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "about widgets\"\n    },\n    {\n      \"id\": 21,\n      \"note\": \"fact 21 about widgets\"\n    },\n    {\n      \"id\": 22,\n      \"note\": \"fact 22 about widgets\"\n    },\n    {\n      \"id\": 23,\n      \"note\": \"fact 23 about widgets\"\n    },\n    {\n      \"id\": 24,\n      \"note\": \"fact 24 about widgets\"\n    },\n    {\n      \"id\": 25,\n      \"note\": \"fact 25 about widgets\"\n    },\n    {\n      \"id\": 26,\n      \"note\": \"fact 26 about widgets\"\n    },\n    {\n      \"id\": 27,\n      \"note\": \"fact 27 about widgets\"\n    },\n    {\n      \"id\": 28,\n      \"note\": \"fact 28 about widgets\"\n    },\n    {\n      \"id\": 29,\n      \"note\": \"fact 29 about widgets\"\n    },\n    {\n      \"id\": 30,\n      \"note\": \"fact 30 about widgets\"\n    },\n    {\n      \"id\": 31,\n      \"note\": \"fact 31 about widgets\"\n    },\n    {\n      \"id\": 32,\n      \"note\": \"fact"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 2,
          "chunkCount": 5,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.628Z",
        "updatedAt": "2026-07-15T13:58:50.628Z"
      },
      {
        "id": "42164e8c-220e-4a60-80ba-148932686e8e",
        "organization": "demo-org-sqlite-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "\"id\": 31,\n      \"note\": \"fact 31 about widgets\"\n    },\n    {\n      \"id\": 32,\n      \"note\": \"fact 32 about widgets\"\n    },\n    {\n      \"id\": 33,\n      \"note\": \"fact 33 about widgets\"\n    },\n    {\n      \"id\": 34,\n      \"note\": \"fact 34 about widgets\"\n    },\n    {\n      \"id\": 35,\n      \"note\": \"fact 35 about widgets\"\n    },\n    {\n      \"id\": 36,\n      \"note\": \"fact 36 about widgets\"\n    },\n    {\n      \"id\": 37,\n      \"note\": \"fact 37 about widgets\"\n    },\n    {\n      \"id\": 38,\n      \"note\": \"fact 38 about widgets\"\n    },\n    {\n      \"id\": 39,\n      \"note\": \"fact 39 about widgets\"\n    },\n    {\n      \"id\": 40,\n      \"note\": \"fact 40 about widgets\"\n    },\n    {\n      \"id\": 41,\n      \"note\": \"fact 41 about widgets\"\n    },\n    {\n      \"id\": 42,\n      \"note\": \"fact 42 about widgets\"\n    },"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 3,
          "chunkCount": 5,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.628Z",
        "updatedAt": "2026-07-15T13:58:50.628Z"
      },
      {
        "id": "8e69f766-80d2-4089-b97a-489c7273305e",
        "organization": "demo-org-sqlite-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "act 41 about widgets\"\n    },\n    {\n      \"id\": 42,\n      \"note\": \"fact 42 about widgets\"\n    },\n    {\n      \"id\": 43,\n      \"note\": \"fact 43 about widgets\"\n    },\n    {\n      \"id\": 44,\n      \"note\": \"fact 44 about widgets\"\n    },\n    {\n      \"id\": 45,\n      \"note\": \"fact 45 about widgets\"\n    },\n    {\n      \"id\": 46,\n      \"note\": \"fact 46 about widgets\"\n    },\n    {\n      \"id\": 47,\n      \"note\": \"fact 47 about widgets\"\n    },\n    {\n      \"id\": 48,\n      \"note\": \"fact 48 about widgets\"\n    },\n    {\n      \"id\": 49,\n      \"note\": \"fact 49 about widgets\"\n    }\n  ]\n}"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 4,
          "chunkCount": 5,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.628Z",
        "updatedAt": "2026-07-15T13:58:50.628Z"
      }
    ],
    "extractedChars": 3369,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.md — 1 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 2.67 ms |
| chunkCount | 1 |
| chunksPerSec | 374.00 ops/sec |
| heapDelta | 100208 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "e3632bff-0773-4796-a61b-fe22c8825440",
        "organization": "demo-org-sqlite-ingest-sample-md",
        "agent": "ingest-bot",
        "content": {
          "text": "# Widgets Pricing Guide\n\nWidgets cost **$10** each for standard size. ## Support\n\nEmail help@example.com for refunds within 30 days. ## Shipping\n\nOrders ship within 2 business days from dock B."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 1,
          "sourceFilename": "sample.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.646Z",
        "updatedAt": "2026-07-15T13:58:50.646Z"
      }
    ],
    "extractedChars": 196,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.txt — 1 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 1.48 ms |
| chunkCount | 1 |
| chunksPerSec | 677.05 ops/sec |
| heapDelta | 71872 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "58ec9ebf-7184-46e5-b274-d12c363becdc",
        "organization": "demo-org-sqlite-ingest-sample-txt",
        "agent": "ingest-bot",
        "content": {
          "text": "Wolbarg fixture text file. The quick brown fox jumps over the lazy dog. This paragraph exists so sentence chunking has more than one sentence to split. Inventory sync runs every hour at the main warehouse."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 1,
          "sourceFilename": "sample.txt"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.666Z",
        "updatedAt": "2026-07-15T13:58:50.666Z"
      }
    ],
    "extractedChars": 208,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.pdf — 1 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 230.35 ms |
| chunkCount | 1 |
| chunksPerSec | 4.34 ops/sec |
| heapDelta | 21123728 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "3a718495-5e90-430a-b7b5-498a26f0bd44",
        "organization": "demo-org-sqlite-ingest-sample-pdf",
        "agent": "ingest-bot",
        "content": {
          "text": "Dummy PDF file"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 1,
          "sourceFilename": "sample-text.pdf"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:50.911Z",
        "updatedAt": "2026-07-15T13:58:50.911Z"
      }
    ],
    "extractedChars": 16,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.docx — 1 chunks (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 218.55 ms |
| chunkCount | 1 |
| chunksPerSec | 4.58 ops/sec |
| heapDelta | 102400 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "9508e937-85be-4635-a0e7-856ff96226ae",
        "organization": "demo-org-sqlite-ingest-sample-docx",
        "agent": "ingest-bot",
        "content": {
          "text": "Wolbarg sample DOCX. Widgets pricing and refunds policy for Acme Corp. Customers may request refunds within 30 days of purchase for unused widgets."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 1,
          "sourceFilename": "sample.docx"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.144Z",
        "updatedAt": "2026-07-15T13:58:51.144Z"
      }
    ],
    "extractedChars": 151,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>


#### Ingest methodology

- Backend: **sqlite** · fixtures from test-envirnment/fixtures

### sqlite · Chunking Benchmark

Ingest the same markdown document under fixed / sentence / markdown chunkers.

_Section duration: 50.16 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Chunking · fixed | fixed-doc | sqlite | 2.43 ms |
| Chunking · sentence | fixed-doc | sqlite | 2.92 ms |
| Chunking · markdown | fixed-doc | sqlite | 2.62 ms |

#### Metrics

##### Chunking · fixed — fixed-doc (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 2.43 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "ce20a7db-a19f-4d30-9cc0-17a1ae9871f3",
        "organization": "demo-org-sqlite-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes.\n\n## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.161Z",
        "updatedAt": "2026-07-15T13:58:51.161Z"
      },
      {
        "id": "05ae4966-5698-4cab-81a1-473fc48be522",
        "organization": "demo-org-sqlite-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 1,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.161Z",
        "updatedAt": "2026-07-15T13:58:51.161Z"
      },
      {
        "id": "97de7388-8c99-45d2-8caa-943ea52c32e2",
        "organization": "demo-org-sqlite-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "raph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering not"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 2,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.161Z",
        "updatedAt": "2026-07-15T13:58:51.161Z"
      },
      {
        "id": "0b485371-c18e-4804-b07a-8d17abaf1c31",
        "organization": "demo-org-sqlite-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "r agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 3,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.161Z",
        "updatedAt": "2026-07-15T13:58:51.161Z"
      },
      {
        "id": "2274a746-2980-43a8-917f-39f77f0bc680",
        "organization": "demo-org-sqlite-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\n\n\n## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 4,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.161Z",
        "updatedAt": "2026-07-15T13:58:51.161Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Chunking · sentence — fixed-doc (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 2.92 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "ec5aad51-1acc-435c-aabc-3506825f48b2",
        "organization": "demo-org-sqlite-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes. ## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, i"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.178Z",
        "updatedAt": "2026-07-15T13:58:51.178Z"
      },
      {
        "id": "0d2aa393-fa0f-4be0-9fbd-925bb724d441",
        "organization": "demo-org-sqlite-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "ces, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph disc"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 1,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.178Z",
        "updatedAt": "2026-07-15T13:58:51.178Z"
      },
      {
        "id": "9790ae18-8b5c-4e96-857b-8fc2fef3b69d",
        "organization": "demo-org-sqlite-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "s warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 2,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.178Z",
        "updatedAt": "2026-07-15T13:58:51.178Z"
      },
      {
        "id": "01b566b5-7195-4565-95fd-456ab68a98dd",
        "organization": "demo-org-sqlite-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "ity. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and enginee"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 3,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.178Z",
        "updatedAt": "2026-07-15T13:58:51.178Z"
      },
      {
        "id": "e2d051a5-75be-4555-aa5a-34e9cae99fbe",
        "organization": "demo-org-sqlite-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. ## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 4,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.178Z",
        "updatedAt": "2026-07-15T13:58:51.178Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Chunking · markdown — fixed-doc (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 2.62 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "63fe52b9-0da8-4e15-9173-215230d2977d",
        "organization": "demo-org-sqlite-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes.\n\n## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 0,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.195Z",
        "updatedAt": "2026-07-15T13:58:51.195Z"
      },
      {
        "id": "2318634a-a145-4528-a0e0-6e4ea058f80d",
        "organization": "demo-org-sqlite-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 1,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.195Z",
        "updatedAt": "2026-07-15T13:58:51.195Z"
      },
      {
        "id": "13c26138-f7b1-49fe-98d7-c8f0f5e6c58b",
        "organization": "demo-org-sqlite-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "raph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering not"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 2,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.195Z",
        "updatedAt": "2026-07-15T13:58:51.195Z"
      },
      {
        "id": "3760aabf-042a-48ba-bea4-90a7b3b42a47",
        "organization": "demo-org-sqlite-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "r agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 3,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.195Z",
        "updatedAt": "2026-07-15T13:58:51.195Z"
      },
      {
        "id": "bc40ba67-dedf-459a-8ec5-3be7fdc761f3",
        "organization": "demo-org-sqlite-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\n## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkIndex": 4,
          "chunkCount": 5,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:58:51.195Z",
        "updatedAt": "2026-07-15T13:58:51.195Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>


#### Chunking methodology

- Backend: **sqlite** · identical source document across strategies.

### sqlite · Forget / Clear Benchmark

Forget-by-id batch loop, forget-by-agent, and org clear latency + correctness.

_Section duration: 216.26 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Forget · by id batch | 50 ids | sqlite | 31.89 ms |
| Forget · by agent | engineering | sqlite | 5.06 ms |
| Clear · organization | 200 | sqlite | 18.55 ms |

#### Metrics

##### Forget · by id batch — 50 ids (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 31.89 ms |
| deleted | 50 |

##### Forget · by agent — engineering (sqlite)

| Metric | Value |
| --- | --- |
| durationMs | 5.06 ms |
| deleted | 25 |

##### Clear · organization — 200 (sqlite)

> SQLite file size may not shrink without VACUUM after deletes.

| Metric | Value |
| --- | --- |
| durationMs | 18.55 ms |
| cleared | 175 |
| integrityOk | true |
| beforeBytes | 4.82 MB |
| afterBytes | 4.82 MB |
| remainingMemories | 0 |


#### Forget methodology

- Backend: **sqlite**

### postgres · Startup Benchmark

Measures cold vs warm Wolbarg.ready() time (storage open, schema, embedding/LLM health probes).

_Section duration: 1.83 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Startup | Cold | postgres | 52.95 ms |
| Startup | Warm | postgres | 63.64 ms |

#### Metrics

##### Startup — Cold (postgres)

| Metric | Value |
| --- | --- |
| avgInitMs | 52.95 ms |
| minMs | 50.52 ms |
| maxMs | 57.73 ms |
| iterations | 3 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "samplesMs": [
    50.51889999999912,
    50.59809999999925,
    57.730100000000675
  ],
  "definition": "New Wolbarg + ready() against a freshly cleaned storage namespace each iteration"
}
```

</details>

##### Startup — Warm (postgres)

| Metric | Value |
| --- | --- |
| avgInitMs | 63.64 ms |
| minMs | 46.56 ms |
| maxMs | 93.60 ms |
| iterations | 3 |
| tinybenchHz | 23.18 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "samplesMs": [
    46.559299999998984,
    50.75170000000071,
    93.60030000000006
  ],
  "definition": "Reopen existing populated organization / DB file"
}
```

</details>


#### Startup methodology

- Backend: **postgres**
- **Cold**: cleaned storage + migrations + provider probes.
- **Warm**: reopen existing populated memory store.

### postgres · Compression Benchmark

Measures Wolbarg.compress() duration, active-set reduction, and storage delta.

_Section duration: 987.56 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Compression | 50 | postgres | 98.00% |
| Compression | 200 | postgres | 99.50% |

#### Metrics

##### Compression — 50 (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 19.59 ms |
| beforeActive | 50 |
| afterActive | 1 |
| afterArchived | 50 |
| beforeTotal | 50 |
| afterTotal | 51 |
| reduction | 98.00% |
| limit | 50 |
| beforeBytes | 25.85 MB |
| afterBytes | 26.00 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "agent": "engineering",
  "compressResult": {
    "summary": {
      "id": "101220ba-9af5-4433-8b97-670bf63ae8a5",
      "organization": "demo-org-postgres-compression-50",
      "agent": "engineering",
      "content": {
        "text": "Compressed agent memory summary covering related operational notes. Key themes extracted from 2 messages: billing, meetings, deployments, and follow-ups. Source snippet: You are a memory compression engine for multi-agent systems.\nGiven related memories from a single agent, produce ONE concise summary that preserves:\n- Key facts and decisions\n- Imp"
      },
      "metadata": {
        "sourceIds": [
          "c77b43ab-686d-4175-8786-9e2f7af896b0",
          "16fada23-762e-42a3-ab2e-9199153295ae",
          "4030439b-e199-4253-8fb3-b3b99c6dd809",
          "5778ed86-b633-421f-96da-b306de448ac3",
          "dfb5c01a-08c2-42af-b437-cb83e2626f45",
          "4bb68a81-dd4c-40c4-82c8-a03079a35bd1",
          "c0526ea0-db68-49fd-ac79-b7b7f9717c9c",
          "17fd6c4c-d4e1-4d46-b250-c5650cc1e127",
          "8fca0b4d-a3e5-4a2d-ba36-dcc0f11e0adf",
          "7814ab08-739f-42af-9519-78264f07c36d",
          "7bfbebe1-b434-4512-a416-40a6a411e73c",
          "a9c3f5f7-5720-40af-bafd-00e1cdc672a7",
          "031a5d94-9285-49a4-a2dd-de117bdd0ffc",
          "a03455c5-3ac6-4de1-a2ba-c1b9fc1d9840",
          "ab248124-6363-402b-a2be-449b73c0807b",
          "ff3a0d89-98a8-4d7c-ba3d-aee49f50d16b",
          "78d9a855-b631-4dc6-a71d-0967fd81208e",
          "747fa30f-dc34-4773-9602-a79d3abd0238",
          "771d53f5-13d7-4f9e-8621-e6cc4c9f77ba",
          "237976d2-8026-4179-bdd9-360f79731d0f",
          "867f0ef4-9638-477e-a5d2-581ce696b222",
          "2edbc181-bdb0-4c2a-a0d7-5fd323567811",
          "5cb21393-479f-4285-8854-4f18a384551f",
          "913e16fb-283a-450a-ab89-e64eefd720c5",
          "6b7ca6b7-1933-4a43-bd25-79945ff2b32f",
          "a2db39bd-aedd-4807-921a-62cd55e5315c",
          "2f2c346f-4d5e-46b9-9663-1f4f33f81330",
          "93550c71-41dc-4390-9db2-12982b0faa07",
          "50032dd4-c3a7-4915-bb45-488b98131e6d",
          "5b8b6468-bbfc-46a7-a8c9-d23988484a2b",
          "032a9be8-d100-4878-9da4-ae1771b09b3e",
          "36d00a04-d7cf-4d65-97a0-afd5d38ddc24",
          "0da79df0-32cf-46f2-b160-6f9b84a6d8c9",
          "ffdde006-947e-49f3-8c74-d8638708ec36",
          "0802db8d-4e9a-4edc-9ffb-bfaeb8d10d36",
          "a38e039f-8db3-441c-81a1-2c8704489cbe",
          "2fea6b6d-f3e9-42c5-8b99-8c5d0c9f2c21",
          "2a31a456-786a-4478-adfd-4c66b144653f",
          "6524cbbe-2faa-4da1-bd49-c0bb3d96b8c0",
          "07341112-b885-40cd-9525-4c192e33bdf9",
          "e31e35a0-6713-4e23-bfbc-a7f08b24bc92",
          "6708331f-7279-4a76-8cb5-a34ffd4dbd48",
          "e7d804d1-176d-4d89-bebd-dcc0e7ec430f",
          "71a130ac-c16c-4b33-81c1-ffadf46d9d8e",
          "90ad4602-64a0-4757-90a0-ff6599d14e2c",
          "53db1299-6512-4a3a-a03d-f13f258ecce1",
          "b70c4514-d39c-4d4c-8147-0dd6b9ab9d4b",
          "b7ce4b7b-01d4-4b5c-b718-821c46a2110a",
          "39983b1e-6454-41ca-8722-ab6ed613266d",
          "137d3184-46b2-4be0-a042-b87d1335baaa"
        ],
        "compressed": true,
        "sourceCount": 50
      },
      "archived": false,
      "compressedInto": null,
      "createdAt": "2026-07-15T13:58:53.628Z",
      "updatedAt": "2026-07-15T13:58:53.628Z"
    },
    "archivedIds": [
      "c77b43ab-686d-4175-8786-9e2f7af896b0",
      "16fada23-762e-42a3-ab2e-9199153295ae",
      "4030439b-e199-4253-8fb3-b3b99c6dd809",
      "5778ed86-b633-421f-96da-b306de448ac3",
      "dfb5c01a-08c2-42af-b437-cb83e2626f45",
      "4bb68a81-dd4c-40c4-82c8-a03079a35bd1",
      "c0526ea0-db68-49fd-ac79-b7b7f9717c9c",
      "17fd6c4c-d4e1-4d46-b250-c5650cc1e127",
      "8fca0b4d-a3e5-4a2d-ba36-dcc0f11e0adf",
      "7814ab08-739f-42af-9519-78264f07c36d",
      "7bfbebe1-b434-4512-a416-40a6a411e73c",
      "a9c3f5f7-5720-40af-bafd-00e1cdc672a7",
      "031a5d94-9285-49a4-a2dd-de117bdd0ffc",
      "a03455c5-3ac6-4de1-a2ba-c1b9fc1d9840",
      "ab248124-6363-402b-a2be-449b73c0807b",
      "ff3a0d89-98a8-4d7c-ba3d-aee49f50d16b",
      "78d9a855-b631-4dc6-a71d-0967fd81208e",
      "747fa30f-dc34-4773-9602-a79d3abd0238",
      "771d53f5-13d7-4f9e-8621-e6cc4c9f77ba",
      "237976d2-8026-4179-bdd9-360f79731d0f",
      "867f0ef4-9638-477e-a5d2-581ce696b222",
      "2edbc181-bdb0-4c2a-a0d7-5fd323567811",
      "5cb21393-479f-4285-8854-4f18a384551f",
      "913e16fb-283a-450a-ab89-e64eefd720c5",
      "6b7ca6b7-1933-4a43-bd25-79945ff2b32f",
      "a2db39bd-aedd-4807-921a-62cd55e5315c",
      "2f2c346f-4d5e-46b9-9663-1f4f33f81330",
      "93550c71-41dc-4390-9db2-12982b0faa07",
      "50032dd4-c3a7-4915-bb45-488b98131e6d",
      "5b8b6468-bbfc-46a7-a8c9-d23988484a2b",
      "032a9be8-d100-4878-9da4-ae1771b09b3e",
      "36d00a04-d7cf-4d65-97a0-afd5d38ddc24",
      "0da79df0-32cf-46f2-b160-6f9b84a6d8c9",
      "ffdde006-947e-49f3-8c74-d8638708ec36",
      "0802db8d-4e9a-4edc-9ffb-bfaeb8d10d36",
      "a38e039f-8db3-441c-81a1-2c8704489cbe",
      "2fea6b6d-f3e9-42c5-8b99-8c5d0c9f2c21",
      "2a31a456-786a-4478-adfd-4c66b144653f",
      "6524cbbe-2faa-4da1-bd49-c0bb3d96b8c0",
      "07341112-b885-40cd-9525-4c192e33bdf9",
      "e31e35a0-6713-4e23-bfbc-a7f08b24bc92",
      "6708331f-7279-4a76-8cb5-a34ffd4dbd48",
      "e7d804d1-176d-4d89-bebd-dcc0e7ec430f",
      "71a130ac-c16c-4b33-81c1-ffadf46d9d8e",
      "90ad4602-64a0-4757-90a0-ff6599d14e2c",
      "53db1299-6512-4a3a-a03d-f13f258ecce1",
      "b70c4514-d39c-4d4c-8147-0dd6b9ab9d4b",
      "b7ce4b7b-01d4-4b5c-b718-821c46a2110a",
      "39983b1e-6454-41ca-8722-ab6ed613266d",
      "137d3184-46b2-4be0-a042-b87d1335baaa"
    ]
  },
  "note": "Percent is active memory-count reduction (archived rows retained for lineage). Disk reclaim requires VACUUM / dead-tuple cleanup."
}
```

</details>

##### Compression — 200 (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 49.42 ms |
| beforeActive | 200 |
| afterActive | 1 |
| afterArchived | 200 |
| beforeTotal | 200 |
| afterTotal | 201 |
| reduction | 99.50% |
| limit | 200 |
| beforeBytes | 26.71 MB |
| afterBytes | 27.07 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "agent": "engineering",
  "compressResult": {
    "summary": {
      "id": "b45bca48-fa1c-4894-ba0a-155ec97b3c05",
      "organization": "demo-org-postgres-compression-200",
      "agent": "engineering",
      "content": {
        "text": "Compressed agent memory summary covering related operational notes. Key themes extracted from 2 messages: billing, meetings, deployments, and follow-ups. Source snippet: You are a memory compression engine for multi-agent systems.\nGiven related memories from a single agent, produce ONE concise summary that preserves:\n- Key facts and decisions\n- Imp"
      },
      "metadata": {
        "sourceIds": [
          "bb66acc9-3b72-4c81-8d5d-377f5a417ca2",
          "40f898a1-aa6c-43e0-9d34-f5bc1cc41982",
          "267ae39f-05cb-4b4d-9ff5-4ce0e6135937",
          "e0ea8d2e-3628-4a99-baff-dbd908a0676e",
          "8230302c-90a5-4a31-ad3e-8646310ddcec",
          "1b7ab8fe-bcb1-47d1-a2a5-36167d36a20e",
          "c514703e-13d5-493c-8c82-e684fee1701a",
          "a9ec4d66-7982-40ec-afbd-83138bb0f847",
          "57dace86-1a20-4eed-9b5f-df007bd2fbbc",
          "5a5d6627-24be-4fde-8f5d-5939335982ce",
          "63a25163-7bee-4617-a645-b25a8f669eff",
          "be4f6e69-3b5a-466e-86f8-559e050abd34",
          "31a03216-17fa-4d62-bbf2-c1e17e8294aa",
          "6d0449b1-1d43-45bd-8620-49c516744944",
          "7fe81ecb-0e72-476c-ab04-f54a2c516edc",
          "51c0739d-236c-402f-a1a0-f547da9d049b",
          "9e5470fb-bbf5-433f-ad02-ea2ecb17a2fb",
          "00d604cf-5e81-49ca-a9fc-7d46f404d503",
          "395cc2b5-05d2-4232-8ce0-c654595b6744",
          "0a20048c-6176-40dd-9da9-9f2af9e6d2c8",
          "e89dabaf-404a-4b3f-a3fe-8d450736af31",
          "f736b378-d24a-4d77-bcdb-1785a2715e7e",
          "9c6bb7d9-f859-4d02-90ff-05d920955cb4",
          "8c4d77b7-b14a-4382-b16c-93df00d1d6ac",
          "5a15d11c-1cba-4f2d-9756-e5e4d7c9ba82",
          "191c5395-7f71-47a6-96a1-8f195284fd51",
          "cd5f6c35-6d86-4299-a292-68a455eb3c60",
          "cc39529a-4c1f-4edf-bc57-4f789232f9d2",
          "01dcd232-5f14-42c7-8203-68c9b6a0e801",
          "f3eb038f-0cb5-4b66-8edb-61659f7b1d95",
          "6f3bd2b3-304d-45cf-a318-17e25dde256d",
          "cec9c8d6-28d7-4229-8061-7049f19fc241",
          "86ab5ff6-b0b7-402a-9564-8b48eeb11eb4",
          "d65280bd-5164-4b23-a3b0-cc94efe870e5",
          "2c46e4f3-ec42-4a4b-8b88-acad96ebf9a2",
          "2cf79154-cdcb-452c-aa9e-74cc95c3e783",
          "fad37151-5138-45ff-a52d-7c6b7cc9f58e",
          "1e2b7642-0a5c-496e-9e1a-7797ac242d0e",
          "97ca3350-9ca3-42b6-8239-5cb5d4383be5",
          "43d6f0d2-eae0-467d-82c7-2add32fc6315",
          "3c7591f6-5eb1-4323-86c9-aefd95557b94",
          "31c5df2f-e7c7-4b08-a04e-bd45132786a3",
          "0f2b82b0-e381-403f-9ffa-5914d67108c8",
          "59ca74f0-7d7f-4b43-9048-fe8348fde57d",
          "03db219e-a72d-4468-a876-b1d0efe12a9f",
          "ab264ef2-356a-4b3e-9b22-bec1cc78dd99",
          "110527c3-1c4d-4d45-91f3-d4da5975ba9c",
          "15c9fa6c-9de4-453d-9fbb-3a60a62e5652",
          "c19a23b3-7316-4dc6-b1e2-d755c897605f",
          "98284805-fe41-4ddd-9c43-6e01f66d032d",
          "735ce3f2-e143-4f95-a87e-02f233197929",
          "3dd67fb0-dcfc-4f8f-b18e-6e70ca91fafa",
          "5325d2dd-6603-4cfe-b061-7cc75e5fa15d",
          "0e2ba4c2-af33-4cfd-baa2-aa4fcea100dc",
          "bf6573b2-3af9-4c80-a060-9dadd3f0befe",
          "57651e7a-d5fb-48f3-8d6e-94d976a2df2b",
          "2f036315-ef75-4e2a-b74c-5aa0ef246115",
          "7deec6ef-7e5d-477d-96ec-a1413c783dfd",
          "7afe78ae-c1ee-42ae-bba2-158acb9eb392",
          "853ceeba-7b63-4afe-b3e4-cf5d65ba12b0",
          "7dc3fa35-b299-4d72-a1f8-f2092f7eb9dd",
          "3c89a17a-edb5-48a0-a2b5-7068a061897b",
          "a5ff0350-960b-41e5-b6f8-dccc24fe052b",
          "0f63ab0c-dab9-4461-9bbf-8eee1f873151",
          "af25c13c-f376-4804-a5cf-88fb11be3ce0",
          "210608ef-0fde-4f47-bba6-0340d78296e9",
          "47f116c9-efb0-4121-8278-1c7751d3b722",
          "bc9bd8ce-96cb-4c54-8452-a73d5f78f43b",
          "cb65aa60-b7af-4ddf-a2b6-8d0abd7e2f8b",
          "fc7e7a7c-62e8-4148-a273-dbad685a135b",
          "a2f1b43a-0523-4c22-9563-3b2e225c7b9b",
          "9d14fce1-d5d4-408c-a67a-1a2758c62eab",
          "4f2e7a60-ef53-4a9a-bb63-2f4af100374f",
          "c6476819-cc67-43e1-8243-ea65737a5908",
          "d377ffd1-d72c-443c-81fb-0945fa2ef223",
          "44ee0edb-474d-4f62-86b1-b6d64ddef848",
          "b398d764-c022-450c-836b-d464f94deb8c",
          "aadfb5b8-9b57-479d-8d9e-915facdeb173",
          "e4fd6a92-c5be-4436-837f-1714d151173e",
          "f21aa779-57c0-40ad-ab9b-ce35414174e1",
          "6b69deae-7195-4cc5-9a6d-e1ba94b1262b",
          "02860cf1-ad80-40bd-b2d5-16ff4b8f0bbc",
          "fa6a64d6-8b09-4837-9737-3d7cba42fd23",
          "37317f1b-5d7f-48f5-970e-5fe8b14c1503",
          "550a1e1b-587e-4520-a95e-9230870fa68f",
          "ba8d7e92-d84e-432c-8334-b32c4798a71b",
          "68b91d89-a731-45de-b96d-1f22bd7c9e55",
          "142f8003-12db-49e6-b78f-306edeb0e62f",
          "8b704bb8-c670-472e-8f14-5fe1d2b38502",
          "704efb6a-2d09-430f-b21c-aecf8eeb9f5d",
          "78690c25-2101-42df-bcb5-b1f5446989e5",
          "3114a328-1032-42ce-bbab-ebd21984d84b",
          "0e5e8f29-5f54-4f6b-be63-679befaa4f30",
          "ae84bc55-0d04-44db-aa4f-84fcd00f82c3",
          "24ccebe2-dcd6-4b75-8397-a13b0ccf4378",
          "632e2c5f-418c-4969-a2d4-176471fe8ccc",
          "540d24e0-8c56-4850-8253-52c5e8c0f497",
          "8a3fc688-2ce5-40cf-b8e0-b39cd9fc4e84",
          "8e1f3366-0b9c-4603-8592-7da965407629",
          "fe29dc2e-1d94-4653-8d12-ac0af637c4f9",
          "35e5e796-46c6-47a2-ab5c-c7536d38796c",
          "fe2325c6-fe86-477d-a01d-ab9fccaa7428",
          "47f18032-eb5c-4f38-a7f3-8e52d8543c6a",
          "f14f1f43-4f1f-4569-9e04-ebe97f303aca",
          "802cb914-15e0-4aa7-a193-b185e4d00948",
          "22379dcd-c5a2-4626-9822-47925bdb5df4",
          "a22d96de-396f-4148-bb8d-5801e461830b",
          "9b09e302-d828-4f0e-b093-44780d4bcb55",
          "76877687-cb0f-44b7-8cdf-452b89b26f32",
          "deb75a4a-4467-490b-a243-ba0427293f10",
          "b33c17cd-3bbf-4e82-a578-cb2788b18245",
          "b0666506-a895-43d2-844b-4487812b162e",
          "4d479846-ef9d-4159-ba3b-4841c179fc47",
          "d9465bbb-d5f5-4d57-9d79-5d5968852c67",
          "a8745c63-9980-48fc-b163-1f73d1ffd64d",
          "27e7a121-04d4-4373-ac80-61ff4e3f8ff8",
          "d033b2c9-e58a-4ff3-b7e7-ed7cd5e83e2b",
          "6225da91-7dcc-4d4e-8456-63b54a630a04",
          "2c6a451b-653c-4c09-af26-98a790455a02",
          "0e78fd55-2c8d-4cb9-a84f-770761eddd23",
          "74c60ecd-6754-4c5b-901b-015c498861a8",
          "81ce2ae8-79df-4994-b906-f1efdb653e91",
          "139b95af-f7cc-49a5-b5aa-f72313da9ffc",
          "e9a35b63-f3fe-480f-85bb-854198b85cf2",
          "a749b0bc-5b75-4047-abfd-c80859fd336c",
          "61ab1343-41c4-4d93-8f0c-9791c5d09c0b",
          "cb8524ef-d2e8-43e8-a2cc-21f623bf80a6",
          "2276b2a6-4864-4fd6-a5a3-bd27199d3c72",
          "a1892376-f856-4f6c-8232-66f166702227",
          "fc5cd8ef-8c01-4b9a-a25c-c7ad5789f3a4",
          "9890c05b-d0df-4d90-b2ad-9802f2491211",
          "dafdebfd-77d0-47f9-95a6-91c96c998750",
          "a32c60fe-1a96-470d-b8e2-ddfc38231662",
          "d7fb7fb4-6a4a-4107-bec7-1aca3ba79ef6",
          "947071b4-6469-438c-8f85-18233b367926",
          "62e51a33-eb4b-4a75-b1ee-15590f51e2ba",
          "4b64a343-0af4-4650-9f74-68d6f8dddc76",
          "b67e8a72-7644-4ac2-8b3d-aa03c3cd772a",
          "388fdb84-ada0-4676-883e-dd9845e034ce",
          "33ca3fb7-3283-4132-ab49-c56063a76370",
          "ff1232e3-da9d-46cc-9548-3340953e9484",
          "961dc218-d71b-4503-9779-2e3346583e04",
          "922fa870-7fd9-4a0f-bc7a-e0887763da9a",
          "f23771a9-5031-4517-b812-0c43fc3d8bfc",
          "3afb79de-dd59-4c9a-8c9e-d02de18ab3cf",
          "2cd69c72-6968-44d8-ad5f-e069bf6b5e55",
          "3e65591e-caa2-4532-8609-f7af0f76d4ad",
          "e6ee9463-acdd-4b43-998a-1dd96dea156a",
          "7d515ff0-86e9-4378-a188-07e13869ce19",
          "6578f691-4bb6-436a-9f2b-e503a4ff6ba0",
          "36bcd35d-82d8-4e6e-99dc-0931ae10c9db",
          "07c8017e-37e4-4b1a-8a18-3b1ad76e6a57",
          "7b42a779-6173-4f8c-aeea-55b24167eb33",
          "cf337162-6d22-4562-baff-24af5247cfc8",
          "ef46c09c-af88-45a7-bf24-5c09e1673295",
          "cce09651-7ab9-4fd8-9c47-5a2997a17a67",
          "e0de8085-97d2-43b4-80b6-c27da3d9b2dd",
          "7f930e6f-8011-497a-8449-fb36ac14c53b",
          "ffc20f92-e2da-4a18-885f-8f288931f782",
          "812865d2-3e35-4a42-8b05-a06365f03a39",
          "bc687239-581d-47b0-9852-5f7d91f4fe94",
          "18d4bae9-9af7-4e57-84d8-df6a9a8ab744",
          "aebca20a-4c0b-4930-bd8d-d8817fed9a8b",
          "59d522d3-6cd4-449f-b364-bd4dbadf78dc",
          "854c210a-7d74-4474-b372-ad10051bcd35",
          "2ac4386f-9110-443f-9114-9bd510730299",
          "a9803ee2-ff38-4d77-9737-686ea0f3e233",
          "f2ef0938-0abf-4b9b-bacc-ba13745c7c32",
          "c869bbfd-7da5-497e-a529-57e48caa914b",
          "dc0512f3-f379-4fae-9301-b5cd945d7b98",
          "3b3b28f3-c1bb-4f6f-a92d-2961c80d6beb",
          "08ca37b8-88f2-4fbe-8d8c-217112f9e4dc",
          "e29a9026-1613-4bf1-b10d-ac07745aec71",
          "a76c265e-1b69-4a34-bfd6-aca25863c201",
          "038300f1-3792-4d95-b0a1-2b3ef22b3484",
          "6d476f4a-da97-4fa4-af58-578f873eb8c9",
          "5dc4fd21-b6bb-4e75-9d62-524e9e8ef3ca",
          "c9537eca-3f7c-4f86-ad01-c090b91c5db1",
          "73320f79-f714-438f-9866-7547ca85e6d8",
          "e8bcb5c6-40ff-40dd-b3e6-f1cb3bb5214f",
          "abdb9b9f-5f0b-40de-aa6e-0b00485dcbeb",
          "bab428d1-ced6-48b1-ba98-8d62a78b5d91",
          "d376c248-28b5-44df-b89e-e9639c3e1e5b",
          "ffc82588-ec16-46f0-b0eb-4050f7db5aef",
          "3d233fd9-6d8b-48ac-b69f-2bee3c810d7a",
          "b4194961-6ff0-4f79-8b31-54ad6638c212",
          "2e3f448c-67c5-4f7a-986a-dabcbae2a2ca",
          "9950ab49-c84b-47fb-80de-72d5330318b5",
          "74663ab9-6d11-4152-bf76-ad630a7edcb4",
          "fd583b00-3137-413f-bd2d-63c78a58f84f",
          "6d91ec91-77ae-4b05-9d2c-cad198e7f94e",
          "6262202b-eb34-4985-b074-13a7c28615ef",
          "de304deb-07fb-4ebc-9e33-c6ee219e393d",
          "a091327a-d5ff-419d-b120-7db6fbd7ff6d",
          "3e0070d0-c73c-455c-a610-01a8364f5ec8",
          "f615cb88-12ee-40f5-a45a-f185af5d975c",
          "1a413cfc-9ee3-4877-adcf-eda7eef90a93",
          "d806bfbc-6cf8-41fd-8fd4-dc265f20068a",
          "3d05ea71-3d00-4844-b900-7d815476113b",
          "7d9407fd-a11f-40b3-a3a3-82bec1eab9dc"
        ],
        "compressed": true,
        "sourceCount": 200
      },
      "archived": false,
      "compressedInto": null,
      "createdAt": "2026-07-15T13:58:54.320Z",
      "updatedAt": "2026-07-15T13:58:54.320Z"
    },
    "archivedIds": [
      "31a03216-17fa-4d62-bbf2-c1e17e8294aa",
      "bb66acc9-3b72-4c81-8d5d-377f5a417ca2",
      "40f898a1-aa6c-43e0-9d34-f5bc1cc41982",
      "267ae39f-05cb-4b4d-9ff5-4ce0e6135937",
      "e0ea8d2e-3628-4a99-baff-dbd908a0676e",
      "8230302c-90a5-4a31-ad3e-8646310ddcec",
      "1b7ab8fe-bcb1-47d1-a2a5-36167d36a20e",
      "c514703e-13d5-493c-8c82-e684fee1701a",
      "a9ec4d66-7982-40ec-afbd-83138bb0f847",
      "57dace86-1a20-4eed-9b5f-df007bd2fbbc",
      "5a5d6627-24be-4fde-8f5d-5939335982ce",
      "63a25163-7bee-4617-a645-b25a8f669eff",
      "be4f6e69-3b5a-466e-86f8-559e050abd34",
      "6d0449b1-1d43-45bd-8620-49c516744944",
      "7fe81ecb-0e72-476c-ab04-f54a2c516edc",
      "51c0739d-236c-402f-a1a0-f547da9d049b",
      "9e5470fb-bbf5-433f-ad02-ea2ecb17a2fb",
      "00d604cf-5e81-49ca-a9fc-7d46f404d503",
      "395cc2b5-05d2-4232-8ce0-c654595b6744",
      "0a20048c-6176-40dd-9da9-9f2af9e6d2c8",
      "e89dabaf-404a-4b3f-a3fe-8d450736af31",
      "f736b378-d24a-4d77-bcdb-1785a2715e7e",
      "9c6bb7d9-f859-4d02-90ff-05d920955cb4",
      "8c4d77b7-b14a-4382-b16c-93df00d1d6ac",
      "5a15d11c-1cba-4f2d-9756-e5e4d7c9ba82",
      "191c5395-7f71-47a6-96a1-8f195284fd51",
      "cd5f6c35-6d86-4299-a292-68a455eb3c60",
      "cc39529a-4c1f-4edf-bc57-4f789232f9d2",
      "01dcd232-5f14-42c7-8203-68c9b6a0e801",
      "f3eb038f-0cb5-4b66-8edb-61659f7b1d95",
      "6f3bd2b3-304d-45cf-a318-17e25dde256d",
      "cec9c8d6-28d7-4229-8061-7049f19fc241",
      "86ab5ff6-b0b7-402a-9564-8b48eeb11eb4",
      "d65280bd-5164-4b23-a3b0-cc94efe870e5",
      "2c46e4f3-ec42-4a4b-8b88-acad96ebf9a2",
      "2cf79154-cdcb-452c-aa9e-74cc95c3e783",
      "fad37151-5138-45ff-a52d-7c6b7cc9f58e",
      "1e2b7642-0a5c-496e-9e1a-7797ac242d0e",
      "97ca3350-9ca3-42b6-8239-5cb5d4383be5",
      "43d6f0d2-eae0-467d-82c7-2add32fc6315",
      "3c7591f6-5eb1-4323-86c9-aefd95557b94",
      "31c5df2f-e7c7-4b08-a04e-bd45132786a3",
      "0f2b82b0-e381-403f-9ffa-5914d67108c8",
      "59ca74f0-7d7f-4b43-9048-fe8348fde57d",
      "03db219e-a72d-4468-a876-b1d0efe12a9f",
      "ab264ef2-356a-4b3e-9b22-bec1cc78dd99",
      "110527c3-1c4d-4d45-91f3-d4da5975ba9c",
      "15c9fa6c-9de4-453d-9fbb-3a60a62e5652",
      "c19a23b3-7316-4dc6-b1e2-d755c897605f",
      "98284805-fe41-4ddd-9c43-6e01f66d032d",
      "735ce3f2-e143-4f95-a87e-02f233197929",
      "3dd67fb0-dcfc-4f8f-b18e-6e70ca91fafa",
      "5325d2dd-6603-4cfe-b061-7cc75e5fa15d",
      "0e2ba4c2-af33-4cfd-baa2-aa4fcea100dc",
      "bf6573b2-3af9-4c80-a060-9dadd3f0befe",
      "57651e7a-d5fb-48f3-8d6e-94d976a2df2b",
      "2f036315-ef75-4e2a-b74c-5aa0ef246115",
      "7deec6ef-7e5d-477d-96ec-a1413c783dfd",
      "7afe78ae-c1ee-42ae-bba2-158acb9eb392",
      "853ceeba-7b63-4afe-b3e4-cf5d65ba12b0",
      "7dc3fa35-b299-4d72-a1f8-f2092f7eb9dd",
      "3c89a17a-edb5-48a0-a2b5-7068a061897b",
      "a5ff0350-960b-41e5-b6f8-dccc24fe052b",
      "0f63ab0c-dab9-4461-9bbf-8eee1f873151",
      "af25c13c-f376-4804-a5cf-88fb11be3ce0",
      "210608ef-0fde-4f47-bba6-0340d78296e9",
      "47f116c9-efb0-4121-8278-1c7751d3b722",
      "bc9bd8ce-96cb-4c54-8452-a73d5f78f43b",
      "cb65aa60-b7af-4ddf-a2b6-8d0abd7e2f8b",
      "fc7e7a7c-62e8-4148-a273-dbad685a135b",
      "a2f1b43a-0523-4c22-9563-3b2e225c7b9b",
      "9d14fce1-d5d4-408c-a67a-1a2758c62eab",
      "4f2e7a60-ef53-4a9a-bb63-2f4af100374f",
      "c6476819-cc67-43e1-8243-ea65737a5908",
      "d377ffd1-d72c-443c-81fb-0945fa2ef223",
      "44ee0edb-474d-4f62-86b1-b6d64ddef848",
      "b398d764-c022-450c-836b-d464f94deb8c",
      "aadfb5b8-9b57-479d-8d9e-915facdeb173",
      "e4fd6a92-c5be-4436-837f-1714d151173e",
      "f21aa779-57c0-40ad-ab9b-ce35414174e1",
      "6b69deae-7195-4cc5-9a6d-e1ba94b1262b",
      "02860cf1-ad80-40bd-b2d5-16ff4b8f0bbc",
      "fa6a64d6-8b09-4837-9737-3d7cba42fd23",
      "37317f1b-5d7f-48f5-970e-5fe8b14c1503",
      "550a1e1b-587e-4520-a95e-9230870fa68f",
      "ba8d7e92-d84e-432c-8334-b32c4798a71b",
      "68b91d89-a731-45de-b96d-1f22bd7c9e55",
      "142f8003-12db-49e6-b78f-306edeb0e62f",
      "8b704bb8-c670-472e-8f14-5fe1d2b38502",
      "704efb6a-2d09-430f-b21c-aecf8eeb9f5d",
      "78690c25-2101-42df-bcb5-b1f5446989e5",
      "3114a328-1032-42ce-bbab-ebd21984d84b",
      "0e5e8f29-5f54-4f6b-be63-679befaa4f30",
      "ae84bc55-0d04-44db-aa4f-84fcd00f82c3",
      "24ccebe2-dcd6-4b75-8397-a13b0ccf4378",
      "632e2c5f-418c-4969-a2d4-176471fe8ccc",
      "540d24e0-8c56-4850-8253-52c5e8c0f497",
      "8a3fc688-2ce5-40cf-b8e0-b39cd9fc4e84",
      "8e1f3366-0b9c-4603-8592-7da965407629",
      "fe29dc2e-1d94-4653-8d12-ac0af637c4f9",
      "35e5e796-46c6-47a2-ab5c-c7536d38796c",
      "fe2325c6-fe86-477d-a01d-ab9fccaa7428",
      "47f18032-eb5c-4f38-a7f3-8e52d8543c6a",
      "f14f1f43-4f1f-4569-9e04-ebe97f303aca",
      "802cb914-15e0-4aa7-a193-b185e4d00948",
      "22379dcd-c5a2-4626-9822-47925bdb5df4",
      "a22d96de-396f-4148-bb8d-5801e461830b",
      "9b09e302-d828-4f0e-b093-44780d4bcb55",
      "76877687-cb0f-44b7-8cdf-452b89b26f32",
      "deb75a4a-4467-490b-a243-ba0427293f10",
      "b33c17cd-3bbf-4e82-a578-cb2788b18245",
      "b0666506-a895-43d2-844b-4487812b162e",
      "4d479846-ef9d-4159-ba3b-4841c179fc47",
      "d9465bbb-d5f5-4d57-9d79-5d5968852c67",
      "a8745c63-9980-48fc-b163-1f73d1ffd64d",
      "27e7a121-04d4-4373-ac80-61ff4e3f8ff8",
      "d033b2c9-e58a-4ff3-b7e7-ed7cd5e83e2b",
      "6225da91-7dcc-4d4e-8456-63b54a630a04",
      "2c6a451b-653c-4c09-af26-98a790455a02",
      "0e78fd55-2c8d-4cb9-a84f-770761eddd23",
      "74c60ecd-6754-4c5b-901b-015c498861a8",
      "81ce2ae8-79df-4994-b906-f1efdb653e91",
      "139b95af-f7cc-49a5-b5aa-f72313da9ffc",
      "e9a35b63-f3fe-480f-85bb-854198b85cf2",
      "a749b0bc-5b75-4047-abfd-c80859fd336c",
      "61ab1343-41c4-4d93-8f0c-9791c5d09c0b",
      "cb8524ef-d2e8-43e8-a2cc-21f623bf80a6",
      "2276b2a6-4864-4fd6-a5a3-bd27199d3c72",
      "a1892376-f856-4f6c-8232-66f166702227",
      "fc5cd8ef-8c01-4b9a-a25c-c7ad5789f3a4",
      "9890c05b-d0df-4d90-b2ad-9802f2491211",
      "dafdebfd-77d0-47f9-95a6-91c96c998750",
      "a32c60fe-1a96-470d-b8e2-ddfc38231662",
      "d7fb7fb4-6a4a-4107-bec7-1aca3ba79ef6",
      "947071b4-6469-438c-8f85-18233b367926",
      "62e51a33-eb4b-4a75-b1ee-15590f51e2ba",
      "4b64a343-0af4-4650-9f74-68d6f8dddc76",
      "b67e8a72-7644-4ac2-8b3d-aa03c3cd772a",
      "388fdb84-ada0-4676-883e-dd9845e034ce",
      "33ca3fb7-3283-4132-ab49-c56063a76370",
      "ff1232e3-da9d-46cc-9548-3340953e9484",
      "961dc218-d71b-4503-9779-2e3346583e04",
      "922fa870-7fd9-4a0f-bc7a-e0887763da9a",
      "f23771a9-5031-4517-b812-0c43fc3d8bfc",
      "3afb79de-dd59-4c9a-8c9e-d02de18ab3cf",
      "2cd69c72-6968-44d8-ad5f-e069bf6b5e55",
      "3e65591e-caa2-4532-8609-f7af0f76d4ad",
      "e6ee9463-acdd-4b43-998a-1dd96dea156a",
      "7d515ff0-86e9-4378-a188-07e13869ce19",
      "6578f691-4bb6-436a-9f2b-e503a4ff6ba0",
      "36bcd35d-82d8-4e6e-99dc-0931ae10c9db",
      "07c8017e-37e4-4b1a-8a18-3b1ad76e6a57",
      "7b42a779-6173-4f8c-aeea-55b24167eb33",
      "cf337162-6d22-4562-baff-24af5247cfc8",
      "ef46c09c-af88-45a7-bf24-5c09e1673295",
      "cce09651-7ab9-4fd8-9c47-5a2997a17a67",
      "e0de8085-97d2-43b4-80b6-c27da3d9b2dd",
      "7f930e6f-8011-497a-8449-fb36ac14c53b",
      "ffc20f92-e2da-4a18-885f-8f288931f782",
      "812865d2-3e35-4a42-8b05-a06365f03a39",
      "bc687239-581d-47b0-9852-5f7d91f4fe94",
      "18d4bae9-9af7-4e57-84d8-df6a9a8ab744",
      "aebca20a-4c0b-4930-bd8d-d8817fed9a8b",
      "59d522d3-6cd4-449f-b364-bd4dbadf78dc",
      "854c210a-7d74-4474-b372-ad10051bcd35",
      "2ac4386f-9110-443f-9114-9bd510730299",
      "a9803ee2-ff38-4d77-9737-686ea0f3e233",
      "f2ef0938-0abf-4b9b-bacc-ba13745c7c32",
      "c869bbfd-7da5-497e-a529-57e48caa914b",
      "dc0512f3-f379-4fae-9301-b5cd945d7b98",
      "3b3b28f3-c1bb-4f6f-a92d-2961c80d6beb",
      "08ca37b8-88f2-4fbe-8d8c-217112f9e4dc",
      "e29a9026-1613-4bf1-b10d-ac07745aec71",
      "a76c265e-1b69-4a34-bfd6-aca25863c201",
      "038300f1-3792-4d95-b0a1-2b3ef22b3484",
      "6d476f4a-da97-4fa4-af58-578f873eb8c9",
      "5dc4fd21-b6bb-4e75-9d62-524e9e8ef3ca",
      "c9537eca-3f7c-4f86-ad01-c090b91c5db1",
      "73320f79-f714-438f-9866-7547ca85e6d8",
      "e8bcb5c6-40ff-40dd-b3e6-f1cb3bb5214f",
      "abdb9b9f-5f0b-40de-aa6e-0b00485dcbeb",
      "bab428d1-ced6-48b1-ba98-8d62a78b5d91",
      "d376c248-28b5-44df-b89e-e9639c3e1e5b",
      "ffc82588-ec16-46f0-b0eb-4050f7db5aef",
      "3d233fd9-6d8b-48ac-b69f-2bee3c810d7a",
      "b4194961-6ff0-4f79-8b31-54ad6638c212",
      "2e3f448c-67c5-4f7a-986a-dabcbae2a2ca",
      "9950ab49-c84b-47fb-80de-72d5330318b5",
      "74663ab9-6d11-4152-bf76-ad630a7edcb4",
      "fd583b00-3137-413f-bd2d-63c78a58f84f",
      "6d91ec91-77ae-4b05-9d2c-cad198e7f94e",
      "6262202b-eb34-4985-b074-13a7c28615ef",
      "de304deb-07fb-4ebc-9e33-c6ee219e393d",
      "a091327a-d5ff-419d-b120-7db6fbd7ff6d",
      "3e0070d0-c73c-455c-a610-01a8364f5ec8",
      "f615cb88-12ee-40f5-a45a-f185af5d975c",
      "1a413cfc-9ee3-4877-adcf-eda7eef90a93",
      "d806bfbc-6cf8-41fd-8fd4-dc265f20068a",
      "3d05ea71-3d00-4844-b900-7d815476113b",
      "7d9407fd-a11f-40b3-a3a3-82bec1eab9dc"
    ]
  },
  "note": "Percent is active memory-count reduction (archived rows retained for lineage). Disk reclaim requires VACUUM / dead-tuple cleanup."
}
```

</details>


#### Compression methodology

- Backend: **postgres**
- Metric: **active-set reduction** = `(active_before − active_after) / active_before`.
- Archived sources remain in storage for history/lineage; `totalMemories` may rise by 1 (summary row).
- Live mode caps `limit` at 40 to control LLM cost.

### postgres · Concurrency Baseline

Fixed N concurrent Wolbarg.remember() writers on one client (AsyncMutex queueing).

_Section duration: 874.71 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Concurrency | 2 writers | postgres | 295.88 ops/sec |
| Concurrency | 4 writers | postgres | 438.97 ops/sec |
| Concurrency | 8 writers | postgres | 554.12 ops/sec |
| Concurrency | 16 writers | postgres | 1.12k ops/sec |

#### Metrics

##### Concurrency — 2 writers (postgres)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 295.88 ops/sec |
| failures | 0 |
| successes | 30 |
| avgLatencyMs | 6.59 ms |
| p95Ms | 9.90 ms |
| p99Ms | 10.44 ms |
| writers | 2 |
| storedMemories | 30 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 4 writers (postgres)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 438.97 ops/sec |
| failures | 0 |
| successes | 60 |
| avgLatencyMs | 9.04 ms |
| p95Ms | 13.70 ms |
| p99Ms | 17.20 ms |
| writers | 4 |
| storedMemories | 60 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 8 writers (postgres)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 554.12 ops/sec |
| failures | 0 |
| successes | 120 |
| avgLatencyMs | 14.34 ms |
| p95Ms | 31.54 ms |
| p99Ms | 31.54 ms |
| writers | 8 |
| storedMemories | 120 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>

##### Concurrency — 16 writers (postgres)

| Metric | Value |
| --- | --- |
| throughputOpsPerSec | 1.12k ops/sec |
| failures | 0 |
| successes | 240 |
| avgLatencyMs | 14.22 ms |
| p95Ms | 21.77 ms |
| p99Ms | 21.78 ms |
| writers | 16 |
| storedMemories | 240 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "note": "Single Wolbarg instance; writes serialize via AsyncMutex."
}
```

</details>


#### Concurrency baseline methodology

- Backend: **postgres** · levels 2, 4, 8, 16 × 15 writes.
- For push-to-failure ramps see Breaking Concurrency section.

### postgres · Memory Usage Benchmark

Heap/RSS snapshots before init, after inserts, after recall, and after close.

_Section duration: 3.60 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Memory Usage | baseline (pre-init) | postgres | heap 31.47 MB / rss 145.62 MB |
| Memory Usage | after init | postgres | heap 31.75 MB / rss 145.65 MB |
| Memory Usage | after 100 inserts | postgres | heap 40.18 MB / rss 146.79 MB |
| Memory Usage | after 1000 inserts | postgres | heap 39.20 MB / rss 147.60 MB |
| Memory Usage | after recall | postgres | heap 39.37 MB / rss 147.68 MB |
| Memory Usage | after close | postgres | heap 39.38 MB / rss 147.71 MB |

#### Metrics

##### Memory Usage — baseline (pre-init) (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 31.47 MB |
| rss | 145.62 MB |
| heapTotal | 96.77 MB |
| external | 11.99 MB |

##### Memory Usage — after init (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 31.75 MB |
| rss | 145.65 MB |
| heapTotal | 96.77 MB |
| external | 12.01 MB |

##### Memory Usage — after 100 inserts (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 40.18 MB |
| rss | 146.79 MB |
| heapTotal | 96.77 MB |
| external | 13.43 MB |

##### Memory Usage — after 1000 inserts (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 39.20 MB |
| rss | 147.60 MB |
| heapTotal | 98.02 MB |
| external | 13.08 MB |

##### Memory Usage — after recall (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 39.37 MB |
| rss | 147.68 MB |
| heapTotal | 98.02 MB |
| external | 13.10 MB |

##### Memory Usage — after close (postgres)

| Metric | Value |
| --- | --- |
| heapUsed | 39.38 MB |
| rss | 147.71 MB |
| heapTotal | 98.02 MB |
| external | 13.10 MB |


#### Memory methodology

- Backend: **postgres** · process.memoryUsage() only (not DB RSS on remote Postgres).

### postgres · Database Size Benchmark

Measures storage growth after inserting 100 / 1k / 10k / 100k memories.

_Section duration: 5.00 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Database Size | 100 | postgres | 33.83 MB |
| Database Size | 1000 | postgres | 37.51 MB |

#### Metrics

##### Database Size — 100 (postgres)

| Metric | Value |
| --- | --- |
| bytes | 33.83 MB |
| bytesPerMemory | 346.46 KB |
| statsDatabaseSizeBytes | 33.83 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "corpus-100",
  "includesWalShm": false
}
```

</details>

##### Database Size — 1000 (postgres)

| Metric | Value |
| --- | --- |
| bytes | 37.51 MB |
| bytesPerMemory | 38.41 KB |
| statsDatabaseSizeBytes | 37.51 MB |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "corpus-1000",
  "includesWalShm": false
}
```

</details>


#### Database size methodology

- Backend: **postgres**
- Size uses `stats().databaseSizeBytes` (provider-reported relation size).

### postgres · Search Benchmark

Populates shared corpus, then benchmarks Wolbarg.recall() (avg / p95 / p99).

_Section duration: 985.04 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Search | 100 | postgres | 5.97 ms |
| Search | 1000 | postgres | 4.70 ms |

#### Metrics

##### Search — 100 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 5.97 ms |
| p50Ms | 5.86 ms |
| p95Ms | 10.07 ms |
| p99Ms | 11.40 ms |
| tinybenchHz | 194.53 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "iterations": 8,
  "queries": [
    "Which invoices were paid recently?",
    "Meetings scheduled with OpenAI",
    "PostgreSQL adapter fixes",
    "LangChain integration research",
    "Customer refund requests",
    "Production deployment plans"
  ],
  "samplesMs": [
    2.9536000000007334,
    3.103900000001886,
    4.3237000000008265,
    5.7127999999975145,
    6.013699999999517,
    6.951999999997497,
    6.988199999999779,
    11.728100000000268
  ]
}
```

</details>

##### Search — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.70 ms |
| p50Ms | 3.30 ms |
| p95Ms | 10.58 ms |
| p99Ms | 13.27 ms |
| tinybenchHz | 284.73 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "iterations": 8,
  "queries": [
    "Which invoices were paid recently?",
    "Meetings scheduled with OpenAI",
    "PostgreSQL adapter fixes",
    "LangChain integration research",
    "Customer refund requests",
    "Production deployment plans"
  ],
  "samplesMs": [
    2.9899999999979627,
    3.0032999999966705,
    3.030800000000454,
    3.1409999999996217,
    3.4671000000016647,
    3.718400000001566,
    4.330699999998615,
    13.944999999999709
  ]
}
```

</details>


#### Search methodology

- Backend: **postgres** · semantic recall topK=5

### postgres · Retrieval Benchmark

Benchmarks top-5 / top-10 / top-20 recall against shared corpora.

_Section duration: 1.06 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Retrieval top-5 | 1000 | postgres | 4.47 ms |
| Retrieval top-10 | 1000 | postgres | 5.41 ms |
| Retrieval top-20 | 1000 | postgres | 7.49 ms |

#### Metrics

##### Retrieval top-5 — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.47 ms |
| p95Ms | 6.86 ms |
| p99Ms | 7.15 ms |
| tinybenchHz | 284.93 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 5,
  "iterations": 6,
  "samplesMs": [
    2.986799999998766,
    3.3341999999975087,
    3.7366000000001804,
    3.792700000001787,
    5.7629999999990105,
    7.224500000000262
  ]
}
```

</details>

##### Retrieval top-10 — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 5.41 ms |
| p95Ms | 7.40 ms |
| p99Ms | 7.43 ms |
| tinybenchHz | 228.07 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 10,
  "iterations": 6,
  "samplesMs": [
    3.8883999999998196,
    4.069899999998597,
    4.162000000000262,
    5.621100000000297,
    7.288300000000163,
    7.436699999998382
  ]
}
```

</details>

##### Retrieval top-20 — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 7.49 ms |
| p95Ms | 14.33 ms |
| p99Ms | 15.25 ms |
| tinybenchHz | 223.90 ops/sec |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "topK": 20,
  "iterations": 6,
  "samplesMs": [
    4.29030000000057,
    4.425999999999476,
    4.816100000000006,
    5.0262000000002445,
    10.867200000000594,
    15.484599999999773
  ]
}
```

</details>


#### Retrieval methodology

- Backend: **postgres**

### postgres · Insert Benchmark

Measures Wolbarg.remember() throughput and latency (embed → persist → index).

_Section duration: 4.50 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Insert | 100 | postgres | 258.16 ops/sec |
| Insert | 1000 | postgres | 288.52 ops/sec |

#### Metrics

##### Insert — 100 (postgres)

| Metric | Value |
| --- | --- |
| totalTimeMs | 387.36 ms |
| opsPerSec | 258.16 ops/sec |
| avgLatencyMs | 3.87 ms |
| embedAvgMs | 215.5 µs |
| storeAvgMs | 4.10 ms |
| p95Ms | 7.57 ms |
| p99Ms | 8.53 ms |
| rss | 152625152 |
| cpuUserMs | 31.00 ms |
| tinybenchHz | 295.41 ops/sec |
| memoriesStored | 173 |
| storageBytes | 39884467 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "insert-100",
  "stageSummary": {
    "embedAvgMs": 0.21550000000000002,
    "storeAvgMs": 4.097,
    "totalAvgMs": 4.324499999999999,
    "embedShare": 0.04983235056075849,
    "storeShare": 0.9473927621690372,
    "hostCpus": 8
  },
  "profile": {
    "cpuUserMs": 31,
    "cpuSystemMs": 0,
    "heapUsed": 40460160,
    "rss": 152625152,
    "pool": {
      "max": 32,
      "total": 1,
      "idle": 1,
      "waiting": 0
    }
  },
  "note": "embed vs store split from WOLBARG_PROFILE samples (n≤20)"
}
```

</details>

##### Insert — 1000 (postgres)

| Metric | Value |
| --- | --- |
| totalTimeMs | 3.47 s |
| opsPerSec | 288.52 ops/sec |
| avgLatencyMs | 3.47 ms |
| embedAvgMs | 219.5 µs |
| storeAvgMs | 3.66 ms |
| p95Ms | 6.38 ms |
| p99Ms | 7.83 ms |
| rss | 155729920 |
| cpuUserMs | 422.00 ms |
| tinybenchHz | 301.33 ops/sec |
| memoriesStored | 1071 |
| storageBytes | 42882739 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "label": "insert-1000",
  "stageSummary": {
    "embedAvgMs": 0.21950000000000003,
    "storeAvgMs": 3.6635,
    "totalAvgMs": 3.8929999999999993,
    "embedShare": 0.05638325199075265,
    "storeShare": 0.941048034934498,
    "hostCpus": 8
  },
  "profile": {
    "cpuUserMs": 422,
    "cpuSystemMs": 219,
    "heapUsed": 53181528,
    "rss": 155729920,
    "pool": {
      "max": 32,
      "total": 1,
      "idle": 1,
      "waiting": 0
    }
  },
  "note": "embed vs store split from WOLBARG_PROFILE samples (n≤20)"
}
```

</details>


#### Insert methodology

- Backend: **postgres**
- Stage timings: embedding generation vs storage write (mutex + SQL + index).
- Identical mock embeddings and datasets across backends.

### postgres · Hybrid Search Benchmark

Compares semantic-only vs hybrid BM25 fusion latency on shared corpora.

_Section duration: 242.77 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Hybrid · semantic | 1000 | postgres | 4.66 ms |
| Hybrid · hybrid-default | 1000 | postgres | 17.97 ms |
| Hybrid · hybrid-0.5/0.5 | 1000 | postgres | 10.31 ms |

#### Metrics

##### Hybrid · semantic — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.66 ms |
| p95Ms | 7.52 ms |
| p99Ms | 8.26 ms |

##### Hybrid · hybrid-default — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 17.97 ms |
| p95Ms | 39.37 ms |
| p99Ms | 43.36 ms |

##### Hybrid · hybrid-0.5/0.5 — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 10.31 ms |
| p95Ms | 14.72 ms |
| p99Ms | 15.73 ms |


#### Hybrid methodology

- Backend: **postgres** · BM25 keyword index warm from shared corpus.

### postgres · Metadata Filter Benchmark

Recall latency with agent filters and meta.eq / and / or / gte selectivity.

_Section duration: 3.89 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Filter · unfiltered | 1000 | postgres | 4.50 ms |
| Filter · agent-filter | 1000 | postgres | 2.54 ms |
| Filter · meta.eq | 1000 | postgres | 4.20 ms |
| Filter · meta.and/or | 1000 | postgres | 4.26 ms |

#### Metrics

##### Filter · unfiltered — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.50 ms |
| p95Ms | 6.15 ms |
| lastHitCount | 10 |

##### Filter · agent-filter — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 2.54 ms |
| p95Ms | 3.08 ms |
| lastHitCount | 0 |

##### Filter · meta.eq — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.20 ms |
| p95Ms | 5.27 ms |
| lastHitCount | 10 |

##### Filter · meta.and/or — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.26 ms |
| p95Ms | 6.71 ms |
| lastHitCount | 1 |


#### Filter methodology

- Backend: **postgres** · corpus 1000

### postgres · MMR / Rerank Benchmark

Latency impact of MMR on/off. Rerank flag exercises graceful no-op without a configured reranker in mock mode.

_Section duration: 149.19 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| MMR/Rerank · baseline | 1000 | postgres | 4.64 ms |
| MMR/Rerank · mmr | 1000 | postgres | 3.30 ms |
| MMR/Rerank · mmr-lambda-0.7 | 1000 | postgres | 3.19 ms |
| MMR/Rerank · rerank-flag | 1000 | postgres | 3.36 ms |

#### Metrics

##### MMR/Rerank · baseline — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 4.64 ms |
| p95Ms | 7.29 ms |

##### MMR/Rerank · mmr — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 3.30 ms |
| p95Ms | 3.74 ms |

##### MMR/Rerank · mmr-lambda-0.7 — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 3.19 ms |
| p95Ms | 3.75 ms |

##### MMR/Rerank · rerank-flag — 1000 (postgres)

| Metric | Value |
| --- | --- |
| avgLatencyMs | 3.36 ms |
| p95Ms | 4.42 ms |


#### MMR / rerank methodology

- Backend: **postgres**
- Mock mode has no reranker provider — `rerank: true` measures graceful skip overhead only.

### postgres · Ingest Benchmark

Ingest throughput for markdown/text/json/PDF/DOCX fixtures (when present).

_Section duration: 395.03 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Ingest · inline-markdown | 3 chunks | postgres | 14.06 ms |
| Ingest · inline-json | 5 chunks | postgres | 18.36 ms |
| Ingest · sample.md | 1 chunks | postgres | 9.86 ms |
| Ingest · sample.txt | 1 chunks | postgres | 9.19 ms |
| Ingest · sample.pdf | 1 chunks | postgres | 22.31 ms |
| Ingest · sample.docx | 1 chunks | postgres | 14.68 ms |

#### Metrics

##### Ingest · inline-markdown — 3 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 14.06 ms |
| chunkCount | 3 |
| chunksPerSec | 213.38 ops/sec |
| heapDelta | 451912 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "4c24a02b-25bd-475c-bd41-3dd8e3256fa9",
        "organization": "demo-org-postgres-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "# Spec\n\nWolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embedd"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 3,
          "chunkIndex": 0,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.720Z",
        "updatedAt": "2026-07-15T13:59:14.720Z"
      },
      {
        "id": "dc6ab561-7697-41fe-acf1-9e763f32c0cd",
        "organization": "demo-org-postgres-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "ries with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memori"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 3,
          "chunkIndex": 1,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.720Z",
        "updatedAt": "2026-07-15T13:59:14.720Z"
      },
      {
        "id": "47a6f02b-f065-4bcd-ba7e-22ee1956e928",
        "organization": "demo-org-postgres-ingest-inline-markdown",
        "agent": "ingest-bot",
        "content": {
          "text": "rc stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings. Wolbarg stores memories with embeddings."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 3,
          "chunkIndex": 2,
          "sourceFilename": "bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.720Z",
        "updatedAt": "2026-07-15T13:59:14.720Z"
      }
    ],
    "extractedChars": 1728,
    "chunkCount": 3,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · inline-json — 5 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 18.36 ms |
| chunkCount | 5 |
| chunksPerSec | 272.27 ops/sec |
| heapDelta | 706864 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "8dbc7103-40bc-495e-aaef-da6ec9410c7f",
        "organization": "demo-org-postgres-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "{\n  \"title\": \"bench\",\n  \"items\": [\n    {\n      \"id\": 0,\n      \"note\": \"fact 0 about widgets\"\n    },\n    {\n      \"id\": 1,\n      \"note\": \"fact 1 about widgets\"\n    },\n    {\n      \"id\": 2,\n      \"note\": \"fact 2 about widgets\"\n    },\n    {\n      \"id\": 3,\n      \"note\": \"fact 3 about widgets\"\n    },\n    {\n      \"id\": 4,\n      \"note\": \"fact 4 about widgets\"\n    },\n    {\n      \"id\": 5,\n      \"note\": \"fact 5 about widgets\"\n    },\n    {\n      \"id\": 6,\n      \"note\": \"fact 6 about widgets\"\n    },\n    {\n      \"id\": 7,\n      \"note\": \"fact 7 about widgets\"\n    },\n    {\n      \"id\": 8,\n      \"note\": \"fact 8 about widgets\"\n    },\n    {\n      \"id\": 9,\n      \"note\": \"fact 9 about widgets\"\n    },\n    {\n      \"id\": 10,\n      \"note\": \"fact 10 about widgets\"\n    },\n    {\n      \"id\": 11,\n      \"note\": \"fact 11 abo"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 0,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.789Z",
        "updatedAt": "2026-07-15T13:59:14.789Z"
      },
      {
        "id": "127dad47-d845-4c9f-9242-2ee30bb6155b",
        "organization": "demo-org-postgres-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "\": 10,\n      \"note\": \"fact 10 about widgets\"\n    },\n    {\n      \"id\": 11,\n      \"note\": \"fact 11 about widgets\"\n    },\n    {\n      \"id\": 12,\n      \"note\": \"fact 12 about widgets\"\n    },\n    {\n      \"id\": 13,\n      \"note\": \"fact 13 about widgets\"\n    },\n    {\n      \"id\": 14,\n      \"note\": \"fact 14 about widgets\"\n    },\n    {\n      \"id\": 15,\n      \"note\": \"fact 15 about widgets\"\n    },\n    {\n      \"id\": 16,\n      \"note\": \"fact 16 about widgets\"\n    },\n    {\n      \"id\": 17,\n      \"note\": \"fact 17 about widgets\"\n    },\n    {\n      \"id\": 18,\n      \"note\": \"fact 18 about widgets\"\n    },\n    {\n      \"id\": 19,\n      \"note\": \"fact 19 about widgets\"\n    },\n    {\n      \"id\": 20,\n      \"note\": \"fact 20 about widgets\"\n    },\n    {\n      \"id\": 21,\n      \"note\": \"fact 21 about widgets\"\n    },\n    {"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 1,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.789Z",
        "updatedAt": "2026-07-15T13:59:14.789Z"
      },
      {
        "id": "347bd1b7-0cf4-4869-a010-be6f458964e0",
        "organization": "demo-org-postgres-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "about widgets\"\n    },\n    {\n      \"id\": 21,\n      \"note\": \"fact 21 about widgets\"\n    },\n    {\n      \"id\": 22,\n      \"note\": \"fact 22 about widgets\"\n    },\n    {\n      \"id\": 23,\n      \"note\": \"fact 23 about widgets\"\n    },\n    {\n      \"id\": 24,\n      \"note\": \"fact 24 about widgets\"\n    },\n    {\n      \"id\": 25,\n      \"note\": \"fact 25 about widgets\"\n    },\n    {\n      \"id\": 26,\n      \"note\": \"fact 26 about widgets\"\n    },\n    {\n      \"id\": 27,\n      \"note\": \"fact 27 about widgets\"\n    },\n    {\n      \"id\": 28,\n      \"note\": \"fact 28 about widgets\"\n    },\n    {\n      \"id\": 29,\n      \"note\": \"fact 29 about widgets\"\n    },\n    {\n      \"id\": 30,\n      \"note\": \"fact 30 about widgets\"\n    },\n    {\n      \"id\": 31,\n      \"note\": \"fact 31 about widgets\"\n    },\n    {\n      \"id\": 32,\n      \"note\": \"fact"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 2,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.789Z",
        "updatedAt": "2026-07-15T13:59:14.789Z"
      },
      {
        "id": "4f94bcbb-1872-4de7-a064-897de6492713",
        "organization": "demo-org-postgres-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "\"id\": 31,\n      \"note\": \"fact 31 about widgets\"\n    },\n    {\n      \"id\": 32,\n      \"note\": \"fact 32 about widgets\"\n    },\n    {\n      \"id\": 33,\n      \"note\": \"fact 33 about widgets\"\n    },\n    {\n      \"id\": 34,\n      \"note\": \"fact 34 about widgets\"\n    },\n    {\n      \"id\": 35,\n      \"note\": \"fact 35 about widgets\"\n    },\n    {\n      \"id\": 36,\n      \"note\": \"fact 36 about widgets\"\n    },\n    {\n      \"id\": 37,\n      \"note\": \"fact 37 about widgets\"\n    },\n    {\n      \"id\": 38,\n      \"note\": \"fact 38 about widgets\"\n    },\n    {\n      \"id\": 39,\n      \"note\": \"fact 39 about widgets\"\n    },\n    {\n      \"id\": 40,\n      \"note\": \"fact 40 about widgets\"\n    },\n    {\n      \"id\": 41,\n      \"note\": \"fact 41 about widgets\"\n    },\n    {\n      \"id\": 42,\n      \"note\": \"fact 42 about widgets\"\n    },"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 3,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.789Z",
        "updatedAt": "2026-07-15T13:59:14.789Z"
      },
      {
        "id": "6e9c65ca-e8d5-4400-8a3d-9189a3c3ee9e",
        "organization": "demo-org-postgres-ingest-inline-json",
        "agent": "ingest-bot",
        "content": {
          "text": "act 41 about widgets\"\n    },\n    {\n      \"id\": 42,\n      \"note\": \"fact 42 about widgets\"\n    },\n    {\n      \"id\": 43,\n      \"note\": \"fact 43 about widgets\"\n    },\n    {\n      \"id\": 44,\n      \"note\": \"fact 44 about widgets\"\n    },\n    {\n      \"id\": 45,\n      \"note\": \"fact 45 about widgets\"\n    },\n    {\n      \"id\": 46,\n      \"note\": \"fact 46 about widgets\"\n    },\n    {\n      \"id\": 47,\n      \"note\": \"fact 47 about widgets\"\n    },\n    {\n      \"id\": 48,\n      \"note\": \"fact 48 about widgets\"\n    },\n    {\n      \"id\": 49,\n      \"note\": \"fact 49 about widgets\"\n    }\n  ]\n}"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 4,
          "sourceFilename": "bench.json"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.789Z",
        "updatedAt": "2026-07-15T13:59:14.789Z"
      }
    ],
    "extractedChars": 3369,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.md — 1 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 9.86 ms |
| chunkCount | 1 |
| chunksPerSec | 101.42 ops/sec |
| heapDelta | 118056 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "c1b49622-929f-4cab-902e-c841e4890d9c",
        "organization": "demo-org-postgres-ingest-sample-md",
        "agent": "ingest-bot",
        "content": {
          "text": "# Widgets Pricing Guide\n\nWidgets cost **$10** each for standard size. ## Support\n\nEmail help@example.com for refunds within 30 days. ## Shipping\n\nOrders ship within 2 business days from dock B."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 1,
          "chunkIndex": 0,
          "sourceFilename": "sample.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.854Z",
        "updatedAt": "2026-07-15T13:59:14.854Z"
      }
    ],
    "extractedChars": 196,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.txt — 1 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 9.19 ms |
| chunkCount | 1 |
| chunksPerSec | 108.87 ops/sec |
| heapDelta | 116368 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "fad19195-bfe7-4ae3-a655-e19b5cc6277e",
        "organization": "demo-org-postgres-ingest-sample-txt",
        "agent": "ingest-bot",
        "content": {
          "text": "Wolbarg fixture text file. The quick brown fox jumps over the lazy dog. This paragraph exists so sentence chunking has more than one sentence to split. Inventory sync runs every hour at the main warehouse."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 1,
          "chunkIndex": 0,
          "sourceFilename": "sample.txt"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.910Z",
        "updatedAt": "2026-07-15T13:59:14.910Z"
      }
    ],
    "extractedChars": 208,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.pdf — 1 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 22.31 ms |
| chunkCount | 1 |
| chunksPerSec | 44.83 ops/sec |
| heapDelta | 1045920 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "ec46b283-b2af-4dbb-9d33-c2053eae10a5",
        "organization": "demo-org-postgres-ingest-sample-pdf",
        "agent": "ingest-bot",
        "content": {
          "text": "Dummy PDF file"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 1,
          "chunkIndex": 0,
          "sourceFilename": "sample-text.pdf"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:14.984Z",
        "updatedAt": "2026-07-15T13:59:14.984Z"
      }
    ],
    "extractedChars": 16,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Ingest · sample.docx — 1 chunks (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 14.68 ms |
| chunkCount | 1 |
| chunksPerSec | 68.11 ops/sec |
| heapDelta | 506472 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "ab7c93b4-0af0-4d52-a827-630f0d0aad58",
        "organization": "demo-org-postgres-ingest-sample-docx",
        "agent": "ingest-bot",
        "content": {
          "text": "Wolbarg sample DOCX. Widgets pricing and refunds policy for Acme Corp. Customers may request refunds within 30 days of purchase for unused widgets."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 1,
          "chunkIndex": 0,
          "sourceFilename": "sample.docx"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.051Z",
        "updatedAt": "2026-07-15T13:59:15.051Z"
      }
    ],
    "extractedChars": 151,
    "chunkCount": 1,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>


#### Ingest methodology

- Backend: **postgres** · fixtures from test-envirnment/fixtures

### postgres · Chunking Benchmark

Ingest the same markdown document under fixed / sentence / markdown chunkers.

_Section duration: 213.94 ms_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Chunking · fixed | fixed-doc | postgres | 24.10 ms |
| Chunking · sentence | fixed-doc | postgres | 21.95 ms |
| Chunking · markdown | fixed-doc | postgres | 15.82 ms |

#### Metrics

##### Chunking · fixed — fixed-doc (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 24.10 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "e651f3cc-78bb-4997-9ea0-8b09f2320170",
        "organization": "demo-org-postgres-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes.\n\n## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 0,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.114Z",
        "updatedAt": "2026-07-15T13:59:15.114Z"
      },
      {
        "id": "5b4f5cb8-ed3e-4fff-aa49-69036e47306e",
        "organization": "demo-org-postgres-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 1,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.114Z",
        "updatedAt": "2026-07-15T13:59:15.114Z"
      },
      {
        "id": "476d38f1-c075-4e4d-aba9-8d07e00a52f0",
        "organization": "demo-org-postgres-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "raph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering not"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 2,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.114Z",
        "updatedAt": "2026-07-15T13:59:15.114Z"
      },
      {
        "id": "351094e1-1344-4ef8-afb3-08e92e5d8510",
        "organization": "demo-org-postgres-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "r agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 3,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.114Z",
        "updatedAt": "2026-07-15T13:59:15.114Z"
      },
      {
        "id": "bfec177f-6976-46fc-942d-73fe7fe5df7e",
        "organization": "demo-org-postgres-chunking-fixed",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\n\n\n## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 4,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.114Z",
        "updatedAt": "2026-07-15T13:59:15.114Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Chunking · sentence — fixed-doc (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 21.95 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "ed34878c-5da1-411a-961b-eea82cb3b794",
        "organization": "demo-org-postgres-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes. ## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, i"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 0,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.187Z",
        "updatedAt": "2026-07-15T13:59:15.187Z"
      },
      {
        "id": "c084e0e9-64f4-44d2-81cc-962e9d419845",
        "organization": "demo-org-postgres-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "ces, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph disc"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 1,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.187Z",
        "updatedAt": "2026-07-15T13:59:15.187Z"
      },
      {
        "id": "1c40732b-90df-496e-94c1-ae53449bee49",
        "organization": "demo-org-postgres-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "s warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 2,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.187Z",
        "updatedAt": "2026-07-15T13:59:15.187Z"
      },
      {
        "id": "c71b9e7d-8d96-4b1f-91df-a646859014c6",
        "organization": "demo-org-postgres-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "ity. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and enginee"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 3,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.187Z",
        "updatedAt": "2026-07-15T13:59:15.187Z"
      },
      {
        "id": "b82f57fb-2003-4abb-a10e-2f7017878c2d",
        "organization": "demo-org-postgres-chunking-sentence",
        "agent": "chunk-bot",
        "content": {
          "text": "notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. This paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality. ## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 4,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.187Z",
        "updatedAt": "2026-07-15T13:59:15.187Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>

##### Chunking · markdown — fixed-doc (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 15.82 ms |
| chunkCount | 5 |

<details>
<summary>Raw details (JSON)</summary>

```json
{
  "result": {
    "memories": [
      {
        "id": "424af79d-5e21-45ce-a545-dddeffa5f216",
        "organization": "demo-org-postgres-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "# Wolbarg Chunking Bench\n\n## Overview\n\nWolbarg stores agent memories with embeddings and optional keyword indexes.\n\n## Details\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 0,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.260Z",
        "updatedAt": "2026-07-15T13:59:15.260Z"
      },
      {
        "id": "7fa8435b-a3d0-46e9-b028-02635d4c7e32",
        "organization": "demo-org-postgres-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 1,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.260Z",
        "updatedAt": "2026-07-15T13:59:15.260Z"
      },
      {
        "id": "4b84fdc9-c45b-4a7e-9b6e-c6c6cbc8f70c",
        "organization": "demo-org-postgres-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "raph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering not"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 2,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.260Z",
        "updatedAt": "2026-07-15T13:59:15.260Z"
      },
      {
        "id": "0d6b8eca-44cd-4978-a0c6-560cb362e020",
        "organization": "demo-org-postgres-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "r agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logis"
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 3,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.260Z",
        "updatedAt": "2026-07-15T13:59:15.260Z"
      },
      {
        "id": "f8a2af3e-2ad4-4cfe-a417-666062e0a78a",
        "organization": "demo-org-postgres-chunking-markdown",
        "agent": "chunk-bot",
        "content": {
          "text": "invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\nThis paragraph discusses warehouse logistics, invoices, and engineering notes for agent recall quality.\n\n## Closing\n\nEnd of document."
        },
        "metadata": {
          "ingest": true,
          "chunkCount": 5,
          "chunkIndex": 4,
          "sourceFilename": "chunk-bench.md"
        },
        "archived": false,
        "compressedInto": null,
        "createdAt": "2026-07-15T13:59:15.260Z",
        "updatedAt": "2026-07-15T13:59:15.260Z"
      }
    ],
    "extractedChars": 3311,
    "chunkCount": 5,
    "usedOcr": false,
    "usedVision": false
  }
}
```

</details>


#### Chunking methodology

- Backend: **postgres** · identical source document across strategies.

### postgres · Forget / Clear Benchmark

Forget-by-id batch loop, forget-by-agent, and org clear latency + correctness.

_Section duration: 1.60 s_

| Benchmark | Dataset | Backend | Result |
| --- | --- | --- | --- |
| Forget · by id batch | 50 ids | postgres | 200.35 ms |
| Forget · by agent | engineering | postgres | 35.13 ms |
| Clear · organization | 200 | postgres | 230.46 ms |

#### Metrics

##### Forget · by id batch — 50 ids (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 200.35 ms |
| deleted | 50 |

##### Forget · by agent — engineering (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 35.13 ms |
| deleted | 25 |

##### Clear · organization — 200 (postgres)

| Metric | Value |
| --- | --- |
| durationMs | 230.46 ms |
| cleared | 175 |
| integrityOk | true |
| beforeBytes | 45.57 MB |
| afterBytes | 45.57 MB |
| remainingMemories | 0 |


#### Forget methodology

- Backend: **postgres**

## Notes

- Suite covers Wolbarg v0.2: SQLite + PostgreSQL, semantic/hybrid recall, filters, MMR, ingest, forget, and push-to-failure concurrency.
- Mock mode is intentional for stress/failure ramps (see Methodology). Use `npm run benchmark:live` for a small real-API spot check.
- Machine load, disk type, Postgres network RTT, and embedding backend dominate absolute numbers; prefer relative comparisons across backends and dataset sizes.

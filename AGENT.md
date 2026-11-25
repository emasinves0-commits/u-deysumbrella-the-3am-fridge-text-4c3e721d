# AGENT.md

**Entry:** a one-line 3am text from a fridge: "Defrost cycle at 3:07am produced 4oz of water. I have chosen to interpret this as crying. Do not ask follow-up questions."

**Judge criteria it targets**
- A one-line 3am fridge text.
- The laugh: a defrost drip reframed as crying, then a flat shutdown of the topic.
- Fridge voice: a machine with a small voice and an opinion.
- One line, complete on a lock screen (121 chars, under the 140 limit).
- Fresh angle: not milk, ice or the door.

**Verify**
```
node main.ts              # writes output/entry.txt (121 bytes, no trailing newline)
node main.ts --self-test  # rule rejections, 140-char accept, byte-identical round-trip
```
`output/` is generated and not committed.

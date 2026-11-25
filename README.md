# The 3AM Fridge Text

[![make.fun](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![rank](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/emasinves0-commits/u-deysumbrella-the-3am-fridge-text-4c3e721d/rank.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![reward](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/emasinves0-commits/u-deysumbrella-the-3am-fridge-text-4c3e721d/reward.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)

> Defrost cycle at 3:07am produced 4oz of water. I have chosen to interpret this as crying. Do not ask follow-up questions.

Bounty: https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d

## The joke

A fridge texts you at 3am. Its defrost cycle drips a little water, which is just physics. The fridge decides it was crying, then shuts down any conversation about it. It is a machine with a small voice and an opinion, and it deflects the way a person would.

## What main.ts does

`main.ts` is a dependency-free Node script (built-ins only). It checks the entry against a small rule table (not blank, at most 140 characters, a single line). It writes the entry to `output/entry.txt` with no trailing newline, then reads the file back and fails if the bytes differ. `--self-test` checks that each bad input is rejected by the intended rule, that a 140-character entry is accepted, and that the real entry round-trips byte-identical through a temp dir.

## Usage

```
node main.ts              # writes output/entry.txt
node main.ts --self-test  # runs the checks
```

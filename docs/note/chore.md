#### 生成 CHNAGELOG.md

1. 全量生成

conventional-changelog -p angular -i CHANGELOG.md -w -r 0 >> CHANGELOG.md

2. 追加到 CHNAGELOG.md

conventional-changelog -p angular -i CHANGELOG.md -w >> CHANGELOG.md
